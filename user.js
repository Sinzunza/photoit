// firebase
var firebase = require('firebase/app');
  require('firebase/auth');
  require('firebase/database');

// get functions
function getUserName(request, response){

  var userID = request.query.userID;

  var target = 'Users/' + userID; 
  var ref = firebase.database().ref(target);

  ref.once('value', function(snapshot){
  //  console.log(snapshot.val());
  //  response.send(snapshot);
  });
}

// post functions
function postCreateUser(request, response){

    var email = request.body.email;
    var password = request.body.password;
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        var rootRef = firebase.database().ref();
        var userRef = rootRef.child('Users/' + firebase.auth().currentUser.uid);
        userRef.set({
          UserName: request.body.userName,
          ProfilePic: "https://firebasestorage.googleapis.com/v0/b/photoit110.appspot.com/o/profilePhotos%2FdefaultProfilePhoto.png?alt=media&token=3a7c1bcd-7e36-404f-b7b8-3438549c4885"
        });
        response.send("successful");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error " + errorCode + ": " + errorMessage + ".\n");
        response.send("unsuccessful");
      });

}

function postSignIn(request, response){

  var email = request.body.email;
  var password = request.body.password;

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    var user = userCredential.user;
    response.send("successful");
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Error " + errorCode + ": " + errorMessage + ".\n");
    response.send("unsuccessful");
  });

}

module.exports = {
  getUserName,
  postCreateUser,
  postSignIn
};


