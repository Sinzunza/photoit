// firebase
var firebase = require('firebase/app');
  require('firebase/auth');
  require('firebase/database');

///////////////////////////////////////////////////////////////////////// get functions
function getUserInfo(request, response){

  var userID = request.query.userID;

  var refUser = firebase.database().ref('Users/' + userID);

  refUser.once('value', function(snapshot){

    const obj = snapshot.val();
    response.send(obj);

  });

}

function getUserName(request, response){

  var userID = request.query.userID;

  var target = 'Users/' + userID; 
  var ref = firebase.database().ref(target);

  ref.once('value', function(snapshot){
    const obj = snapshot.val();
    response.send(obj);
  });
}

function getUserAuthentication(request, response){

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("user signed in");
      var uid = firebase.auth().currentUser.uid;
      response.send(uid);
    } else {
      // No user is signed in.
      console.log("user not signed in");
      response.send("false");
    }
  });

}

/////////////////////////////////////////////////////////////////////////// post functions
function postCreateUser(request, response){

    var email = request.body.email;
    var password = request.body.password;
    var ref = firebase.database().ref('Users'); //.ref(target); 
    var userName = request.body.userName; 
    ref.orderByChild("UserName").equalTo(userName).once("value", function(snapshot){
      if (snapshot.numChildren() >= 1)
      {
          // duplicate userName
          response.send("User Name Already Exists");
      }
      else 
      {
          firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            var rootRef = firebase.database().ref();
            var userRef = rootRef.child('Users/' + firebase.auth().currentUser.uid);
            userRef.set({
              UserName: request.body.userName,
              ProfilePic: "https://firebasestorage.googleapis.com/v0/b/photoit110.appspot.com/o/profilePhotos%2FdefaultProfilePhoto.png?alt=media&token=3a7c1bcd-7e36-404f-b7b8-3438549c4885", 
              AppreciatedPoint: 0
            });
            console.log("create user successful");
            response.send("successful");
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Error " + errorCode + ": " + errorMessage + ".\n");
            response.send("unsuccessful");
          });
      }
    }); 
}

function postSignIn(request, response){

  var email = request.body.email;
  var password = request.body.password;

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    var user = userCredential.user;
    console.log("login successful");
    response.send("successful");
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Error " + errorCode + ": " + errorMessage + ".\n");
    response.send("unsuccessful");
  });

}

function postSignOut(request, response){

  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    console.log("user signed out successfully");
    response.send("true");
  }).catch((error) => {
    // An error happened.
    console.log("user sign out failed");
    response.send("false");
  });

}

///////////////////////////////////////////////////////////////////////// other
function searchDataBase(request, response) {
  var query = request.query.userName; 
  var ref = firebase.database().ref('Users'); //.ref(target); 
  ref.orderByChild("UserName").equalTo(query).on("value", function(snapshot){

    if (snapshot.numChildren() >= 1) {
      const obj = snapshot.val();
      console.log(obj);
      response.send(obj);
    }
    else {
      console.log("no user found")
      response.send(obj);
    }

  })
}

module.exports = {
  getUserInfo,
  getUserName,
  getUserAuthentication,
  postCreateUser,
  postSignIn,
  postSignOut,
  searchDataBase
};


