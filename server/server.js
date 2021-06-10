// import dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
var cors = require('cors')

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
const port = 8081;

// add stuff to server
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// import handlers
const postsHandler = require('./posts.js');
const createUserHandler = require('./user.js');
const commentHandler = require('./comments.js');
// get handlers
app.get('/GetPost', postsHandler.getPost);
app.get('/GetUsersPosts', postsHandler.getUsersPosts);
app.get('/GetCategoryPosts', postsHandler.getCategoryPosts);
app.get('/GetUserName', createUserHandler.getUserName);
app.get('/getComments', commentHandler.getComments);
app.get('/searchDataBase', createUserHandler.searchDataBase); 

// post handlers
app.post('/CreatePost', postsHandler.postCreatePost);
app.post('/CreateUser', createUserHandler.postCreateUser);
app.post('/SignIn', createUserHandler.postSignIn);
app.post('/postComments', commentHandler.postComments);
app.post('/PostAddLike', postsHandler.postAddLike);
app.post('/PostRemoveLike', postsHandler.postRemoveLike);


// start listening on server
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));