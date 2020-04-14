const express = require("express");
const bodyParser = require("body-parser");
const dateUtil = require(__dirname+"/date.js");


const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let items = ["Make breakfast", "go shopping", "create miracle"];
let workItems = ["pass EJS tutorial", "check Test.io", "test uTest.com"]


// ===========COMMON=================
let [todayStr, day] = dateUtil.getDate();
// ==================================== 

app.get("/", (req, res)=>{
    res.render("list", { listTitle: "main",  weekday: day%6 , date : todayStr, addedTasks : items });
})

app.get("/work", (req, res)=>{
    res.render("list", { listTitle: "work",  weekday: day%6 , date : todayStr, addedTasks : workItems });
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