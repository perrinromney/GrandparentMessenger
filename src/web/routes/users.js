const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');


// @route   POST api/users
// @descr   Register a user
// @access  Public
router.post('/', [], ()=>console.log('yes'));





// MUST EXPORT ROUTER OR IT WON'T WORK
module.exports = router;