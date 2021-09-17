// firebase
var firebase = require('firebase/app');
  require('firebase/auth');
  require('firebase/database');

const sorting = require('../sorting.js');

//////////////////////////////////////////////////////////////////////// get functions
function getPost(request, response) {

  var postID = request.query.postID;

  var postDB = firebase.database().ref('Posts/' + postID);

  postDB.once('value', (snapshot) => {

    if (snapshot.numChildren() >= 1) {
      console.log("post found");
      response.send(snapshot.val());
    }
    else {
      console.log("getPost() - post not found");
      response.send("not found");
    }

  }, (errorObject) => {

    console.log('The read failed: ' + errorObject.name);
    response.send("unsuccessful");

  }); 

}

function getUsersPosts(request, response) {

  var username = request.query.username;

  var queryUsersPosts = firebase.database().ref("Posts").orderByChild("Username").equalTo(username);

  queryUsersPosts.once('value', function(snapshot) {

    if (snapshot.numChildren() >= 1) {
      response.send(snapshot.val());
    }
    else {
      response.send(null);
    }

  });

}

function getCategoryPosts(request, response) {

  var category = request.query.category;
  var filter = request.query.filter;

  var filterTime = 0;
  var currentDate = Date.now();

  if (filter == "hour") {
    filterTime = currentDate - 3600000;
  }
  else if (filter == "day") {
    filterTime = currentDate - 86400000;
  }
  else if (filter == "week") {
    filterTime = currentDate - 604800000;
  }
  else if (filter == "month") {
    filterTime = currentDate - 2592000000;
  }
  else if (filter == "year") {
    filterTime = currentDate - 31556952000;
  }
  else {
    console.log("Error: getCategoryPosts() - incorrect function call");
    response.send("unsuccessful");
  }

  var queryUsersPosts = firebase.database().ref("Posts").orderByChild("Category").equalTo(category);

  queryUsersPosts.once('value', function(snapshot) {

    if (snapshot.numChildren() >= 1) {

      var filteredJSON = snapshot.val();

      for (var key in filteredJSON) {
        if (filteredJSON.hasOwnProperty(key)) {

          if (filteredJSON[key].date < filterTime) {
            delete filteredJSON[key];
          }

        }
      }
      
      filteredJSON = sorting.sortByProperty([filteredJSON], 'attributes.Likes', -1);

      console.log("getCategoryPosts() - found posts");
      response.send(filteredJSON);

    }
    else {
      
      console.log("getCategoryPosts() - found no posts");
      response.send(snapshot.val());

    }

  });

}

//////////////////////////////////////////////////////////////////////////// post functions
function postCreatePost(request, response) {

  var postsDB =  firebase.database().ref('Posts/');
  var userID = firebase.auth().currentUser.uid;
  var ref = firebase.database().ref('Users/' + userID);
  var username; 
  
  ref.once("value", function(snapshot) {

    username = snapshot.val().Username; 
    var postsDBPush = postsDB.push();

    postsDBPush.set({
      Username: username,
      ImageURL: request.body.imageURL,
      Category: request.body.category,
      Caption: request.body.caption,
      Date: Date.now(),
      Likes: '0'
    }, function(error){
      if (error) {
       console.error(error)
       console.log('Create post unsuccessful');
       response.send(null);
      }
      else {
        console.log('Create post successful');
        //add upload function here
        var newPostKey = postsDBPush.key;
        response.send(newPostKey);
      }
    });
  });
}

function postLike(request, response) {

  firebase.auth().onAuthStateChanged(function(user) {

    if (user) { // if a user is signed in

        // get Username  
        var userID = firebase.auth().currentUser.uid;
        var refUser = firebase.database().ref('Users/' + userID);

        refUser.once('value', function(snapshot){

          var username = snapshot.val().Username;

          // get number of likes
          var tempPostID = request.body.postID; 
          var refLikedByUser = firebase.database().ref('Posts/' + tempPostID + "/LikedBy/" + username);

          refLikedByUser.once('value', function(snapshot){

            if (snapshot.numChildren() >= 1) { // if is liked

              // get old likes
              var postID = request.body.postID;

              var likesDB = firebase.database().ref('Posts/' + postID + "/Likes");

              likesDB.once('value', (snapshot) => {

                var oldLikes = parseInt(snapshot.val());

                var newLikes = oldLikes - 1; // remove like

                // post new likes
                var updateData = {
                  Likes: newLikes
                };

                var postDB = firebase.database().ref('Posts/' + postID);
                postDB.update(updateData);
                response.send(newLikes.toString());

                var refLikedBy = firebase.database().ref('Posts/' + postID + "/LikedBy");

                refLikedBy.child(username).remove();                

              }, (errorObject) => {

                console.log('The read failed: ' + errorObject.name);

              });

            }
            else { // if is not liked

              // get old likes
              var postID = request.body.postID;

              var likesDB = firebase.database().ref('Posts/' + postID + "/Likes");

              likesDB.once('value', (snapshot) => {

                var oldLikes = parseInt(snapshot.val());

                var newLikes = oldLikes + 1; // add like

                // post new likes
                var updateData = {
                  Likes: newLikes
                };

                var postDB = firebase.database().ref('Posts/' + postID);
                postDB.update(updateData);
                response.send(newLikes.toString());

                var refLikedBy = firebase.database().ref('Posts/' + postID + "/LikedBy");

                refLikedBy.child(username).set({
                  Liked: ""
                });

              }, (errorObject) => {

                console.log('The read failed: ' + errorObject.name);

              });
      
            }

          });

        });

    } else {
      // No user is signed in.
      console.log("user not signed in");
      response.send(null);
    }
  });

}

// export modules
module.exports = {
  getPost,
  getUsersPosts,
  getCategoryPosts,
  postCreatePost,
  postLike
};