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
    name : String
})
const ItemModel = mongoose.model("item", itemSchema)

const listSchema = mongoose.Schema({
    name : String,
    items : [itemSchema]
})
const listModel = mongoose.model("list", listSchema);
//===================================



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




app.post("/delete/:param", (req,res)=>{
    const id = req.body.checkbox;
    
    console.log(id);
    const listName = req.params.param;
    console.log(listName);
    listModel.findOneAndUpdate({name:listName},
        {$pull: {items: {_id:id}}},
        (err, result)=>{
            if(!err){
                console.log("successed in deleting!");
                result.save();
                res.redirect("/"+listName);
            }
        });
})

app.post("/:param", (req,res)=>{
    const listName = req.params.param;
    const nameNewItem = req.body.newTask;
    const newItem = new ItemModel({
        name : nameNewItem
    });
    listModel.findOne({name:listName}, (err, resultList)=>{
        if (!err){
            resultList.items.push(newItem);
            resultList.save();
            res.redirect("/" + listName);
        } else {
            console.log("vse ocheny ploho!")
        }
    })
    
})

app.get("/:param", (req,res)=>{
    const listName = req.params.param;
    listModel.findOne({name:listName}, (err,result)=>{
        if (!err){
            if (result){
                console.log("reading success");
                console.log(result);
                res.render("list_customList", { 
                    listTitle: listName,  
                    weekday: day%6 , 
                    date : todayStr, 
                    addedTasks : result.items })
            }else{
                listModel.create({name:listName,items:[]},(err)=> console.log(err||"success new list created"));
                res.render("list_customList", { 
                    listTitle: listName,  
                    weekday: day%6 , 
                    date : todayStr, 
                    addedTasks : [] })   
            }
             
        } else {
            console.log(err.message)
        }
    })  
})

app.get("/about", (req,res)=>{
    res.render("about")
})


app.listen(3000, ()=>{
    console.log("Server started!")
})