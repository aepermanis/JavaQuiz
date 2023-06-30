var startButton = document.querySelector('#start');
var timer = document.querySelector('#time');
var paragraph = document.querySelector('#message');
var container = document.querySelector("#container");
var list = document.querySelector('#list');

var question1 = {
    question: "what",
    answer: ['a','b','c','d'],
    correct: 'a',
};

var question2 = {
    question: "why",
    answer: ['ag','bg','cg','dg'],
    correct: 'dg'

};

var question3 = {
    question: "when",
    answer: ['agf','bgf','cgf','dgf'],
    correct: 'cgf'

};

var question4 = {
    question: "where",
    answer: ['a','b','c','d'],
    correct: 'd'

};

var questionSet = [question1,question2,question3,question4];

var questionCur = 0

startButton.addEventListener("click", function(){

    var time = 100;
    list.innerHTML = "";
    paragraph.textContent = "";

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

    paragraph.textContent = questionSet[questionCur].question;

    for(let i = 0; i < questionSet[questionCur].answer.length; i++) {
        list.innerHTML += '<li><button class= "ans">' + questionSet[questionCur].answer[i] + '</button></li>';

    };

    var ansButton = document.querySelectorAll(".ans");
    
    for(let i = 0; i < ansButton.length; i++){
      ansButton[i].addEventListener("click", function() {
        if(ansButton[i].innerHTML === questionSet[questionCur].correct){
          list.innerHTML = ""
          questionCur = questionCur + 1;
          paragraph.textContent = questionSet[questionCur].question;
          for(let i = 0; i < questionSet[questionCur].answer.length; i++) {
            list.innerHTML += '<li><button class= "ans">' + questionSet[questionCur].answer[i] + '</button></li>';

            var ansButton1 = document.querySelectorAll(".ans");
    
            for(let i = 0; i < ansButton1.length; i++){
              ansButton1[i].addEventListener("click", function() {
                if(ansButton1[i].innerHTML === questionSet[questionCur].correct){
                  list.innerHTML = ""
                  questionCur = questionCur + 1;
                  paragraph.textContent = questionSet[questionCur].question;
                  for(let i = 0; i < questionSet[questionCur].answer.length; i++) {
                    list.innerHTML += '<li><button class= "ans">' + questionSet[questionCur].answer[i] + '</button></li>';
              };} else {
                time = time-10;
              };
            });
          };
      };} else {
        time = time-10;
      };
    });
  };

  
  });









 function displayMessage() {
    paragraph.textContent = "GAMEOVER"
    list.innerHTML = ""
};