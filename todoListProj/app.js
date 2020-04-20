const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const dateUtil = require(__dirname+"/date.js");

mongoose.connect("mongodb://localhost/todolistDB", { useNewUrlParser:true, useUnifiedTopology:true });

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


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
//===================================

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

app.post("/", (req,res)=>{
    const nameNewItem = req.body.newTask;
    const newItem = new itemModel({
        name : nameNewItem
    });
    newItem.save();
    res.redirect("/") 
})



app.post("/delete", (req,res)=>{
    const id = req.body.checkbox;
    itemModel.findByIdAndDelete(id, (err)=> console.log(err||"successfuly deleted!"));
    res.redirect("/");
})




app.post("/delete/lists/:param", (req,res)=>{
    const id = req.body.checkbox;
    const listName = req.params.param;
    const ItemModel = mongoose.model(listName,itemSchema);
    ItemModel.findByIdAndDelete(id, (err)=> console.log(err||"successfuly deleted!"));
    res.redirect("/lists/"+listName);
})

app.post("/lists/:param", (req,res)=>{
    const listName = req.params.param;
    const nameNewItem = req.body.newTask;
    const ItemModel = mongoose.model(listName,itemSchema);
    const newItem = new ItemModel({
        name : nameNewItem
    });
    newItem.save();
    res.redirect("/lists/"+listName) ;
})

app.get("/lists/:param", (req,res)=>{
    const listName = req.params.param;
    const ItemModel = mongoose.model(listName,itemSchema);
    ItemModel.find({}, (err,result)=>{
        if (!err){
            console.log("reading success");
            res.render("list_customList", { 
                listTitle: listName,  
                weekday: day%6 , 
                date : todayStr, 
                addedTasks : result })
        } else {
            console.error.apply(err.message)
        }
    })  
})

app.get("/about", (req,res)=>{
    res.render("about")
})


app.listen(3000, ()=>{
    console.log("Server started!")
})