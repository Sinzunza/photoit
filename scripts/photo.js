window.onload = function() {
    var postID = getPostID();
    getPost(postID);
}

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

            imgURLDoc.src = result.imageURL;
            captionDoc.innerHTML = result.caption +
                                   "<br><br><span>PostedBy: " + result.userName + "</span>";
            likesDoc.innerHTML = ": " + result.likes;
                            

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
    var postID = url.searchParams.get("postID");
    return postID;
}