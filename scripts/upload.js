var userStateBtn;
var loggedIn;

window.onload = function() {

    userStateBtn = document.getElementById("userStateBtn");
    getUserAuthentication();

}


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
    let docFileName = document.getElementById("fileSelect");
    if((file.name).length < 18){
        docFileName.innerHTML = file.name;
    } 
    else{
        docFileName.innerHTML = (file.name).substring(0,4) + "..." +(file.name).substring((file.name).length-8, (file.name).length);
    }
}

function getUserAuthentication() {
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8081/GetUserAuthentication", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful

            var result = this.response;

            var category_infoDiv= document.getElementById("category_info");

            if (result) {

                console.log("\n\n HERE NOT SIGNED IN\n\n");

                console.log("user signed in");
                userStateBtn.innerHTML = "Sign Out";
                loggedIn = true;
                
                category_infoDiv.innerHTML = "<b id=\"uploadText\" style=\"color:white;\">UPLOAD A PHOTO</b>" +
                                              "<form id=\"uploadForm\" action=\"\">" +
                                              "<ul class=\"flex-outer\">" + 
                                              "<li>" +
                                              "<p class=\"formItem\" style=\"color:white;\">Choose File:</p>" +
                                              "<input type=\"file\" class=\"formItem hidden\" id=\"myFile\" accept=\"image/*\" title=\"\" value=\"\" name=\"filename\" onchange=\"chooseFile(event)\" style=\"color:white;display:none\">" +
                                              "<label id=\"fileSelect\" for=\"myFile\" style=\"color: white;\">SELECT FILE</label>" +
                                              "</li>" +
                                              "<li><p class=\"formItem\" style=\"color:white;\">Title: <input type=\"text\" id=\"photoname\" name=\"Name\"></p></li>" +
                                              "<li>" +
                                              "<label for=\"categories\" class=\"formItem\" style=\"color:white;\">Choose a category:</label>" +
                                              "<select id=\"categorymenu\" class=\"formItem\" name=\"categories\">" +
                                              "<option value=\"Cars\">Cars</option>" +
                                              "<option value=\"Food\">Food</option>" +
                                              "<option value=\"Fashion\">Fashion</option>" +
                                              "<option value=\"Funny\">Funny</option>" +
                                              "<option value=\"Sports\">Sports</option>" +
                                              "<option value=\"Science\">Science</option>" +
                                              "<option value=\"Scenery\">Scenery</option>" +
                                              "<option value=\"Tech\">Tech</option>" +
                                              "<option value=\"Gaming\">Gaming</option>" +
                                              "</select>" +
                                              "</li>" +
                                              "<li><button id=\"uploadButton\" class=\"formItem\" type=\"button\" onclick=\"uploadPicture()\">Upload</button></li>" +
                                              "</ul>" +
                                              "</form>";

                //getUserInfo(result);

            }
            else {

                console.log("\n\n HERE NOT SIGNED IN\n\n");

                console.log("user not signed in");
                userStateBtn.innerHTML = "Login";
                loggedIn = false;

                category_infoDiv.innerHTML = "<p style=\"text-align: center; color: #fff;\"> Must be signed in to upload! </p>";

            }
        }
    };
    
}

function userState() {

    if(loggedIn){

        userStateBtn.innerHTML = "Login";

        // sign out the user
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:8081/SignOut", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send();

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful
                var result = this.response;
                if (result == "true") {

                    console.log("user signed out successfully");
                    location.reload();

                }
                else {

                    console.log("user sign out failed");

                }
            }
        };

    }
    else {                                       

        window.location.href = "../views/login.html";

    }

}

function uploadPicture() {
    if(loggedIn){
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
    else{
        let docUpload = document.getElementById("uploadButton");
        docUpload.innerHTML = "User must be signed in to upload";
    }
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