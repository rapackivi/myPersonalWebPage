const express = require("express");
const https = require("https");

const app = express();

app.get("/hello", function(req,res){
    res.write("<img src="/images/fox.jpeg"")
    res.send("<h1>Hello!</h1>");
})


app.get("/popa", function(req,res){
    res.send(";жопой чуяла что жопа");
})


app.listen(3000, function(){
    console.log("сервер стартовал!")
});

