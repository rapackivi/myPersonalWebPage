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
    name : {
        type : String,
        reqired : true
    }
});

const itemModel = mongoose.model("item", itemSchema);

const Item1 = new itemModel(
    {
        name : "to kill the Bill"
    }
)

const Item2 = new itemModel(
    {
        name : "to find a pencil for Masha"
    }
)

const Item3 = new itemModel(
    {
        name : "to find a pencil for Masha"
    }
)

itemModel.insertMany([Item1,Item2,Item3],((err)=>{
    if (!err){
        console.log("inserted success");
        mongoose.disconnect((err)=>{
            if (!err){
                console.log("connect success")
            } else {
                console.error.apply(err.message)
            }
        });
    } else {
        console.error.apply(err.message)
    }
}))

