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
        var userRef = rootRef.child('Users/' + firebase.auth().currentUser.uid);
        userRef.set({
          UserName: request.body.userName,
          ProfilePic: "https://firebasestorage.googleapis.com/v0/b/photoit110.appspot.com/o/profilePhotos%2FdefaultProfilePhoto.png?alt=media&token=3a7c1bcd-7e36-404f-b7b8-3438549c4885"
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


