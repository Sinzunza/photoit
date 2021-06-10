window.onload = function() {
    getUserAuthentication();
}

function getUserAuthentication() {
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful
            var result = this.response;

            if (result == "true") {
                console.log("user signed in");
                // set login button to sign out
                var userStateBtn = document.getElementById("userStateBtn");
                userStateBtn.innerHTML = "Sign Out";

            }
            else {
                console.log("user signed in");
                // add login button function to route to login page
            }

        }
    };
    xhttp.open("GET", "http://localhost:8081/GetUserAuthentication", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    xhttp.send();
}