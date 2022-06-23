// Variable Delcarations

var timerEl = document.getElementById("timer");
var secondsLeftEl = document.getElementById("secondsLeft");
var timeEndsEl = document.getElementById("timeEnds");

var startEl = document.getElementById("start");
var startQuizBtn = document.getElementById("start-quiz-button");

var questionDiv = document.getElementById("questionDiv");
var questionEl = document.getElementById("questionTitle");
var selectionA = document.getElementById("btn0");
var selectionB = document.getElementById("btn1");
1;
var selectionC = document.getElementById("btn2");
var selectionD = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");

var summaryEl = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var enterYourInitialEl = document.getElementById("enterYourInitial");

var highScoreEl = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");

var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn");
var showHighScore = document.getElementById("showHighScore");
var HighScoreList = document.getElementById("HighScoreList");

var correctScore = 0;
var questionIndex = 0;

// Question Set
const questions = [
  {
    question: "What is the variable type in this declaration let number = '10'",
    choices: ["a. Number", "b. Boolean", "c. Undefined", "d. String"],
    answer: "d. String",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: [
      "a. JavaScript",
      "b. terminal/bash",
      "c. console.log",
      "d. for loops",
    ],
    answer: "c. console.log",
  },
  {
    question: "What does DOM stand for?",
    choices: [
      "a. Display Object Management",
      "b. Document Object Model",
      "c. Digital Ordinance Model",
      "d. Desktop Oriented Mode",
    ],
    answer: "b. Document Object Model",
  },
  {
    question: "How can we convert a number vriable to a string variable?",
    choices: [
      "a. var num = 10",
      "b. var num = true",
      "c. var num = '10'",
      "d. var num = false",
    ],
    answer: "c. var num = '10'",
  },
  {
    question: "What HTML attirbute refers to an external JavaScript File",
    choices: ["a. src", "b. href", "c. class", "d. index"],
    answer: "b. href",
  },
  {
    question: "How do you call a function named myFunction?",
    choices: [
      "a. call myFunction()",
      "b. call function myFunction()",
      "c. myFunction()",
      "d. call myFunction",
    ],
    answer: "c. myFunctions()",
  },
  {
    question:
      "To see if two variables are equal in an if / else statement you would use ____.",
    choices: ["a. =", "b. ==", "c. 'equals'", "d. !="],
    answer: "b. ==",
  },
  {
    question: "The first index of an array is ____.",
    choices: ["a. 0", "b. 1", "c. 8", "d. any"],
    answer: "a. 0",
  },
  {
    question: "When is localStorage data cleared?",
    choices: [
      "a. On reload of the browser",
      "b. On browser close",
      "c. No expiration time",
      "d. On computer restart",
    ],
    answer: "c. No expiration time",
  },
  {
    question: "How to write an IF statement in JavaScript?",
    choices: [
      "a. if i == 5 then",
      "b. if i = 5 then",
      "c. if(i == 5)",
      "d. if i = 5",
    ],
    answer: "c. if(i == 5)",
  },
  {
    question: "What is used in general to style a HTML page?",
    choices: ["a. CSS", "b. JavaScript", "c. JS query", "d. Boot Strap"],
    answer: "a. CSS",
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    choices: ["a. onclick", "b. onchange", "c. onmouseover", "d. onmouseclick"],
    answer: "a. onclick",
  },
];

// Start the Timer with the click of start button. This function will set the toatal seconds to 100.
var totalTime = 100;
function quizStart() {
  questionIndex = 0;
  totalTime = 100;
  secondsLeftEl.textContent = totalTime;
  enterYourInitialEl.textContent = "";

  startEl.style.display = "none";
  questionDiv.style.display = "block";
  timerEl.style.display = "block";
  timeEndsEl.style.display = "none";

  var startTimer = setInterval(function () {
    totalTime--;
    secondsLeftEl.textContent = totalTime;
    if (totalTime <= 0) {
      clearInterval(startTimer);
      if (questionIndex < questions.length - 1) {
        quizOver();
      }
    }
  }, 1000);

  showQuiz();
}

function showQuiz() {
  nextQuestion();
}

