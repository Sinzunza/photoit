window.onload = function() {
    getUserAuthentication();
}

var loggedIn = false;

function getUserAuthentication() {
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful
            var result = this.response;

            if (result == "false") {
                console.log("user not signed in");
                loggedIn = false;
                userState();
            }
            else {
                console.log("user signed in");
                loggedIn = true;
                userState();
                getUserInfo(result);
            }
        }
    };
    xhttp.open("GET", "http://localhost:8081/GetUserAuthentication", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    xhttp.send();
    
}

function userState(){
    var userStateBtn = document.getElementById("userStateBtn");
    if(loggedIn){

        userStateBtn.innerHTML = "Sign Out";

        // sign out the user
        userStateBtn.onclick = function() {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful
                    var result = this.response;
                    if (result == "true") {
                        console.log("user signed out successfully");
                        loggedIn = false;
                        userState();
                    }
                    else {
                        console.log("user sign out failed");
                    }
                }
            };

            xhttp.open("POST", "http://localhost:8081/SignOut", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            
            xhttp.send();
        }


    }
    else {

        userStateBtn.innerHTML = "Login";

        // redirect to login.html
        userStateBtn.onclick = function() {
            window.location.href = "../views/login.html";
        }

    }
}

function getUserInfo(userIDUser) {
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = 'json';
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful
            var result = this.response;            
            var userName = document.getElementById("user_name");
            var numLikes = document.getElementById("num_likes");
            var awards = document.getElementById("awards");

            userName.innerHTML += result.Username;
            numLikes.innerHTML += result.AppreciationPoints;
            if (result.awards != null) {
                awards.innerHTML += result.awards;
            }

            getUsersPosts(result.Username);

        }
    };
    var params = "?userID=" + userIDUser;
    xhttp.open("GET", "http://localhost:8081/GetUserInfo" + params, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    xhttp.send();
}

function getUsersPosts(usernameUser) {
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = 'json';
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful
            var result = this.response; 

            if (result == null) {
                console.log("no posts exists");
            }
            else {
                console.log("posts exists");
                var picturesID = Object.keys(this.response); 
                var pictures = Object.values(this.response);

                var container = document.getElementById("container");
                container.innerHTML = "";
                var numPhotos = document.getElementById("num_photos");
                numPhotos.innerHTML = "Number of Photos: " + pictures.length.toString();
                var picHostedLink;
                var picTitle;
                var postID; 
                for(let i = 0; i < pictures.length; i++){
                    picHostedLink = pictures[i].ImageURL;
                    picTitle = pictures[i].Caption;
                    postID = picturesID[i]; 
                    container.innerHTML += "<div class=\"box\">" +
                                                "<div class=\"imgBox\">" +
                                                    "<form action=\"../views/photo.html\">" + 
                                                        "<input type=\"hidden\" name=\"postID\" value=\"" + postID + "\"/>" +
                                                            "<button class=\"btn\" type=\"submit\" id=\"categoryButton\">" + 
                                                                "<img src=\"" + picHostedLink + "\">" + 
                                                            "</button>" + 
                                                    "</form>" +
                                                "</div>" +
                                                "<div class=\"content\">" +
                                                    "<h2>" + picTitle + "</h2>" +
                                                "</div>";
                }
            }
        }
    };
    var params = "?username=" + usernameUser;
    xhttp.open("GET", "http://localhost:8081/GetUsersPosts" + params, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    xhttp.send();
}