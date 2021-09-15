function getUser() {
    var usernameSearch = document.getElementById("searchID").value;
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = 'json';
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful

            var result = this.response;

            if (result == null) {
                // no user found
                console.log("no user found");

                var box = document.getElementsByClassName("box")[0];
                if (box) {
                    box.remove();
                }

                let userFound = document.getElementById("foundUser");
                userFound.innerHTML =   "<div>" +
                                            "<p style=\"color:white;\"> no user found </p>" +
                                        "</div>";

            }
            else {
                // user found, display
                var noUser = document.getElementsByClassName("noUser")[0];
                if (noUser) {
                    noUser.remove();
                }

                let userFound = document.getElementById("foundUser");
                let userLink = "../views/profile/" + result[Object.keys(result)[0]].Username
                userFound.innerHTML =   "<div class=\"box\">" +
                                            "<div class=\"imgBox\">" +
                                                "<a href=\"" + userLink + "\" >" +
                                                "<img src=\"" + result[Object.keys(result)[0]].ProfilePic + "\">" +
                                                "</a>" +
                                            "</div>" +
                                            "<div class=\"content\">" +
                                                "<h2>" + result[Object.keys(result)[0]].Username + "</h2>" +
                                            "</div>" +
                                        "</div>"
                console.log(result[Object.keys(result)[0]]);
            }
        }
    };

    var params = "?" + "username=" + usernameSearch;
    xhttp.open("GET", "http://localhost:8081/searchDataBase" + params, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    xhttp.send();
    
}