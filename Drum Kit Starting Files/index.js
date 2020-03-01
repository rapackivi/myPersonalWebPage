console.log("index.js linked!");

var length = document.querySelectorAll(".drum").length;

for (var i=0;i<length;i++){
    self = document.querySelectorAll(".drum")[i]
    self.addEventListener("click",showMeWhoYouAre)
}

function showMeWhoYouAre () {
    console.log(this.innerHTML + " была нажата. Сня с Данилам друзья"
     )
}