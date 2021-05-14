// 5-6
"user strict"; // ECMA Script VS

const express = require("express");
const app = express();
const port = process.env.port || 8081;

app.get("/", (req,res) => {
    res.send("Hello World");
    console.log("landing page");
});

app.get("/GetUsername", (req, res) =>{
    res.send("inzomniac");
    console.log("things cars");
});

app.listen(port, err => {
    if (err) {
        return console.log("ERROR", err);
    }
    console.log("listening on port " + port);
});
