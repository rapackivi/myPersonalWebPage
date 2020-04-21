const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/todolistDB", { useNewUrlParser:true , useUnifiedTopology:true }, (err)=>{
    if (!err){
        console.log("connect success")
    } else {
        console.error.apply(err.message)
    }
})



////first fill//////////////////////
const itemSchema = mongoose.Schema({
    name : String
})

const ItemModel = mongoose.model("item", itemSchema)

const itemTest1 = new ItemModel({
    name : "do 1 weird thing"
})
const itemTest2 = new ItemModel({
    name : "do 2 weird thing"
})

const listSchema = mongoose.Schema({
    name : String,
    items : [itemSchema]
})


const listModel = mongoose.model("list", listSchema);

const firstList = new listModel({
    name : "firstList",
    items: [itemTest1,itemTest2]
})

firstList.save();