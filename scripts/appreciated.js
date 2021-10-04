window.addEventListener("load", function(evt) {
    getTopUser();
})

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
                value.sort((a, b) => b.AppreciationPoints - a.AppreciationPoints);
                console.log(value); 
                var container = document.getElementById("container");
                container.innerHTML = "";
                if(value.length < 3){
                    container.innerHTML = "Needs at least 3 users with photo(s) uploaded";
                }
                else{
                    for(let i = 0; i < 3; i++){
                        container.innerHTML += "<div class=\"box\">" + 
                                                    "<a href=\"../views/user.html?user=" + value[i].Username + "\">" +
                                                        "<div class =\"imgBox\">" +
                                                            "<img src=\"" + value[i].ProfilePic + "\">" +
                                                        "</div>" +
                                                        "<div class=\"content\">" +
                                                            "<h2>#" + (i+1) + ") " + value[i].Username + "<br><span>" + value[i].AppreciationPoints + " Appreciation Points</span></h2>" +
                                                        "</div>" +
                                                    "</a>" +
                                                "</div>";
                    }
                }
            }
        }
    };
    xhttp.open("GET", "http://localhost:8081/getMostLike", true); 
    xhttp.send(); 
}