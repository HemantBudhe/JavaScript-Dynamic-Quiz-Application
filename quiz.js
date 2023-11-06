const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("result");
const nextButton = document.getElementById("next-btn");

let currentQuestion = 0;
let score = 0;
let quizData; 

fetch("abc.json")
    .then(response => response.json())
    .then(data => {
        quizData = data;
        loadQuestion();
    });


    

function loadQuestion() {
    if (currentQuestion < quizData.length) {
        const currentQuizData = quizData[currentQuestion];
        questionElement.textContent = currentQuizData.question;
        optionsElement.innerHTML = "";

        currentQuizData.options.forEach((option, index) => {
            const optionElement = document.createElement("input");
            optionElement.type = "radio";
            optionElement.name = "answer";
            optionElement.value = option;
            optionElement.id = "option" + (index + 1);
            const labelElement = document.createElement("label");
            labelElement.htmlFor = "option" + (index + 1);
            labelElement.textContent = option;
            optionsElement.appendChild(optionElement);
            optionsElement.appendChild(labelElement);
        });

        nextButton.addEventListener("click", checkAnswer);
    } else {
        finishQuiz();
    }
}

function checkAnswer() {
    const selectedOption = document.querySelector("input[name='answer']:checked");
    if (selectedOption) {
        if (selectedOption.value === quizData[currentQuestion].answer) {
            score++;
        }
        currentQuestion++;
        selectedOption.checked = false;
        loadQuestion();
    }
}
let startTime = 0;
let endTime = 0;   

function startQuiz() {
    startTime = new Date().getTime(); 
    nextButton.style.display = "none";
    renderQuestion(currentQuestion);
}

function finishQuiz() {
    endTime = new Date().getTime(); 
    const timeTaken = (endTime - startTime) / 1000;

    questionElement.textContent = "Quiz completed!";
    optionsElement.innerHTML = "";
    const percentage = (score / quizData.length) * 100;
    resultElement.textContent = "Your Score: " + score + " out of " + quizData.length;
    resultElement.textContent += "\nTime taken: " + timeTaken + " seconds";

    let message = "You did okay.";
    if (percentage >= 40) {
        message = "Passed";
    }
    if (percentage >= 60) {
        message = "Good";
    }
    if (percentage >= 75) {
        message = "Excellent";
    }

    resultElement.textContent += "\n" + message;
}
