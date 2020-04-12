const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let items = ["Make breakfast", "go shopping", "create miracle"];
let workItems = ["pass EJS tutorial", "check Test.io", "test uTest.com"]


// ===========COMMON=================
const listOfDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    var options = {
        weekday : "long",
        day : "numeric",
        month : "long"
    };

    const today = new Date();
    const todayStr = today.toLocaleDateString("en-US", options)
    const day = today.getDay();
// ==================================== 

app.get("/", (req, res)=>{
    
    res.render("list", { listTitle: "main", nameDay:listOfDays[day] , weekday: day%6 , date : todayStr, addedTasks : items });
})

app.get("/work", (req, res)=>{
    const listOfDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    var options = {
        weekday : "long",
        day : "numeric",
        month : "long"
    };

    const today = new Date();
    const todayStr = today.toLocaleDateString("en-US", options)
    const day = today.getDay();
    res.render("list", { listTitle: "work", nameDay:listOfDays[day] , weekday: day%6 , date : todayStr, addedTasks : workItems });
})

app.post("/", (req,res)=>{
    
    newItem = req.body.newTask;
    
    if (req.body.list==='work'){
        workItems.push(newItem);
        res.redirect("/work")
    } else {
        items.push(newItem);
        res.redirect("/");
    }
})

app.get("/about", (req,res)=>{
    res.render("about")
})


app.listen(3000, ()=>{
    console.log("Server started!")
})