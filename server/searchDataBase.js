var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

function searchDataBase(request, response) {
    // returns all commentsID and all its data as json
    console.log("searchDataBase from searchDataBase.js");
    var query = "query"; 
    var target = 'Users'; 
    var ref = firebase.database().ref(target); 
    ref.orderByChild("Users").equalTo(query).on()
}

module.exports = {
    searchDataBase
};