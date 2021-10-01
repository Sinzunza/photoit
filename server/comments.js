var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

function getComments(request, response) {
    // returns all commentsID and all its data as json
    var tempPostID = '-MaufwbI_kZpTGMGpqL4'; 
    var target = 'Posts/' + tempPostID + '/Comments'; 
    var ref = firebase.database().ref(target);

    ref.once('value', function(snapshot){
        console.log(snapshot);
        response.json(snapshot);
    });
}

function postComments(request, response) {

    var unsubscribe = firebase.auth().onAuthStateChanged(function(user) {

        if (user) {
            // var tempUserID = 'qVBHZwRiRTZikdQbP7ZPhNPMGtA2'; 
            var tempPostID = request.body.postID; 
            var target = 'Posts/' + tempPostID + "/Comments"; 
            var ref = firebase.database().ref(target);
            
            var userID = firebase.auth().currentUser.uid;
            var userSnap = 'Users/' + userID; 
            var refUser = firebase.database().ref(userSnap);

            refUser.once('value', function(snapshot){
                var username = snapshot.val().Username;

                var contentUser = request.body.content;

                var newComment = {
                    Username: username, 
                    Content: contentUser, 
                    Date: Date.now()
                }

                ref.push().set(newComment);

                response.send(newComment);
            });
        
            //var commentID = newComments.key;
    
        } else {
          // No user is signed in.
          console.log("user not signed in");
          response.send(null);
        }
    });

    unsubscribe();

}

module.exports = {
    getComments, 
    postComments
};