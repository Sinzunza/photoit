function getUser(userNameUser) {
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful

            var result = this.response;

            if (result == "empty") {
                console.log("no user found");


            }
            else {
                console.log(result);

            }
        }
    };

    var params = "?" + "userName=" + userNameUser;
    xhttp.open("GET", "http://localhost:8081/searchDataBase" + params, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    xhttp.send();
    
}