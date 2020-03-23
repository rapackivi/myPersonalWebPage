const express = require("express");
const https = require("https");

const app = express();

const body = "https://api.openweathermap.org/data/2.5/weather?";
const city = "q=Kharkiv";
const units = "units=metric";
const apiKey = "appid=11ec3a36143b9e3072bedd062674c8ef";
const conditionCode = "http://openweathermap.org/img/wn/";
const conditionCode2 = "@2x.png";

app.get("/hello", function(req,res){
    url = body + city + "&" + units + "&" + apiKey;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescr = weatherData.weather[0].description;
            const weatherPict = conditionCode + weatherData.weather[0].icon + conditionCode2;
            res.write("<p>Weather in Kharkiv - " + weatherDescr + "</p>");
            res.write("<h1>temperature in Kharkiv"+ temp +"</h1>");
            res.write("<img src=" + weatherPict + ">");
            res.send();
        })
    })
   
    
})


app.get("/popa", function(req,res){
    res.send(";жопой чуяла что жопа");
})


app.listen(3000, function(){
    console.log("сервер стартовал!")
});

