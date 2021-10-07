//import globalVal from './globalVar';

var isLogin = false;  // set false because initially isn't login, although isn't register either

window.onload = function() {
    var inputBox;

    if (isLogin){
        inputBox = document.getElementById("inputLogPassword");
    }
    else{
        inputBox = document.getElementById("inputRegPassword");
    }

    var pLogError = document.getElementById("pLogError");
    var pRegError = document.getElementById("pRegError");

    pLogError.style.display = "none";
    pRegError.style.display = "none";
    
    showLogin();

};

//trigger a button click on keyboard enter key
window.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        if (isLogin){
            document.getElementById("loginBtn").click();
        }
        else{
            document.getElementById("regBtn").click();
        }
    }
});

/* switch from displaying login to displaying registration */
function showRegister(){

    if (isLogin) {

        var divBtnType = document.getElementById("divBtnType");
        divBtnType.style.left = "110px";
        var registerDiv = document.getElementById("registerDiv");
        registerDiv.style.display = "block";
        var loginDiv = document.getElementById("loginDiv");
        loginDiv.style.display = "none"

        isLogin = false;

    }

}

/* switch from displaying registration to displaying login */
function showLogin(){

    if (!isLogin) {

        var divBtnType = document.getElementById("divBtnType");
        divBtnType.style.left = "0px";
        var loginDiv = document.getElementById("loginDiv");
        loginDiv.style.display = "block";
        var registerDiv = document.getElementById("registerDiv");
        registerDiv.style.display = "none"

        isLogin = true;
    }

}

function postLogin() {

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://photoit110.herokuapp.com/PostLogin", true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    var inputLogEmail = document.getElementById("inputLogEmail").value;
    var inputLogPassword = document.getElementById("inputLogPassword").value;
    
    var data = {email: inputLogEmail, password: inputLogPassword};
    
    xhttp.send(JSON.stringify(data));

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful
            var result = this.response;
            if (result == "Successful") {
                // do something
                window.location.href = "../views/home.html";
            }
            else {
                // do something
                var pLogError = document.getElementById("pLogError");
                pLogError.style.display = "block";
            
                pLogError.innerHTML = result;
            }

        }
    };
    
}

function postRegister() {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful
            var result = this.response;
            if (result == "Successful") {
                // do something
                window.location.href = "../views/home.html";
            }
            else {
                // do something
                var pRegError = document.getElementById("pRegError");
                pRegError.style.display = "block";
            
                pRegError.innerHTML = result;
            }
        }
    };

    xhttp.open("POST", "https://photoit110.herokuapp.com/PostRegister", true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    var inputRegUsername = document.getElementById("inputRegUsername").value;
    var inputRegEmail = document.getElementById("inputRegEmail").value;
    var inputRegPassword = document.getElementById("inputRegPassword").value;

    var data = {username: inputRegUsername, email: inputRegEmail, password: inputRegPassword};
    
    xhttp.send(JSON.stringify(data));
}

function showLoginPassword(){
    var inputLogPassword = document.getElementById("inputLogPassword");
    if(inputLogPassword.type === "password"){
        inputLogPassword.type = "text";
    }
    else{
        inputLogPassword.type = "password";
    }
}

function showRegisterPassword(){
    var inputRegPassword = document.getElementById("inputRegPassword");
    if(inputRegPassword.type === "password"){
        inputRegPassword.type = "text";
    }
    else{
        inputRegPassword.type = "password";
    }
}