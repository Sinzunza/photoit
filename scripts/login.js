function register(){
    let button = document.getElementById("button1");
    let register = document.getElementById("register");
    let login = document.getElementById("login");

    login.style.left = "-400px";
    register.style.left = "50px";
    button1.style.left = "110px";
}

function login(){
    let button = document.getElementById("button1");
    let register = document.getElementById("register");
    let login = document.getElementById("login");

    login.style.left = "50px";
    register.style.left = "450px";
    button1.style.left = "0px";
}

const loginForm = document.getElementById("login");
loginForm.addEventListener("submit", (e) => {
    let userID = document.getElementById("login-id").value;
    let userPassword = document.getElementById("login-password").value;
    sendLoginRequest(userID, userPassword);
    event.preventDefault();
});

function sendLoginRequest(userEmail, userPassword) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful
            var result = this.response;
            if (result == "successful") {
                // do something
                window.location.href = "http://localhost:8081/" + this.response;
            }
            else if (result == "unsuccessful") {
                // do something
                console.log("signin unsuccessful");
            }

        }
    };
    xhttp.open("POST", "http://localhost:8081/SignIn", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    var data = {email: userEmail, password: userPassword};
    
    xhttp.send(JSON.stringify(data));
}

const registerForm = document.getElementById("register");
registerForm.addEventListener("submit", (e) => {
    let userID = document.getElementById("register-id").value;
    let userPassword = document.getElementById("register-password").value;
    let userEmail = document.getElementById("register-email").value;
    sendRegisterRequest(userID, userPassword, userEmail);
    event.preventDefault();
});

function sendRegisterRequest(userID, userPassword, userEmail) {
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful

        }
    };
    xhttp.open("POST", "http://localhost:8081/CreateUser", true);
    xhttp.setRequestHeader("Content-Type", "application/json");


    
    var data = {userName: userID, password: userPassword, email: userEmail};
    
    xhttp.send(JSON.stringify(data));
}