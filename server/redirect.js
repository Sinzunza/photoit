var path = require('path');

function getHome(request, response) {
    // The first parameter is the name of the hbs file
    //var reqPath = path.join(__dirname, '../');
    //response.sendFile(reqPath + '/views/home.html');
    response.render('home');

}

module.exports = {
    getHome
};