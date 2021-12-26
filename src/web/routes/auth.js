const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// @route   GET api/auth
// @descr   Get logged in user
// @access  Private
router.get('/', auth, async (request, response) => {
    try {
        const user = await User.findById(request.user.id).select('-password');
        response.json(user);
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
});

// @route   POST api/auth
// @descr   Auth user & get token
// @access  Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()

], 
async (request, response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({errors: errors.array()})
    }

    const { email, password } = request.body;

    try {
        let user = await User.findOne({email});
        
        if(!user) {
            return response.status(400).json({msg: 'Invalid credentials'});
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return response.status(400).json({msg: 'Invalid credentials'});
        }

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
    } catch (err){
        console.error(err.message);
        response.status(500).send('Server Error');
    }
});

// MUST EXPORT ROUTER OR IT WON'T WORK
module.exports = router;