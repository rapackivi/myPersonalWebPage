const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded( { extended:true } ))

app.get("/", (res, req)=>{
    req.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req,res){
    console.log(req.body);
})


app.listen(3000, ()=> {
    console.log("Server started on 3000 port!")
})

