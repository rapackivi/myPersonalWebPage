const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view enjine", "ejs");



app.get("/", (req, res)=>{
    const today = new Date();
    const day = today.getDay();
    if (day ===6 || day === 0){
        res.send("Otdohnite!");
    }else {
        res.send("nado porabotaty!")
    }
})


app.listen(3000, ()=>{
    console.log("Server started!")
})