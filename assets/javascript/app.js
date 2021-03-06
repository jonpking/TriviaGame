
let correct;
let incorrect;
let unanswered;
let timer;
let timerRunning;
let timerInterval;
let usedQuestionsArray;
const trivia = {
    // questions asked
    questions: {
        q1: "In Ocarina of Time, which is NOT one of the three spells of the Goddesses that can be acquired?",
        q2: "Who is the main villain in Skyward Sword?",
        q3: "After whom is the character Zelda named?",
        q4: "Which of the following is NOT a part of the Triforce?",
        q5: "In A Link to the Past, which item, other than the Master Sword, can be used to reflect Agahnim's spells?",
        q6: "What is the name of Zelda's alter ego in Ocarina of time?",
        q7: "What is the name of Link's evil doppelganger?",
        q8: "In Twilight Princess, into what animal does link transform?",
        q9: "What is the value of a red rupee?",
        q10: "In Wind Waker, what is the real identity of the King of Red Lions?",
    },
    // correct answer to each question
    answers: {
        q1: "Hylia's Strength",
        q2: "Ghirahim",
        q3: "Zelda Fitzgerald",
        q4: "Honor",
        q5: "Bug-Catching Net",
        q6: "Sheik",
        q7: "Dark Link",
        q8: "Wolf",
        q9: "20",
        q10: "King Daphnes",
    },
    // answers that can be selected for each question
    selections: {
        q1: ["Din's Fire", "Nayru's Love", "Farore's Wind", "Hylia's Strength"],
        q2: ["Ganon", "Ghirahim", "Vaati", "Zant"],
        q3: ["Zelda Fitzgerald", "Zelda Williams", "Zelda Rubinstein", "Zelda Spellman"],
        q4: ["Honor", "Wisdom", "Courage", "Power"],
        q5: ["Hookshot", "Boomerang", "Hammer", "Bug-Catching Net"],
        q6: ["Ruto", "Impa", "Sheik", "Tetra"],
        q7: ["Evil Link", "Knil", "He does not have a name", "Dark Link"],
        q8: ["Monkey", "Wolf", "Cat", "Hawk"],
        q9: ["100", "5", "20", "1"],
        q10: ["King Daphnes", "Princess Zelda", "Goddess Hylia", "Sage Sahasrahla"],
    }
};

// hide start button and display first question
function startGame() {
    resetGame();
    $("#gameArea").html("<button onclick='startTimer(); nextQuestion();' class='col-4 mx-auto bg-dark text-light mt-4 mb-4 p-5'>BEGIN QUEST</button>");
};

// display questions and selections from trivia object
function displayQuestion(questionID) {
    $("#gameArea").html("<h4 class='text-center mt-3 font-weight-bolder'>" + trivia.questions[questionID] + "</h4>");
    for (let i = 0; i < 4; i++) {
        $("#gameArea").append("<button onclick='answerCheck(event)' data-question-id='" + questionID + "' class='answerButton col-8 mx-auto m-2'>" + trivia.selections[questionID][i] + "</button>")
    }
};

// reset the game to default state
function resetGame() {
    usedQuestionsArray = [];
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    resetTimer();
    timerRunning = false;
};

//start timer
function startTimer() {
    timerRunning = true;
    $("#timeRemainingAmount").text(timer);
    timerInterval = setInterval(decrementTimer, 1000);
};

// decrement timer
function decrementTimer() {
    if (timerRunning === true) {
        $("#timeRemainingAmount").text(timer);
        console.log(timer)
        timer--;


    }
    if (timer === 0) {
        unanswered++;
        displayUnanswered();
        setTimeout(checkIfLastQuestion,2000);
    }
};

// stop timer
function stopTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    timer = "-";
    $("#timeRemainingAmount").text(timer);
};

// reset timer
function resetTimer() {
    timer = 10;
};

// check if we've itterated over all questions and display results if we have, if not call nextQuestion function
function checkIfLastQuestion() {
    if (usedQuestionsArray.length === Object.keys(trivia.questions).length) {
        displayResults();
        stopTimer();
    }
    else {
        startTimer();
        nextQuestion();
    };
};

function generateRandomQuestionID() {
    // Math.floor(Math.random() * Math.floor(max));
    return "q" + Math.floor(Math.random() * Object.keys(trivia.questions).length + 1);
};

function nextQuestion() {
    // get a random number between 1-10 and generate property name from the random number
    let questionID = generateRandomQuestionID();
    // as long as questionID is in the usedQuestionArray, generate a new questionID
    while (usedQuestionsArray.includes(questionID)) {
        questionID = generateRandomQuestionID();
    };
    // if questionID is not in usedQuestionsArray, add it
    usedQuestionsArray.push(questionID);
    // display the question and answers for that property
    displayQuestion(questionID);
    // reset the timer
    resetTimer();
};

// check if answer if correct
function answerCheck(event) {
    if (event.target.innerText === trivia.answers[event.target.dataset.questionId]) {
        correct++;
        displayCorrect();
        setTimeout(checkIfLastQuestion,2000);
    } else {
        incorrect++;
        displayIncorrect()
        setTimeout(checkIfLastQuestion,2000);
    };
};

// displays feedback screen for question being answered correctly
function displayCorrect() {
    stopTimer();
    $("#gameArea").html("<h1 class='text-center mt-3 font-weight-bolder'>WELL DONE!</h1>");
};

// displays feedback screen for question being answered incorrectly
function displayIncorrect() {
    stopTimer();
    $("#gameArea").html("<h1 class='text-center mt-3 font-weight-bolder'>BETTER LUCK NEXT TIME!</h1>");
};

// displays feedback screen for question not being answered within time limit
function displayUnanswered() {
    stopTimer();
    $("#gameArea").html("<h1 class='text-center mt-3 font-weight-bolder'>STILL THERE?</h1>");
};

// display results at end of quiz
function displayResults() {
    $("#gameArea").html("<h4 class='text-center mt-3 font-weight-bolder'>Your results are:</h4>");
    $("#gameArea").append("<br>");
    $("#gameArea").append("<h3 class='text-center'>Correct: " + correct + "</h3>");
    $("#gameArea").append("<br>");
    $("#gameArea").append("<h3 class='text-center'>Incorrect: " + incorrect + "</h3>");
    $("#gameArea").append("<br>");
    $("#gameArea").append("<h3 class='text-center'>Unanswered: " + unanswered + "</h3>");
    $("#gameArea").append("<br>");
    $("#gameArea").append("<button onclick='startGame()' class='text-center'>Start Over?</button>");
};

// run the code
$(document).ready(function () {

    startGame();

});