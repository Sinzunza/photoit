function getUser() {
    var userSearch = document.getElementById("searchID").value;
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = 'json';
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful

            var result = this.response;

            if (result == null) {
                // no user found
                console.log("no user found");
            }
            else {
                // user found, display
                let userFound = document.getElementById("foundUser");
                let userLink = "../views/profile/" + result[Object.keys(result)[0]].UserName
                userFound.innerHTML = "<div class=\"imgBox\">" +
                                            "<a href=\"" + userLink + "\" >" +
                                            "<img src=\"" + result[Object.keys(result)[0]].ProfilePic + "\">" +
                                            "</a>" +
                                        "</div>" +
                                        "<div class=\"content\">" +
                                            "<h2>" + result[Object.keys(result)[0]].UserName + "</h2>" +
                                        "</div>"
                console.log(result[Object.keys(result)[0]]);
            }
        }
    };

    var params = "?" + "userName=" + userSearch;
    xhttp.open("GET", "http://localhost:8081/searchDataBase" + params, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    xhttp.send();
    
}