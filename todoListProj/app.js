const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", (req, res)=>{
    res.send("Otdohnite!");
})


app.listen(3000, ()=>{
    console.log("Server started!")
})