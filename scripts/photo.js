var postIDUser;

window.addEventListener("load", function(evt) {
    postIDUser = getPostID();
    getPost(postIDUser);
    getUserName();
})

function getPost(postIDUser) {
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = 'json';
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful
            var result = this.response;

             console.log(result);

            var imgURLDoc = document.getElementById("imgURL");
            var captionDoc = document.getElementById("caption");
            var likesDoc = document.getElementById("likes");
            var usernameDoc = document.getElementById("username");

            imgURLDoc.src = result.imageURL;
            captionDoc.innerHTML = result.caption +
                                   "<br><br><span>PostedBy: " + result.userName + "</span>";
            likesDoc.innerHTML = result.likes;                

        }
    };
    var params = "?postID=" + postIDUser;
    xhttp.open("GET", "http://localhost:8081/GetPost" + params, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    xhttp.send();
}

function getPostID()
{
    var url_string = window.location.href;
    var url = new URL(url_string);
    var postIDTemp = url.searchParams.get("postID");
    return postIDTemp;
}

function postComment() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful
            var result = this.response;
            if (result == "successful") {
                // do something
                console.log("create post successful");
            }
            else if (result == "unsuccessful") {
                // do something
                console.log("create post unsuccessful");
            }
        }
    };
    xhttp.open("POST", "http://localhost:8081/PostComments", true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    var contentUser = document.getElementById("userMessage");
    
    var data = {postID: postIDUser, content: contentUser};
    
    xhttp.send(JSON.stringify(data));
}

function getUserName() {
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = 'json';
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful
            var result = this.response;

            console.log("username = " + result);

            var usernameDoc = document.getElementById("username");
            usernameDoc.innerHTML = result;           

        }
    };
    xhttp.open("GET", "http://localhost:8081/GetUserName", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    xhttp.send();
}