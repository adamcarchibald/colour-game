console.log('script.js loaded');

var colorBoxes = document.querySelectorAll(".color-box");
var resetButton = document.querySelector("#reset");
var headerContainer = document.querySelector("#header-container");
var headerContainerColor = window.getComputedStyle(headerContainer, null).backgroundColor;
var numberOfSquares = 6;
var hardButton = document.querySelector("#hard");
var easyButton = document.querySelector("#easy");

function newCorrectAnswer(){
    correctAnswer = colorBoxes[Math.floor(Math.random() * numberOfSquares)];
}

function randomColor() {
    var rgbColors = [];
    for(var i = 0; i < 3; i ++){
        rgbColors.push(Math.floor(Math.random() * 256)); 
    }
    return "rgb(" + rgbColors.join(",") + ")";
}

function setupColorBoxes() {
    colorBoxes.forEach(function(element, index, list){
        if(index < numberOfSquares) {
            element.style.backgroundColor = randomColor();
            element.addEventListener("click", answerCheck);
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
}

function answerCheck() {
    if(this === correctAnswer){
        document.querySelector("#notice").innerText = "Correct!";
        document.querySelector("#header-container").style.backgroundColor = this.style.backgroundColor;
        winner();
    } else {
        this.style.backgroundColor = window.getComputedStyle(document.body, null).backgroundColor;
        document.querySelector("#notice").innerText = "Try Again!";
    }
}

function winner() {
    colorBoxes.forEach(function(element){
        element.style.backgroundColor = correctAnswer.style.backgroundColor;
        element.removeEventListener("click", answerCheck);
    });
    resetButton.innerText = "Play Again";
}

function reset() {
    setupColorBoxes();
    newCorrectAnswer();
    resetButton.innerText = "New Colors";
    setupHeader();
}

function setupHeader() {
    headerContainer.style.backgroundColor = headerContainerColor;
    document.querySelector("#color-to-match").innerText = correctAnswer.style.backgroundColor;
}

function changeDifficulty(difficulty) {
    if(numberOfSquares !== difficulty){
        numberOfSquares = difficulty;
        reset();
        document.querySelectorAll(".difficulty").forEach(function(element){
            if (element.classList.contains("selected")) {
                element.classList.remove("selected");
            } else {
                element.classList.add("selected");
            }
        })
    }
}

reset();
resetButton.addEventListener("click", reset);
hardButton.addEventListener("click", function(){ changeDifficulty(6) });
easyButton.addEventListener("click", function(){ changeDifficulty(3) });
