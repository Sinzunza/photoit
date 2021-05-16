// firebase
var firebase = require('firebase/app');
  require('firebase/auth');
  require('firebase/database');

// functions
function postCreatePost(request, response){

    firebase.database().ref('Posts/' + request.body.postID).set({
        user: request.body.user,
        imageURL: request.body.imageURL,
        category: request.body.category,
        date: Date.now(),
        likes: '0'
    });

}

// export modules
module.exports = {
  postCreatePost
};

