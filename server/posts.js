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

  console.log("Filter = " + filter + "\n\n");

  var filterTime = 0;
  var currentDate = Date.now();

  if (filter == "Last Hour") {
    filterTime = currentDate - 3600000;
  }
  else if (filter == "Last Day") {
    filterTime = currentDate - 86400000;
  }
  else if (filter == "Last Week") {
    filterTime = currentDate - 604800000;
  }
  else if (filter == "Last Month") {
    filterTime = currentDate - 2592000000;
  }
  else if (filter == "Last Year") {
    filterTime = currentDate - 31556952000;
  }
  else if (filter == "All Time") {
    // do something
  }
  else {
    console.log("Error: getCategoryPosts() - incorrect function call");
    response.send("unsuccessful");
  }

  var queryUsersPosts = firebase.database().ref("Posts").orderByChild("Category").equalTo(category);

  queryUsersPosts.once('value', function(snapshot) {

    if (snapshot.numChildren() >= 1) {

      var filteredJSON = snapshot.val();

      if (filter != "All Time") {

        for (var key in filteredJSON) {
          if (filteredJSON.hasOwnProperty(key)) {
  
            if (filteredJSON[key].Date < filterTime) {
              delete filteredJSON[key];
            }
  
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

  var postID = request.body.postID; 
  var postUsername = request.body.postUsername;

  var unsubscribe = firebase.auth().onAuthStateChanged(function(user) {

    if (user) { // if a user is signed in

        // get Username
        var userID = firebase.auth().currentUser.uid;
        var refUser = firebase.database().ref('Users/' + userID);

        var oldLikes;
        var incrDecr;

        refUser.once('value', function(snapshot){

          var username = snapshot.val().Username;

          // get number of likes
          var refLikedByUser = firebase.database().ref('Posts/' + postID + "/LikedBy/" + username);

          refLikedByUser.once('value', function(snapshot){

            if (snapshot.numChildren() >= 1) { // if is liked

              // get old likes
              var likesDB = firebase.database().ref('Posts/' + postID + "/Likes");

              likesDB.once('value', (snapshot) => {

                oldLikes = parseInt(snapshot.val());

                // get new likes
                incrDecr = -1; // remove like
                
                // update Likes and send response
                var newLikes = updateLikes(postID, oldLikes, incrDecr);
                response.send(newLikes.toString());

                // remove username from LikedBy
                var refLikedBy = firebase.database().ref('Posts/' + postID + "/LikedBy");
                refLikedBy.child(username).remove();
                
                updateAppreciationPoints(postUsername, incrDecr);

              }, (errorObject) => {

                console.log('The read failed: ' + errorObject.name);

              });

            }
            else { // if is not liked

              // get old likes
              var likesDB = firebase.database().ref('Posts/' + postID + "/Likes");

              likesDB.once('value', (snapshot) => {

                oldLikes = parseInt(snapshot.val());

                // get new likes
                incrDecr = 1; // add like

                // update Likes and send response
                var newLikes = updateLikes(postID, oldLikes, incrDecr);
                response.send(newLikes.toString());

                // add username to LikedBy
                var refLikedBy = firebase.database().ref('Posts/' + postID + "/LikedBy");
                refLikedBy.child(username).set({
                  Liked: ""
                });

                updateAppreciationPoints(postUsername, incrDecr);

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

  unsubscribe();

}


//////////////////////////////////////////////////// helper functions

function updateLikes(postID, oldLikes, incrDecr) {

  var newLikes = oldLikes + incrDecr;

  var updateLikes = {
    Likes: newLikes
  };

  var postDB = firebase.database().ref('Posts/' + postID);
  postDB.update(updateLikes);

  return newLikes.toString();
}

function updateAppreciationPoints(postUsername, incrDecr) {

  var refAllUsers = firebase.database().ref('Users/');
  var queryPostUser = refAllUsers.orderByChild("Username").equalTo(postUsername);

  queryPostUser.once('value', function(snapshot) {

    var postUserID = Object.keys(snapshot.val())[0];

    var refPostUser = firebase.database().ref("Users/" + postUserID);

    refPostUser.once('value', (snapshot) => {

      // get old appreciation points
      var oldAppreciationPoints = parseInt(snapshot.child("AppreciationPoints").val());

      var updateAppreciationPoints = {
        AppreciationPoints: oldAppreciationPoints + incrDecr
      };

      refPostUser.update(updateAppreciationPoints);

    });

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