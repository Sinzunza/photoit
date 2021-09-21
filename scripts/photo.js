var postIDUser;
var postUsernameUser;
var username;

window.addEventListener("load", function(evt) {
    postIDUser = getPostID();
    getPost(postIDUser);
    username = getUsername();
})

function getPost(postIDUser) {
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = 'json';
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful
            var result = this.response;

            if(result['Comments'] == null){
                console.log("no comments")
            }
            else{
                var comments = result['Comments']
                var commentBox = document.getElementById("commentList");
                comments = Object.values(comments)
                console.log(comments)
                for(let i = 0; i < comments.length; i++){
                    commentBox.innerHTML += "<div class=\"comment\">" + comments[i].Username + ": " + comments[i].Content + "</div>";
                }
            }

            postUsernameUser = result.Username;

            var userImgDoc = document.getElementById("userImg");
            var captionDoc = document.getElementById("caption");
            var likesDoc = document.getElementById("likes");

            userImgDoc.src = result.ImageURL;
            captionDoc.innerHTML = result.Caption +
                                   "<br><br><span>Posted By: " + postUsernameUser + "</span>";
            likesDoc.innerHTML = result.Likes;                

        }
    };
    var params = "?postID=" + postIDUser;
    xhttp.open("GET", "http://localhost:8081/GetPost" + params, true);
    
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

    var contentUser = document.getElementById("userMessage").value;

    var xhttp = new XMLHttpRequest();
    xhttp.responseType = 'json';
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful
            var result = this.response;
            if (result == null) {
                // do something
                console.log("error posting comment");
            }
            else {
                // do something
                console.log("create comment unsuccessful");
                console.log(result);

                var commentBox = document.getElementById("commentList");
                commentBox.innerHTML += "<div class=\"comment\">" + username + ": " + contentUser + "</div>";
            }
        }
    };
    xhttp.open("POST", "http://localhost:8081/PostComments", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    var data = {postID: postIDUser, content: contentUser};
    
    xhttp.send(JSON.stringify(data));
}

function getUsername() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful

            var result = this.response;
            var usernameText = document.getElementById("commentName");
            if (result == null) {
                usernameText.innerHTML = "Must be logged in to post comments!";
                username = result;
            }
            else {
                usernameText.innerHTML = "Posting comment as: ";
                var usernameDoc = document.getElementById("username");
                usernameDoc.innerHTML = result; 
                username = result; 
            }       

        }
    };
    xhttp.open("GET", "http://localhost:8081/GetUsername", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    xhttp.send();
}


function postLike() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful

            var result = this.response;

            if (result == null) {
                console.log("Error appreciating comment.\n");
            }
            else {
                var likesDoc = document.getElementById("likes");
                likesDoc.innerHTML = result; 
            }
        }
    };
    xhttp.open("POST", "http://localhost:8081/PostLike", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    var data = {postID: postIDUser, postUsername: postUsernameUser};
    
    xhttp.send(JSON.stringify(data));
}