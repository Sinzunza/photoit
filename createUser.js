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

function getUserName(){
    var db = firebase.database();
    var ref = db.ref("Users");
    console.log("getting username");

}

function postCreateUser(request, response){

    console.log("landing page");
    var email = request.body.email;
    var password = request.body.password;
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        var rootRef = firebase.database().ref();
        var userRef = rootRef.child('Users');
        var newUser = userRef.push();
        newUser.set({
          UserName: "user2", 
          ProfilePic: "http://"
        });
        console.log("new user created");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage + "\n");
      });

}

module.exports = {
  postCreateUser
};


