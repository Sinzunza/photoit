// call server to requst post of that category

window.addEventListener("load", function(evt) {
    var category = getCategoryType();
    getCategoryPosts(category, "week");
})

function getCategoryPosts(categoryUser, filterUser)
{

    var xhttp = new XMLHttpRequest();
    xhttp.responseType = 'json';
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful

            var result = this.response; 

            if (result == "unsuccessful") {
                console.log("Error: occurred in getting posts");
            }
            else if (result == null) {
                console.log("no posts exists");
            }
            else {

                var container = document.getElementById("container");
                container.innerHTML = "";
                var picturesID = Object.keys(this.response[0]); 
                var pictures = Object.values(this.response[0]);
                // console.log(pictures); 
                var picHostedLink;
                var picTitle;
                var postID; 
                for(let i = 0; i < pictures.length; i++){
                    picHostedLink = pictures[i].ImageURL;
                    picTitle = pictures[i].Caption;
                    postID = picturesID[i]; 
                    container.innerHTML += "<div class=\"box\">" +
                                            "<div class=\"imgBox\">" +
                                                "<form action=\"../views/photo.html\">" + 
                                                    "<input type=\"hidden\" name=\"postID\" value=\"" + postID + "\"/>" +
                                                        "<button class=\"btn\" type=\"submit\" id=\"categoryButton\">" + 
                                                            "<img src=\"" + picHostedLink + "\">" + 
                                                        "</button>" + 
                                                "</form>" +
                                            "</div>" +
                                            "<div class=\"content\">" +
                                                "<h2>" + picTitle + "</h2>" +
                                            "</div>";
                }
            }
        }
    };
    var params = "?" + "category=" + categoryUser + "&filter=" + filterUser; 
    xhttp.open("GET", "http://localhost:8081/GetCategoryPosts" + params, true); 
    xhttp.send(); 
}

function getCategoryType()
{
    var url_string = window.location.href;
    var url = new URL(url_string);
    var categoryName = url.searchParams.get("categoryType");
    var categoryNameID = document.getElementById("category_name");
    categoryNameID.innerHTML = categoryName;
    return categoryName;
}