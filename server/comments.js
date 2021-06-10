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
    // var tempUserID = 'qVBHZwRiRTZikdQbP7ZPhNPMGtA2'; 
    var tempPostID = request.body.postID; 
    var target = 'Posts/' + tempPostID; 
    var ref = firebase.database().ref(target);

    var userID = firebase.auth().currentUser.uid;

    var newComments = {
        user: userID, 
        content: 'comment content 2', 
        date: Date.now()
    }
    
    ref.child('comments').push(newComments, function(err){
        if (err) {
            console.log("Failed with Error: "  + err); 
        } else {
            console.log("Success in PostComments"); 
        }
    }); 

    var commentID = newComments.key; // retrive the comment unique ID
}

module.exports = {
    getComments, 
    postComments
};