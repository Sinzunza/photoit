// firebase
var firebase = require('firebase/app');
  require('firebase/auth');
  require('firebase/database');

function getUserName(request, response){

    // var userID = request.params.userID;
    var tempUserID = 'qVBHZwRiRTZikdQbP7ZPhNPMGtA2'; 

    var target = 'Users/' + tempUserID; 
    var ref = firebase.database().ref(target);

    ref.once('value', function(snapshot){
      console.log(snapshot);
      response.json(snapshot);
    });
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

function postSignIn(request, response){

  var email = request.body.email;
  var password = request.body.password;

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log("sign in successful.");
    // ...
  })
  .catch((error) => {
    console.log("sign in unsuccessful.");
    var errorCode = error.code;
    var errorMessage = error.message;
  });

}

module.exports = {
  getUserName,
  postCreateUser,
  postSignIn
};


