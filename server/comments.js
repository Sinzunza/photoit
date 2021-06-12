var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
function getComments(reequest, response) {
    // returns all commentsID and all its data as json
    var tempPostID = '-MaufwbI_kZpTGMGpqL4'; 
    var target = 'Posts/' + tempPostID + '/comments'; 
    var ref = firebase.database().ref(target);

    ref.once('value', function(snapshot){
        console.log(snapshot);
        response.json(snapshot);
    });
}

function postComments(request, response) {

    firebase.auth().onAuthStateChanged(function(user) {

        if (user) {
            // var tempUserID = 'qVBHZwRiRTZikdQbP7ZPhNPMGtA2'; 
            var tempPostID = request.body.postID; 
            var target = 'Posts/' + tempPostID + "/comments"; 
            var ref = firebase.database().ref(target);

            var userID = firebase.auth().currentUser.uid;
            var contentUser = request.body.content;
            var currDate = Date.now();

            var newComment = {
                user: userID, 
                content: contentUser, 
                date: currDate
            }

            ref.push().set(newComment);

            response.send(newComment);
        
            //var commentID = newComments.key; // retrive the comment unique ID
    
        } else {
          // No user is signed in.
          console.log("user not signed in");
          response.send(null);
        }
      });
}

module.exports = {
    getComments, 
    postComments
};