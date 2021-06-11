// firebase
// var firebase = require('firebase/app');
// const { type } = require('os');
//   require('firebase/auth');
//   require('firebase/database');

firebase.initializeApp({
    apiKey: "AIzaSyCOetUOyMKkAt_P_9xUWkcRB8J5ernXM10",
    authDomain: "photoit110.firebaseapp.com",
    projectId: "photoit110",
    storageBucket: "photoit110.appspot.com",
    messagingSenderId: "17838263350",
    appId: "1:17838263350:web:b780ca82fda263eb549c97",
    measurementId: "G-VC0GJ2GXLT"
});

function uploadPicture()
{
    console.log("Uploading a file");
    var storageRef = firebase.storage().ref(); 
    var myFile = document.getElementById("myFile"); 
    // console.log(typeof(myFile));
    // console.log("My File: " + myFile); 
    storageRef.put(myFile).then((snapshot) => {
        console.log('Uploaded a File!');
    });

}



function postCreatePost(captionUser, imageURLUser, categoryUser) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful
            var result = this.response;
            if (result == "successful") {
                // do something
                console.log("create post successful");
            }
            else if (result == "unsuccessful") {
                // do something
                console.log("create post unsuccessful");
            }
        }
    };
    xhttp.open("POST", "http://localhost:8081/CreatePost", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    var data = {caption: captionUser, imageURL: imageURLUser, category: categoryUser};
    
    xhttp.send(JSON.stringify(data));
}