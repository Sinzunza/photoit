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

            if(result['comments'] == null){
                console.log("no comments")
            }
            else{
                //console.log(result);
                var comments = result['comments']
                var commentBox = document.getElementById("commentList");
                comments = Object.values(comments)
                console.log(comments)
                for(let i = 0; i < comments.length; i++){
                    commentBox.innerHTML += "<div class=\"comment\">" + comments[i].user + ": " + comments[i].content + "</div>";
                }
            }



            var userImgDoc = document.getElementById("userImg");
            var captionDoc = document.getElementById("caption");
            var likesDoc = document.getElementById("likes");

            userImgDoc.src = result.imageURL;
            captionDoc.innerHTML = result.caption +
                                   "<br><br><span>PostedBy: " + result.userName + "</span>";
            likesDoc.innerHTML = result.likes;                

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
                console.log("create post unsuccessful");
                console.log(result);
            }
        }
    };
    xhttp.open("POST", "http://localhost:8081/PostComments", true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    var contentUser = document.getElementById("userMessage").value;
    
    var data = {postID: postIDUser, content: contentUser};
    
    xhttp.send(JSON.stringify(data));
}

function getUserName() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful

            var result = this.response;
            var usernameDoc = document.getElementById("username");
            usernameDoc.innerHTML = result;           

        }
    };
    xhttp.open("GET", "http://localhost:8081/GetUserName", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    xhttp.send();
}


function postLike() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful
            var result = this.response;

            var likesDoc = document.getElementById("likes");
            likesDoc.innerHTML = result; 
            
            var commentFeedback = document.getElementById("commentFeedback");
            var commentVal = document.getElementById("userMessage")
            if (result == null) {
                // do something
                console.log("error posting comment");
                commentFeedback.style.color = "red";
                //commentFeedback.innerHTML = "Error posting comment";
            }
            else {
                // do something
                console.log("create post unsuccessful");
                console.log(result);
                location.reload();
                //commentFeedback.style.color = "green";
                //commentFeedback.innerHTML = "Comment Posted!";
                //commentVal.value = "";
            }
        }
    };
    xhttp.open("POST", "http://localhost:8081/PostLike", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    var data = {postID: postIDUser};
    
    xhttp.send(JSON.stringify(data));
}
