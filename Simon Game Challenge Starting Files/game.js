var gamePattern = [];
var userClickedPattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor =  buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    var btnAudio = new Audio("./sounds/"+ randomChosenColor + ".mp3");
    btnAudio.play();
    level++;
    $("h1").text("level " + level);
}


var justStarted = true;
//make our buttons to be live!
var lastAnswerIndex = 0;
$(".btn").on("click",function(event){
    if (justStarted){
        return;
    }
    var btnName = event.target.id;
    $("#"+btnName).addClass("pressed")
    setTimeout( () => $("#"+ btnName ).removeClass("pressed"),200);
    var sourceAudio = "./sounds/"+ btnName + ".mp3";
    var btnAudio = new Audio(sourceAudio);
    btnAudio.play();
    userClickedPattern.push(btnName);
    if (checkAnswer(lastAnswerIndex)){
        ++lastAnswerIndex;
        console.log(lastAnswerIndex);
    } else {
        gameOver();
        justStarted = true;
        return;
    }

    if (lastAnswerIndex===level){
        console.log("end");
        lastAnswerIndex=0;
        userClickedPattern = [];
        setTimeout(nextSequence,1000);
    }
})
///////////////////////////////////////

$(document).on("keydown", ()=>{
    if (justStarted){
        nextSequence();
        justStarted = false;
    }
})

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        return true;
    }else{
        console.log("wrong");
        return false;
    }
}

function gameOver(){
    level = 0;
    lastAnswerIndex = 0;
    userClickedPattern = [];
    gamePattern = [];
    var btnAudio = new Audio("./sounds/wrong.mp3");
    btnAudio.play();
    $("h1").text("Game over. Press any key to restart");
    $("body").addClass("game-over")
    setTimeout(()=>{
        $("body").removeClass("game-over")
    },200)
}