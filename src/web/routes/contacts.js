const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact')
const { check, validationResult } = require('express-validator');

// @route   GET api/contacts
// @descr   Get all of a user's contacts
// @access  Private
router.get('/', auth, async (request, response) => {
    try {
        const contacts = await Contact.find({user: request.user.id }).sort({date: -1});
        response.json(contacts);
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Server error');
    }
});

// @route   POST api/contacts
// @descr   Add new contact
// @access  Private
router.post('/', [auth, [
        check('name','Name is required').not().isEmpty()
    ]], async (request, response) => {

        const errors = validationResult(request);
        if(!errors.isEmpty()){
            return response.status(400).json({errors: errors.array()})
        }

        const {name, email, phone, type} = request.body;

        try {
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: request.user.id
            });

            const contact = await newContact.save();
            response.json(contact);
        } catch (err){
            console.error(err.message);
            response.status(500).send("Server Error");
        }

});

// @route   PUT api/contacts/:id
// @descr   Update a given contact
// @access  Private
router.put('/:id', auth, async (request, response) => {
    
    const {name, email, phone, type} = request.body;
    const contactFields = {};
        
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {
        let contact = await Contact.findById(request.params.id)

        if(!contact) return response.status(404).json({msg: 'Contact not found'});

        // Make sure user owns contact
        if(contact.user.toString() != request.user.id){
            return response.status(401).json({msg: "not authorized"});
        }

        // Update it
        contact = await Contact.findByIdAndUpdate(request.params.id, 
            {$set: contactFields },
            { new: true}
        );

        response.json(contact);

    } catch (err) {
        console.error(err.message);
        response.status(500).send("Server Error");
    }
});

// @route   DELETE api/contacts/:id
// @descr   Delete a given contact
// @access  Private
router.delete('/:id', auth, async (request, response) => {

    try {
        let contact = await Contact.findById(request.params.id)

        if(!contact) return response.status(404).json({msg: 'Contact not found'});

        // Make sure user owns contact
        if(contact.user.toString() != request.user.id){
            return response.status(401).json({msg: "not authorized"});
        }

        // Delete it
        await Contact.findByIdAndRemove(request.params.id);

        response.json({msg: 'Contact removed'});
        
    } catch (err) {
        console.error(err.message);
        response.status(500).send("Server Error");
    }
});


// MUST EXPORT ROUTER OR IT WON'T WORK
module.exports = router;