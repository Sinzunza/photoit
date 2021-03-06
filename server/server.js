// import dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
var cors = require('cors')
require('dotenv').config();

// firebase
var firebase = require('firebase/app');
  require('firebase/auth');
  require('firebase/database');

firebase.initializeApp({
    apiKey: "AIzaSyCOetUOyMKkAt_P_9xUWkcRB8J5ernXM10",
    authDomain: "photoit110.firebaseapp.com",
    projectId: "photoit110",
    storageBucket: "photoit110.appspot.com",
    messagingSenderId: "17838263350",
    appId: "1:17838263350:web:b780ca82fda263eb549c97",
    measurementId: "G-VC0GJ2GXLT"
});

// create server
const app = express();
const port = process.env.PORT || 3000;

// add stuff to server
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../')));
app.use(cors());

// import handlers
const redirectHandler = require('./redirect.js');
const postsHandler = require('./posts.js');
const userHandler = require('./user.js');
const commentHandler = require('./comments.js');

//redirect
app.get('/', redirectHandler.getHome);


// get handlers
app.get('/GetPost', postsHandler.getPost);
app.get('/GetUsersPosts', postsHandler.getUsersPosts);
app.get('/GetCategoryPosts', postsHandler.getCategoryPosts);
app.get('/GetUserAuthentication', userHandler.getUserAuthentication);
app.get('/GetUserInfo', userHandler.getUserInfo);
app.get('/GetUserID', userHandler.getUserID);
app.get('/GetUsername', userHandler.getUsername);
app.get('/getMostLike', userHandler.getMostLike);
app.get('/getComments', commentHandler.getComments);
app.get('/searchDataBase', userHandler.searchDataBase); 

// post handlers
app.post('/CreatePost', postsHandler.postCreatePost);
app.post('/PostRegister', userHandler.postRegister);
app.post('/PostLogin', userHandler.postLogin);
app.post('/SignOut', userHandler.postSignOut);
app.post('/postComments', commentHandler.postComments);
app.post('/PostLike', postsHandler.postLike);
app.post('/PostUserAvatar', userHandler.postUserAvatar);

// start listening on server
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));