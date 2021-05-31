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
    var tempPostID = '-MaufwbI_kZpTGMGpqL4'; 
    var target = 'Posts/' + tempPostID; 
    var ref = firebase.database().ref(target);

    // var tempPostData = {
    //     user: 'UserID???', 
    //     imageURL: 'someURL', 
    //     date: 'Yesterday', 
    //     likes: 10, 
    //     category: 'Funny', 
    // }

    var newComments = {
        user: 'me the person who post the comment', 
        content: 'comment content 2', 
        date: 'Date.date'
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