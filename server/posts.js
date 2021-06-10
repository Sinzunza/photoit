// firebase
var firebase = require('firebase/app');
  require('firebase/auth');
  require('firebase/database');

const sorting = require('./sorting.js');

//////////////////////////////////////////////////////////////////////// get functions
function getPost(request, response){

  var postID = request.query.postID;

  var postDB = firebase.database().ref('Posts/' + postID);

  postDB.on('value', (snapshot) => {

    if (snapshot.numChildren() >= 1) {
      response.send(snapshot.val());
    }
    else {
      response.send("unsuccessful");
    }

  }, (errorObject) => {

    console.log('The read failed: ' + errorObject.name);
    response.send("unsuccessful");

  }); 

}

function getUsersPosts(request, response){

  var user = request.query.user;

  var queryUsersPosts = firebase.database().ref("Posts").orderByChild("user").equalTo(user);

  queryUsersPosts.on('value', function(snapshot) {

    if (snapshot.numChildren() >= 1) {
      response.send(snapshot.val());
    }
    else {
      response.send("empty");
    }

  });

}

function getCategoryPosts(request, response){

  var category = request.query.category;
  var filterType = request.query.filterType;
  var filterTime = 0;
  var currentDate = Date.now();

  if (filterType == "hour") {
    filterTime = currentDate - 3600000;
  }
  else if (filterType == "day") {
    filterTime = currentDate - 86400000;
  }
  else if (filterType == "week") {
    filterTime = currentDate - 604800000;
  }
  else if (filterType == "month") {
    filterTime = currentDate - 2592000000;
  }
  else if (filterType == "year") {
    filterTime = currentDate - 31556952000;
  }
  else {
    console.log("Error: incorrect function call");
    response.send("unsuccessful");
    return;
  }

  var queryUsersPosts = firebase.database().ref("Posts").orderByChild("category").equalTo(category);

  queryUsersPosts.on('value', function(snapshot) {

    if (snapshot.numChildren() >= 1) {

      var filteredJSON = snapshot.val();

      console.log(snapshot.val());

      for (var key in filteredJSON) {
        if (filteredJSON.hasOwnProperty(key)) {

          if (filteredJSON[key].date < filterTime) {
            delete filteredJSON[key];
          }

        }
      }

      console.log("after -- \n\n\n");

      console.log(snapshot.val());

      filteredJSON = sorting.sortByProperty(filteredJSON.parse(), 'attributes.likes', -1);

      response.send(filteredJSON);

    }
    else {
      
      response.send("empty");

    }

  });

}

//////////////////////////////////////////////////////////////////////////// posts functions
function postCreatePost(request, response){

  var postsDB =  firebase.database().ref('Posts/');
  var userID = firebase.auth().currentUser.uid;

  postsDB.push().set({
      user: userID,
      imageURL: request.body.imageURL,
      category: request.body.category,
      caption: request.body.caption,
      date: Date.now(),
      likes: '0'
  });

  response.send("successful");

}

function postAddLike(request, response){

  var oldLikes = 0;
  var postID = request.body.postID;

  // get old likes
  var likesDB = firebase.database().ref('Posts/' + postID + "/likes");

  likesDB.on('value', (snapshot) => {

    oldLikes = snapshot.val();

  }, (errorObject) => {

    console.log('The read failed: ' + errorObject.name);

  }); 

  // post new likes
  var updateData = {
    likes: oldLikes + 1
  };

  var postDB = firebase.database().ref('Posts/' + postID);
  postDB.update(updateData);

}

function postRemoveLike(request, response){

  var oldLikes = 0;
  var postID = request.body.postID;

  // get old likes
  var likesDB = firebase.database().ref('Posts/' + postID + "/likes");

  likesDB.on('value', (snapshot) => {

    oldLikes = snapshot.val();

  }, (errorObject) => {

    console.log('The read failed: ' + errorObject.name);

  }); 

  // post new likes
  var updateData = {
    likes: oldLikes - 1
  };

  var postDB = firebase.database().ref('Posts/' + postID);
  postDB.update(updateData);

}

// export modules
module.exports = {
  getPost,
  getUsersPosts,
  getCategoryPosts,
  postCreatePost,
  postAddLike,
  postRemoveLike
};