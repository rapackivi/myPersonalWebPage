const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const dateUtil = require(__dirname+"/date.js");

mongoose.connect("mongodb://localhost/todolistDB", { useNewUrlParser:true, useUnifiedTopology:true });

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


let workItems = ["pass EJS tutorial", "check Test.io", "test uTest.com"]


// ===========COMMON=================
let [todayStr, day] = dateUtil.getDate();
// ==================================== 
//================DB================
const itemSchema = mongoose.Schema({
    name : {
        type : String,
        reqired : true
    }
});

const itemModel = mongoose.model("item", itemSchema);



app.get("/", (req, res)=>{
    itemModel.find({}, (err,result)=>{
        if (!err){
            console.log("reading success");
            res.render("list", { 
                listTitle: "main",  
                weekday: day%6 , 
                date : todayStr, 
                addedTasks : result })
        } else {
            console.error.apply(err.message)
        }
    })
    
})

app.get("/work", (req, res)=>{
    res.render("list", { listTitle: "work",  weekday: day%6 , date : todayStr, addedTasks : workItems });
})

app.post("/delete", (req,res)=>{
    const id = req.body.checkbox;
    itemModel.findByIdAndDelete(id, (err)=> console.log(err||"successfuly deleted!"));
    res.redirect("/");
})

app.post("/", (req,res)=>{
    
    const nameNewItem = req.body.newTask;
    const newItem = new itemModel({
        name : nameNewItem
    });
    newItem.save();
    res.redirect("/")
    
})

app.get("/lists/:param")
app.get("/about", (req,res)=>{
    res.render("about")
})


app.listen(3000, ()=>{
    console.log("Server started!")
})