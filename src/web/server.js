// const sendText = require('sendText');

// common js syntax to import modules into node js
const express = require('express');
//const connectDB = require('./config/db');

const app = express();

// connect the database
//connectDB();

// Init middleware for accepting body data
app.use(express.json({extended: false}));

// add a get request

// app.get('/', (request, response) => response.send('Hello World'));
app.get('/', (request, response) => {
    response.json({msg: "Welcome to the contact keeper"})
});


// Define routes
app.use('/api/users', require('./routes/users'));
//app.use('/api/auth', require('./routes/auth'));
//app.use('/api/contacts', require('./routes/contacts'));

// listening port
const PORT = process.env.PORT || 5001;

// start server
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
