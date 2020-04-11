const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");



app.get("/", (req, res)=>{
    const listOfDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const today = new Date();
    const day = today.getDay();
    res.render("list", { nameDay:listOfDays[day] , weekday: day%6 });
})


app.listen(3000, ()=>{
    console.log("Server started!")
})