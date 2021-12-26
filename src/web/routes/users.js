const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');


// @route   POST api/users
// @descr   Register a user
// @access  Public
router.post('/', [

    check('name', 'Please add name')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
],

async (request, response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({errors: errors.array()})
    }
    
    const {name, email, password} = request.body;

    try {
        let user = await User.findOne({ email });
        if(user) {
            return response.status(400).json({msg: 'User already exists' });
        }

        // if user doesn't exist, create new instance
        user = new User({
            name,
            email,
            password
        });

        // encrypt password
        const salt = await bcrypt.genSalt(10);
        
        user.password = await bcrypt.hash(password, salt);

        await user.save(); // save to database!

        //response.send('User saved');
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            response.json({token});
        });

    } catch(err){
        console.error(err.message);
        response.status(500).send('Server Error'); // server error
    }
});





// MUST EXPORT ROUTER OR IT WON'T WORK
module.exports = router;