function nextQuestion() {
  questionEl.textContent = questions[questionIndex].question;
  selectionA.textContent = questions[questionIndex].choices[0];
  selectionB.textContent = questions[questionIndex].choices[1];
  selectionC.textContent = questions[questionIndex].choices[2];
  selectionD.textContent = questions[questionIndex].choices[3];
}

//determin wrong or right anser
function ansCheck(answer) {
  var lineBreak = document.getElementById("lineBreak");
  lineBreak.style.display = "block";
  answerCheck.style.display = "block";

  if (
    questions[questionIndex].answer === questions[questionIndex].choices[answer]
  ) {
    // add 1 score to final score if the answer is cocrrect
    correctScore++;

    answerCheck.textContent = "Right Answer!";
  } else {
    // deduct 10 second from timer if answer is wrong.
    totalTime -= 10;
    secondsLeftEl.textContent = totalTime;
    answerCheck.textContent =
      "Incorrec! The correct answer is: " + questions[questionIndex].answer;
  }

  questionIndex++;
  //do the same fo the rest of the answer
  if (questionIndex < questions.length) {
    nextQuestion();
  } else {
    // finish the quiz if there is no more answer.
    quizOver();
  }
}

function choiceA() {
  ansCheck(0);
}

function choiceB() {
  ansCheck(1);
}

function choiceC() {
  ansCheck(2);
}

function choiceD() {
  ansCheck(3);
}

// when all questions are answered or timer reaches 0, game over
function quizOver() {
  summaryEl.style.display = "block";
  questionDiv.style.display = "none";
  startEl.style.display = "none";
  timerEl.style.display = "none";
  timeEndsEl.style.display = "block";

  // show final score
  finalScore.textContent = correctScore;
}

// enter initial and store highscore in local storage
function storeHighScores(event) {
  event.preventDefault();

  if (enterYourInitialEl.value === "") {
    alert("Please enter your initials!");
    return;
  }

  startEl.style.display = "none";
  timerEl.style.display = "none";
  timeEndsEl.style.display = "none";
  summaryEl.style.display = "none";
  highScoreEl.style.display = "block";

  // store scores into local storage
  var savedHighScores = localStorage.getItem("high scores");
  var scoresArray;

  if (savedHighScores === null) {
    scoresArray = [];
  } else {
    scoresArray = JSON.parse(savedHighScores);
  }

  var userScore = {
    initials: enterYourInitialEl.value,
    score: finalScore.textContent,
  };

  console.log(userScore);
  scoresArray.push(userScore);

  // stringify to store locally
  var scoresArrayString = JSON.stringify(scoresArray);
  window.localStorage.setItem("high scores", scoresArrayString);

  // function call to show current highscores
  showHighScores();
}

// function to show high scores
var i = 0;
function showHighScores() {
  startEl.style.display = "none";
  timerEl.style.display = "none";
  questionDiv.style.display = "none";
  timeEndsEl.style.display = "none";
  summaryEl.style.display = "none";
  highScoreEl.style.display = "block";

  var savedHighScores = localStorage.getItem("high scores");

  if (savedHighScores === null) {
    return;
  }
  console.log(savedHighScores);

  var storedHighScores = JSON.parse(savedHighScores);

  for (; i < storedHighScores.length; i++) {
    var eachNewHighScore = document.createElement("p");
    eachNewHighScore.innerHTML =
      storedHighScores[i].initials + ": " + storedHighScores[i].score;
    HighScoreList.appendChild(eachNewHighScore);
  }
}

/**
EVENT LISTENERS
 */

startQuizBtn.addEventListener("click", quizStart);
selectionA.addEventListener("click", choiceA);
selectionB.addEventListener("click", choiceB);
selectionC.addEventListener("click", choiceC);
selectionD.addEventListener("click", choiceD);

submitInitialBtn.addEventListener("click", function (event) {
  storeHighScores(event);
});

showHighScore.addEventListener("click", function (event) {
  showHighScores(event);
});

goBackBtn.addEventListener("click", function () {
  startEl.style.display = "block";
  highScoreEl.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function () {
  window.localStorage.removeItem("high scores");
  HighScoreList.innerHTML = "High Scores Is Cleared!";
  HighScoreList.setAttribute("style", "font-family: 'Aerial', sans-serif;");
});
