var gamePattern = [];

const buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    return randomNumber;
}

var randomChosenColor =  buttonColors[nextSequence()];
gamePattern.push(randomChosenColor);

var buttonName = gamePattern[0];
$("." + buttonName).addClass("pressed");
var sourceAudio = "./sound/"+ buttonName + "mp3";
var buttonAudio = new Audio(src="sourceAudio");
// buttonAudio.play();
setTimeout( () => $(buttonName).removeClass("pressed"),200);

$(".btn").on("click",function(){

})
