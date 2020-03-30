const fs = require('fs');

fs.readFile("./src/input.txt", 'utf8' , (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err);
        return;
    }
    console.log('File data:', jsonString) 
})

