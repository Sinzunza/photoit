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
                // add login button function to route to login page
            }
            else {
                console.log("user signed in");
                // set login button to sign out
                loggedIn = true;
                userState();
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