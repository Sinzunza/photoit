// firebase
var firebase = require('firebase/app');
  require('firebase/auth');
  require('firebase/database');

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


