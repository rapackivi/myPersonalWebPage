const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const cities = require("./unzipper")
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
console.log(cities)

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html")
})

app.post("/" , function(req, res){
    console.log(req.body.ukraineCity)
    const city = req.body.cityName;
    const units = "metric";
    const apiKey = "11ec3a36143b9e3072bedd062674c8ef";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + units + "&appid=" + apiKey;

    
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescr = weatherData.weather[0].description;
            const weatherPict = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
            
            res.write("<p>Weather in "+ city +" - " + weatherDescr + "</p>");
            res.write("<h1>temperature in "+ city + " " + temp +"</h1>");
            res.write("<img src=" + weatherPict + ">");
            res.send();
        })
    })
    
})






app.listen(3000, function(){
    console.log("сервер стартовал!")
});

