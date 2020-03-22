var gamePattern = [];
var userClickedPattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor =  buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    var btnAudio = new Audio("./sounds/"+ randomChosenColor + ".mp3");
    btnAudio.play();
    $("h1").text("level "+level);
    level++;
}

function checkAnswer(currentLevel){

}

//make our buttons to be live!
$(".btn").on("click",function(event){
    
    var btnName = event.target.id;
    checkAnswer(level);
    $("#"+btnName).addClass("pressed")
    setTimeout( () => $("#"+ btnName ).removeClass("pressed"),200);
    var sourceAudio = "./sounds/"+ btnName + ".mp3";
    var btnAudio = new Audio(sourceAudio);
    btnAudio.play();
    userClickedPattern.push(btnName);
})
///////////////////////////////////////
var justStarted = true;
var level = 0;
$(document).on("keydown", ()=>{
    if (justStarted){
        nextSequence();
        justStarted = false;
        
    }
    
})
