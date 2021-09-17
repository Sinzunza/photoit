var firebaseConfig = {
    apiKey: "AIzaSyCOetUOyMKkAt_P_9xUWkcRB8J5ernXM10",
    authDomain: "photoit110.firebaseapp.com",
    databaseURL: "https://photoit110-default-rtdb.firebaseio.com",
    projectId: "photoit110",
    storageBucket: "photoit110.appspot.com",
    messagingSenderId: "17838263350",
    appId: "1:17838263350:web:b780ca82fda263eb549c97",
    measurementId: "G-VC0GJ2GXLT"
};

firebase.initializeApp(firebaseConfig);

var file = {};

function chooseFile(e) {
    file = e.target.files[0];
}

function uploadPicture() {
    var postStorageID = create_UUID(); 
    var storageRef = firebase.storage().ref("posts/" + postStorageID);
    var captionUser = document.getElementById("photoname").value; 
    var category = document.getElementById("categorymenu").value;
    var uploadMessage = document.getElementById("category_info");
    storageRef.put(file).then(function() {
        console.log("upload successful");
        // uploaded, get URL
        firebase.storage().ref('posts/' + postStorageID).getDownloadURL().then(imgUrl => {
            
            // console.log(imgUrl, captionUser, category);
            postCreatePost(captionUser, imgUrl, category);

        }); 
    }).catch(error => {
        console.log("upload failed");
        console.log("Error: " + error);
        document.getElementById("uploadForm").remove()
        uploadMessage.innerHTML = uploadMessage.innerHTML + "<p style=\"color: red;\"> Upload Unsuccessful </p>";
    })
}

function postCreatePost(captionUser, imageURLUser, categoryUser) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful
            var result = this.response;
            if (result == null) {
                console.log("Create post unsuccessful");
            }
            else {
                console.log("Create post successful");
                // open photo page
                var postDbID = result;
                window.location.href = "../views/photo.html?postID=" + postDbID;
            }
        }
    };
    xhttp.open("POST", "http://localhost:8081/CreatePost", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    var data = {caption: captionUser, imageURL: imageURLUser, category: categoryUser};
    xhttp.send(JSON.stringify(data));
}

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}