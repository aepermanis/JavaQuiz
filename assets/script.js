var startButton = document.querySelector('#start');
var timer = document.querySelector('#time');
var paragraph = document.querySelector('#message');
var container = document.querySelector("#container");
var list = document.querySelector('#list');

var question1 = {
    question: "what",
    answer: ['a','b','c','d'],
    correct: 'b',
};

var question2 = {
    question: "why",
    answer: ['a','b','c','d'],
    correct: 'd'

};

var question3 = {
    question: "when",
    answer: ['a','b','c','d'],
    correct: 'c'

};

var question4 = {
    question: "where",
    answer: ['a','b','c','d'],
    correct: 'd'

};

var questionSet = [question1,question2,question3,question4];

startButton.addEventListener("click", function(){

    var time = 100;
    list.innerHTML = ""
    paragraph.textContent = ""

    paragraph.textContent = question1.question;

    for(let i = 0; i < question1.answer.length; i++) {
        //item = list.createElement("li");
        //item.innerHTML = '<li><button></button></li>';
        //item.textContent = question1.answer[i];
        list.innerHTML += '<li><button>' + question1.answer[i] + '</button></li>';


    };

    
    

    var timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (time > 1) {
          // Set the `textContent` of `timerEl` to show the remaining seconds
          timer.textContent = time + ' seconds remaining';
          // Decrement `timeLeft` by 1
          time--;
        } else if (time === 1) {
          // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
          timer.textContent = time + ' second remaining';
          time--;
        } else {
          // Once `timeLeft` gets to 0, set `timerEl` to an empty string
          timer.textContent = '';
          // Use `clearInterval()` to stop the timer
          clearInterval(timeInterval);
          // Call the `displayMessage()` function
          displayMessage();
        }
      }, 1000);

});








 function displayMessage() {
    paragraph.textContent = "GAMEOVER"
};