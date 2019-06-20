

let correct;
let incorrect;
let unanswered;
let timer;
let timerRunning;
let timerInterval;

const trivia = {
    // questions asked
    questions: {
        q1: "In Ocarina of Time, which is NOT one of the three spells of the Goddesses that can be acquired?",
        q2: "Who is the main villain in Skyward Sword'?",
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
    $("#startButton").click(function () {
        startTimer();
        $("#gameArea").html("<h4 class='text-center mt-3 font-weight-bolder'>" + trivia.questions.q1 + "</h4>")
        for (let i = 0; i < 4; i++) {
            $("#gameArea").append("<button onclick='answerCheck(event)' class='answerButton col-8 mx-auto m-2'>" + trivia.selections.q1[i] + "</button>")
        }
    });
};

// reset the game to default state
function resetGame() {
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    timer = 10;
    timerRunning = false;
};

//start timer
function startTimer() {
    timerRunning = true;
    $("#timeRemainingAmount").text(timer);
    if (timerRunning === true) {
        clearInterval(timerInterval);
        timerInterval = setInterval(decrementTimer, 1000);
    };
};

// decrement timer
function decrementTimer() {
    timer--;
    $("#timeRemainingAmount").text(timer);
    if (timer === 0) {
        console.log(unanswered);
        unanswered++;
        console.log(unanswered);
        stopTimer();
        nextQuestion();
    }
};

// stop timer
function stopTimer() {
    clearInterval(timerInterval);
};

// cycle to next question
function nextQuestion() {

};

// check if answer if correct
function answerCheck(event) {
    if (event.target.innerText === trivia.answers.q1) {
        correct++;
        nextQuestion();
    } else {
        incorrect++;
        nextQuestion();
    };
};

// run the code
$(document).ready(function () {

    startGame();

});