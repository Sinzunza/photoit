window.onload = function() {
    getTopUser(); 
}
function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
} 
function getTopUser()
{
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = 'json';
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful

            var result = this.response; 

            if (result == null) {
                console.log("no users exists");
            }
            else {
                value = Object.values(result); 
                value.sort(GetSortOrder("AppreciatedPoint")); 
                console.log(value); 
    //            console.log(result);
                // var container = document.getElementById("container");
                // container.innerHTML = "";
                // var picturesID = Object.keys(this.response[0]); 
                // var pictures = Object.values(this.response[0]);
                // // console.log(pictures); 
                // var picHostedLink;
                // var picTitle;
                // var postID; 
                // for(let i = 0; i < pictures.length; i++){
                //     picHostedLink = pictures[i].imageURL;
                //     picTitle = pictures[i].caption;
                //     postID = picturesID[i]; 
                //     container.innerHTML += "<div class=\"box\">" +
                //                             "<div class=\"imgBox\">" +
                //                                 "<form action=\"../views/photo.html\">" + 
                //                                     "<input type=\"hidden\" name=\"postID\" value=\"" + postID + "\"/>" +
                //                                         "<button class=\"btn\" type=\"submit\" id=\"categoryButton\">" + 
                //                                             "<img src=\"" + picHostedLink + "\">" + 
                //                                         "</button>" + 
                //                                 "</form>" +
                //                             "</div>" +
                //                             "<div class=\"content\">" +
                //                                 "<h2>" + picTitle + "</h2>" +
                //                             "</div>";
                //}
            }
        }
    };
    xhttp.open("GET", "http://localhost:8081/getMostLike", true); 
    xhttp.send(); 
}