console.log("js connected!")
$("h1").css("color", "red")
$("h1").addClass("big-fat")
$("button").text("Hello!")

$("a").attr("href","https://yahoo.com")

$("button").on("click", function(){
    var target = $("h1");
    target.removeClass("big-fat");
    target.css("color","purple")
})

$(".myField").keypress(function(event){
    $(".title").text($(".title").text()+event.key)
})

$(document).on("keydown", function(event){
    var square = $(".square");
    var topStr = square.css("top")
    var top = parseInt(topStr.slice(0,topStr.length-2),10);
    var leftStr = square.css("left")
    var left = parseInt(leftStr.slice(0,leftStr.length-2),10);
    switch(event.key){
        case "ArrowUp":
            square.css("top",top-100+"px");
            break;
        case "ArrowDown":
                square.css("top",top+100+"px");
                break;
        case "ArrowLeft":
                square.css("left",left-100+"px");
                break;
        case "ArrowRight":
                square.css("left",left+100+"px");
                break;    
        default:console.log("nothing");
    }
})