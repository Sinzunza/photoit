// firebase
var firebase = require('firebase/app');
  require('firebase/auth');
  require('firebase/database');

// get functions
function getPost(request, response){

  var postID = request.query.postID;

  var postDB = firebase.database().ref('Posts/' + postID);

  postDB.on('value', (snapshot) => {

    response.send(snapshot.val());

  }, (errorObject) => {

    console.log('The read failed: ' + errorObject.name);

  }); 

}

function getUsersPosts(request, response){

  var user = request.query.user;

  var queryUsersPosts = firebase.database().ref("Posts").orderByChild("user").equalTo(user);

  queryUsersPosts.on('value', function(snapshot) {

    if (snapshot.numChildren() >= 1) {
      console.log(snapshot.val());
    }
    else {
  
    }

  });

}

// posts functions
function postCreatePost(request, response){

  var postsDB =  firebase.database().ref('Posts/');

  postsDB.push().set({
      user: firebase.auth().currentUser.uid,
      imageURL: request.body.imageURL,
      category: request.body.category,
      caption: request.body.caption,
      date: Date.now(),
      likes: '0'
  });

}

// export modules
module.exports = {
  getPost,
  getUsersPosts,
  postCreatePost
};