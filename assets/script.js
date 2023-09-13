const startButton = document.querySelector('#start');
const timer = document.querySelector('#time');
const paragraph = document.querySelector('#message');
const container = document.querySelector("#container");
const list = document.querySelector('.list');
let time = 100;
const feedBack = document.querySelector("#feedback");
let correct = 0;
const startDiv = document.querySelector('.start-button');
const highScore = document.querySelector('.scores');

//populates all the high scores in local storage
highScore.addEventListener('click', function() {
  list.innerHTML = "";
  feedBack.textContent = "";
  paragraph.textContent = "";
  let intialsArray = Object.keys(localStorage);
  for (let i = 0; i < intialsArray.length; i++){
    let x = localStorage.getItem(intialsArray[i])
    list.innerHTML += '<p class = "data">' + intialsArray[i] + ': ' + x + '</p>'
  }
})


//the questions for the quiz
var question1 = {
    question: "What determines the functionality of a simple webpage",
    answer: ['Javascript','Capitalism','HTML','CSS'],
    correct: 'Javascript',
};

var question2 = {
    question: "What is used to indicate a class name",
    answer: ['#',';','===','.'],
    correct: '.'

};

var question3 = {
    question: "What is the command to pull changes from github into a repo",
    answer: ['cd . .','mkdir','git pull origin main','git add -A'],
    correct: 'git pull origin main'

};

var question4 = {
    question: "Where would you find the styling for a webpage",
    answer: ['HTML','Javascript','CSS','The URL'],
    correct: 'CSS'

};

//array of questions
var questionSet = [question1,question2,question3,question4];

//sets the current question to the first 
var questionCur = 0



//on start button click the quiz will populate the first set of questions and begin the timer
startButton.addEventListener("click", function () {
    
    startDiv.innerHTML = "";
    list.innerHTML = "";
    paragraph.textContent = "";

    var timeInterval = setInterval(function () {
      if (time > 1 && time <= 100) {
        timer.textContent = time + ' seconds remaining';
        time--;
      } else if (time === 1) {
        timer.textContent = time + ' second remaining';
        time--;
      } else if(time <= 0) {
        timer.textContent = '';
        clearInterval(timeInterval);
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
  });

//moves to the next question
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
    feedBack.textContent = "Correct!";
    correct = correct + 1;
  } else if ((x.innerHTML === questionSet[questionCur].correct) && (questionCur === questionSet.length-1)){
    time = 101
    timer.textContent = ""
    correct = correct + 1;
      paragraph.textContent = "Congratulations!";
      list.innerHTML = "";
      let percentage = (correct/questionSet.length)*100
      feedBack.textContent = "You scored " + percentage + "%!"
      saveHighScore(percentage);
      

  }  else {
    time = time - 10;
    feedBack.textContent = "Wrong!"
  }
};



//asks player to try again if they fail
 function displayMessage() {
    feedBack.textContent = ""
    paragraph.textContent = "GAMEOVER!"
    list.innerHTML = ""
    list.insertAdjacentHTML('beforeend', '<button id = "try-again">Try Again?</button>');
    document.querySelector('#try-again').addEventListener('click', function () {
    
      list.innerHTML = "";
      paragraph.textContent = "";
      questionCur = 0
      time = 100;

      var timeInterval2 =  setInterval(function () {
        if (time > 1 && time <= 100) {
          timer.textContent = time + ' seconds remaining';
          time--;
        } else if (time === 1) {
          timer.textContent = time + ' second remaining';
          time--;
        } else if(time <= 0) {
          timer.textContent = '';
          clearInterval(timeInterval2);
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
    });;
};

 //returns html for a submission button
function createSave() {
  return '<div class = "start-button"> <input type = "text" id = "Intials" placeholder = "type your intials"> <button id = "submit">Submit</button> </div>'
};

//saves the high score to local storage
function saveHighScore(score){
  list.insertAdjacentHTML('beforeend', createSave());
  document.querySelector('#submit').addEventListener('click', function() {
      const intial = document.getElementById('Intials').value;
    console.log(intial);
    console.log(score);
    localStorage.setItem(intial, score);
    list.innerHTML = ""
    paragraph.textContent = "Awesome Job"
  });

}


