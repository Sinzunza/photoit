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


// express
"user strict"; // ECMA Script VS

const express = require("express");
const app = express();
const port = process.env.port || 8081;


// code

app.get("/", (req,res) => {
    res.send("Hello World FB");
    console.log("landing page");
    var email = "email@live.com";
    var password = "password";
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage + "\n");
      });
});

app.get("/temp", (req, res) =>{
    res.send("inzomniac");
    console.log("temp page");
});

app.listen(port, err => {
    if (err) {
        return console.log("ERROR", err);
    }
    console.log("listening on port " + port);
});