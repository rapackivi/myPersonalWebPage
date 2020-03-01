var length = document.querySelectorAll(".drum").length;

for (var i=0;i<length;i++){
    document.querySelectorAll(".drum")[i].addEventListener("click",function(){
        innerHtml = this.innerHTML;
        makeSound(innerHtml);
        makeAnimation(innerHtml);
    })
}

document.addEventListener("keydown", function(event){
    makeSound(event.key)
    makeAnimation(event.key)
})

function makeAnimation (key){
    var list = ["w","a","s","d","j","k","l"];
    if (key in list){
        var activeButton = document.querySelector("."+key);
        activeButton.classList.add("pressed");
        setTimeout(function(){
            activeButton.classList.remove("pressed");
        },500)
    }
    
}

function makeSound(key){
    switch (key){
        case "w":
            var crash = new Audio("./sounds/crash.mp3");
            crash.play();
        break;
        case "a":
            var kick = new Audio("./sounds/kick-bass.mp3");
            kick.play();
        break;
        case "s":
            var snare = new Audio("./sounds/snare.mp3");
            snare.play();
        break;
        case "d":
            var tom1 = new Audio("./sounds/tom-1.mp3");
            tom1.play();
        break;
        case "j":
            var tom2 = new Audio("./sounds/tom-2.mp3");
            tom2.play();
        break;
        case "k":
            var tom3 = new Audio("./sounds/tom-3.mp3");
            tom3.play();
        break;
        case "l":
            var tom4 = new Audio("./sounds/tom-4.mp3");
            tom4.play();
        break;

        default: console.log(key)
    }
}