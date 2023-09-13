const startButton = document.querySelector('#start');
const timer = document.querySelector('#time');
const paragraph = document.querySelector('#message');
const container = document.querySelector("#container");
const list = document.querySelector('.list');
let time = 100;
const feedBack = document.querySelector("#feedback");
let correct = 0
const hideButton = document.querySelector('.start-button')


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
    answer: ['ajkf;','bjkf','cjkf','djkf'],
    correct: 'djkf'

};

var questionSet = [question1,question2,question3,question4];

var questionCur = 0

startButton.addEventListener("click", function () {
    
    //hideButton.style.display = none;
    list.innerHTML = "";
    paragraph.textContent = "";

    var timeInterval = setInterval(function () {
      // As long as the `timeLeft` is greater than 1
      if (time > 1 && time <= 100) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        timer.textContent = time + ' seconds remaining';
        // Decrement `timeLeft` by 1
        time--;
      } else if (time === 1) {
        // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
        timer.textContent = time + ' second remaining';
        time--;
      } else if(time <= 0) {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        timer.textContent = '';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        // Call the `displayMessage()` function
        displayMessage();
      }else {
        clearInterval(timeInterval);
      }
    }, 1000);

    let ansButton = [];

    paragraph.textContent = questionSet[questionCur].question;

    for(let i = 0; i < questionSet[questionCur].answer.length; i++) {
        list.innerHTML += '<li><button class= "ans">' + questionSet[questionCur].answer[i] + '</button></li>';

    };

    ansButton = document.querySelectorAll(".ans");

    for(let i = 0; i < ansButton.length; i++){
      ansButton[i].addEventListener("click", nextQuestion);
    }

    //list.addEventListener('click', nextQuestion(EventTarget));

  
  });


function nextQuestion(Event) {
  
  feedBack.textContent = "";
  let x = Event.target;
  if((x.innerHTML === questionSet[questionCur].correct) && (questionCur != questionSet.length-1)){
    list.innerHTML = "";
    questionCur = questionCur + 1;
    paragraph.textContent = questionSet[questionCur].question;
    for(let i = 0; i < questionSet[questionCur].answer.length; i++) {
      list.innerHTML += "<li><button class = 'ans'>" + questionSet[questionCur].answer[i] + "</button></li>"
    };
    ansButton = document.querySelectorAll(".ans");
    for(let i = 0; i < ansButton.length; i++){
      ansButton[i].addEventListener("click", nextQuestion);
    }
    //list.addEventListener('click', nextQuestion(EventTarget));
    feedBack.textContent = "Correct!";
    correct = correct + 1;
  } else if ((x.innerHTML === questionSet[questionCur].correct) && (questionCur === questionSet.length-1)){
    time = 101
    timer.textContent = ""
    correct = correct + 1;
      paragraph.textContent = "Congratulations!";
      list.innerHTML = "";
      feedBack.textContent = "You scored " + (correct/questionSet.length)*100 + "%!"

  }  else {
    time = time - 10;
    feedBack.textContent = "Wrong!"
  }
};




 function displayMessage() {
    feedBack.textContent = ""
    paragraph.textContent = "GAMEOVER!"
    list.innerHTML = ""
    list.insertAdjacentHTML('beforeend', '<button id = "try-again">Try Again?</button>');
    document.querySelector('#try-again').addEventListener('click', function () {
    
      //hideButton.style.display = none;
      list.innerHTML = "";
      paragraph.textContent = "";
      questionCur = 0
      time = 100;

      var timeInterval2 =  setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (time > 1 && time <= 100) {
          // Set the `textContent` of `timerEl` to show the remaining seconds
          timer.textContent = time + ' seconds remaining';
          // Decrement `timeLeft` by 1
          time--;
        } else if (time === 1) {
          // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
          timer.textContent = time + ' second remaining';
          time--;
        } else if(time <= 0) {
          // Once `timeLeft` gets to 0, set `timerEl` to an empty string
          timer.textContent = '';
          // Use `clearInterval()` to stop the timer
          clearInterval(timeInterval2);
          // Call the `displayMessage()` function
          displayMessage();
        }else {
          clearInterval(timeInterval2);
        }
      }, 1000);

      ansButton = [];
  
      paragraph.textContent = questionSet[questionCur].question;
  
      for(let i = 0; i < questionSet[questionCur].answer.length; i++) {
          list.innerHTML += '<li><button class= "ans">' + questionSet[questionCur].answer[i] + '</button></li>';
  
      };
  
      ansButton = document.querySelectorAll(".ans");
  
      for(let i = 0; i < ansButton.length; i++){
        ansButton[i].addEventListener("click", nextQuestion);
      }
  
      //list.addEventListener('click', nextQuestion(EventTarget));
  
    
    });;
};