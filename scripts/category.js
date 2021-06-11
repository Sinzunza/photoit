function getCategoryType()
{
    var url_string = window.location.href;
    var url = new URL(url_string);
    return url.searchParams.get("categoryType");
}
function getCategoryPosts()
{
    // get current page category
    var categoryType = getCategoryType()

    var xhttp = new XMLHttpRequest();
    xhttp.responseType = 'json';
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) { // call is complete and call is successful
            var result = this.response; 
            console.log("Category search result: " + result); 
            if (result == null)
            {
                // no posts under current category type
            }
            else 
            {
                // display posts
            }
        }
    };
    var params = "?" + "category=" + categoryType + "&filterType=month"; 
    xhttp.open("GET", "http://localhost:8081/GetCategoryPosts" + params, true); 
    xhttp.send(); 
}

// call server to requst post of that category
window.onload = function() {
    getCategoryPosts(); 
}