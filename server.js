// import dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
var cors = require('cors')

// firebase
var firebase = require('firebase/app');
  require('firebase/auth');
  require('firebase/database');

firebase.initializeApp({
    apiKey: "AIzaSyCOetUOyMKkAt_P_9xUWkcRB8J5ernXM10",
    authDomain: "photoit110.firebaseapp.com",
    projectId: "photoit110",
    storageBucket: "photoit110.appspot.com",
    messagingSenderId: "17838263350",
    appId: "1:17838263350:web:b780ca82fda263eb549c97",
    measurementId: "G-VC0GJ2GXLT"
});

// import handlers
const postsHandler = require('./posts.js'); // home.js

// create server
const app = express();
const port = 8081;

// add stuff to server
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

// Create post handlers
app.post('/CreatePost', postsHandler.postCreatePost);

// start listening on server
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
