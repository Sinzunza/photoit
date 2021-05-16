// import dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
var cors = require('cors');
// import handlers
const firebaseHandler = require('./createUser.js'); // home.js


// create server
const app = express();
const port = 8081;

// add stuff to server
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Create post handlers
app.post('/SignIn', firebaseHandler.postCreateUser);

// start listening on server
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));



// username
// email
// password