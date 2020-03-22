const express = require("express");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({ extended:true }));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){
    let num1 = Number(req.body.num1);
    let num2 = Number(req.body.num2);
    res.send((num1+num2).toString(10));
})


app.get("/bmicalculator", function(req,res){
    res.sendFile(__dirname + "/indexBMIcalculator.html");
})

app.post("/bmicalculator", function(req,res){
    let height = parseFloat(req.body.height);
    let weight = parseFloat(req.body.weight);
    let bmi = weight/(height*height);
    let conclusion;
    if (bmi<18.5){
        conclusion = ", you have low weight for you height";
    }else if (bmi>=25){
        conclusion = ", you have large weight for you height";
    }else{
        conclusion = ", you have normal weight for you height";
    }
    res.send("your bmi is "+ bmi.toFixed(1) + conclusion);
})

app.listen(3000);