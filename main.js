//Questions stored as an array of objects
var questions = [
    {
        question: "If you can hold your breath for ten seconds without discomfort, you don’t have COVID-19.",
        answer: "2",
        reason: "Myth. According to Gavin Macgregor, an infectious disease expert, most young patients with coronavirus will be able to hold their breaths for much longer than 10 seconds. At the same time, many elderly people who don’t have the virus might not be able to do it.",
        answered: false, 
        result: null
    }, 
    {
        question: "Eat a lot of garlic to avoid getting the virus.",
        answer: "2",
        reason: "Myth. Although garlic has some antimicrobial properties, which slows the spread of microorganisms, there isn't any proof that garlic has helped prevent the spread of coronavirus according to WHO.",
        answered: false, 
        result: null
    },
    {
        question: "COVID-19 affects only the elderly people.",
        answer: "2",
        reason: "Myth. People who are elderly or have compromised immune systems are at a greater risk for severe illness if they contract the virus, according to WHO. But anyone of any age can contract and spread the virus to others, which is why it's important for everyone to take precautions.",
        answered: false, 
        result: null
    },
    {
        question: "Using antibiotics will cure COVID-19.",
        answer: "2",
        reason: "Myth. Antibiotics can help you to fight bacteria. Coronavirus, being a virus will remain unaffected. But doctors prescribe antibiotics, so that the infected person doesn't catch bacterial infections.",
        answered: false, 
        result: null
    },
    {
        question: "Spraying alcohol or chlorine all over your body kills the coronavirus.",
        answer: "2",
        reason: "Myth. According to WHO, spraying alcohol or chlorine all over your body will not kill the virus that has already entered your system and instead may harm the person.",
        answered: false, 
        result: null
    },
    {
        question: "Even if you don't have the symptoms, you can still be contagious.",
        answer: "1",
        reason: "Fact. “It’s possible that 70% to 80% of people may have mild to no symptoms, but they should still be very cautious because they may still be infectious,” says Peter Gulick, infectious disease expert at Michigan State University.",
        answered: false, 
        result: null
    },
    {
        question: "You can't catch COVID-19 from your pet.",
        answer: "1",
        reason: "Fact. There is no such evidence at present that companion animals/pets such as dogs or cats can be infected with the new coronavirus. However, it is a good practice to wash your hands with soap and water after contact with pets.",
        answered: false, 
        result: null
    },
    {
        question: "The first case of novel coronavirus was identified in Wuhan, China.",
        answer: "1",
        reason: "Fact. COVID-19 was first identified in December 2019 in Wuhan, Hubei, China.",
        answered: false, 
        result: null
    },
    {
        question: "COVID-19 spreads through respiratory droplets.",
        answer: "1",
        reason: "Fact. COVID‑19 spreads primarily when people are in close contact and one person inhales small droplets produced by an infected person (symptomatic or not) coughing, sneezing, talking, or singing.",
        answered: false, 
        result: null
    },
    {
        question: "Qatar leads the world in the most number of COVID-19 cases per million population.",
        answer: "1",
        reason: "Fact. Although USA leads the world in the most number of cases, Qatar yops this list with more than 40,000 cases per million population.",
        answered: false, 
        result: null
    }
];

const username = document.getElementById('name');
const sideNav = document.getElementById('nav-questions');

var qn = document.getElementById('question');
var displayResults = document.getElementById('results-body');
var displayScore = document.getElementById('display-scores');
var displayHighScorer = document.getElementById('display-highscorer');
var displayHighScore = document.getElementById('display-highscore');
var displayTimer = document.getElementById('display-timer');
var displayName = document.getElementById('display-name');
var displayImage = document.getElementById('image');
var displayReason = document.getElementById('reason');
var resImage = document.getElementById('result-image');

const startbtn = document.getElementById('start-btn');
const nextbtn = document.getElementById('next-btn');
const previousbtn = document.getElementById('previous-btn');
const restartbtn = document.getElementById('restart-btn');
const reviewbtn = document.getElementById('review-btn');
const factbtn = document.getElementById('fact');
const mythbtn = document.getElementById('myth');

const info = document.getElementById('info');
const quizBody = document.getElementById('quiz-body');
const highQuizScores = JSON.parse(localStorage.getItem('highQuizScores')) || [];

var count = 0;
var score = 0;
var flag = 0;
var time = 60;
var correctCount = 0;

//Function to control previous and next buttons
function navicheck() {
    if(count == questions.length - 1) {
        nextbtn.classList.add('hide');
    } else {
        nextbtn.classList.remove('hide');
    }

    if(count == 0) {
        previousbtn.classList.add('hide');
    } else {
        previousbtn.classList.remove('hide');
    }
}

//Function to shuffle the questions using Fisher-Yates algorithm
function shuffleQuestions (array) {
    for(let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        let temp = array[j];
        array[j] = array[i];
        array[i] = temp;
    }
    return array;
}

//Function to check for the answers
function checkAnswer() {
    resetAnswer();
    if(questions[count].answered == true) {
        
        displayReason.classList.remove('hide');
        displayReason.innerText = questions[count].reason;
        
        if(questions[count].answer == "1") {
            factbtn.classList.add('btn-success');
            mythbtn.classList.add('btn-danger');
        } else {
            factbtn.classList.add('btn-danger');
            mythbtn.classList.add('btn-success');
        }
        
        if(questions[count].result == true) {
            resImage.setAttribute('src', './Images/correct.png');
            quizBody.style.boxShadow = "2px 2px 10px 10px darkgreen";
        } else {
            resImage.setAttribute('src', './Images/wrong.png');
            quizBody.style.boxShadow = "2px 2px 10px 10px red";
        }
    }
}

//Function to reset answers for unanswered questions
function resetAnswer() {
    factbtn.classList.remove('btn-success');
    mythbtn.classList.remove('btn-danger');

    mythbtn.classList.remove('btn-success');
    factbtn.classList.remove('btn-danger');

    displayImage.classList.remove('hide');
    resImage.setAttribute('src', './Images/neutral.png');

    quizBody.style.boxShadow = "2px 2px 10px 10px skyblue";
    displayReason.classList.add('hide');
}

//Function to display the side navbar
function showSideNav() {
    for(let i = 0; i < questions.length; i++) {
        const navItem = document.createElement('li');
        navItem.classList.add('nav-item');
        navItem.setAttribute('id', i+1);
        navItem.style.backgroundColor = 'black';
        navItem.innerText = i + 1;
        sideNav.appendChild(navItem);
    }
}

//Function to handle navigation using side navbar
function handleSideNav() {
    if(questions[count].result == true) { 
        document.getElementById(count+1).style.backgroundColor = 'green';
    }
    else if(questions[count].result == false) {
        document.getElementById(count+1).style.backgroundColor = 'red';
    }
}

//Function to display the questions
function showQuestion() {
    for(let i = 0; i < questions.length; i++) {
        document.getElementById(`${i+1}`).addEventListener('click', function() {
            count = i;
            checkAnswer();
            if(questions[count].answered == false) {
                resetAnswer();
            }
            navicheck();
            qn.innerText = `${count+1}) ` + questions[count].question;
        });
    }
}

//Function to store the scores using localstorage
function storeScores() {
    const userScores = {
        name: username.value,
        score: score,
        date: new Date()
    };
    highQuizScores.push(userScores);
    //Sorting the high scores array based on the scores in descending order
    highQuizScores.sort(function(a,b) {
       return b.score - a.score;
    });
    localStorage.setItem('highQuizScores', JSON.stringify(highQuizScores));
    displayHighScorer.innerHTML = `Highest scorer: <span>` + highQuizScores[0].name + `</span>`;
    displayHighScore.innerHTML = `Highest score: <span>` + highQuizScores[0].score + `</span>`;
}

//Function to monitor the timer
function countDownTimer() {
    var timer = setInterval(function() {
        time--;
        displayTimer.innerHTML = "Time left: " + `<span>` + time + `</span>` + " seconds";
        if(time == 0 || flag == 10) {
            clearInterval(timer);
            quizBody.classList.add('hide');
            restartbtn.classList.remove('hide');
            reviewbtn.classList.remove('hide');
            displayTimer.innerHTML = "Quiz completed in " + `<span>` + (60-time) +  `</span>` + " seconds";
            storeScores();
            for(let count = 0; count < questions.length; count++) {
                if(questions[count].answered == false) {
                    questions[count].answered = true;
                    questions[count].result = false;
                    checkAnswer();
                }
            }
        }
    }, 1000);
}

//Event listener on clicking start button
startbtn.addEventListener('click', function(){
    if(username.value != "") {
        shuffleQuestions(questions);
        qn.innerText = `${count+1}) ` + questions[count].question;
        info.classList.add('hide');
        quizBody.classList.remove('hide');
        displayResults.classList.remove('hide');
        quizBody.style.boxShadow = "2px 2px 10px 10px skyblue";
        displayResults.style.boxShadow = "2px 2px 10px 2px skyblue";
        displayName.innerHTML = `Name: <span>` + username.value + `</span>`;
        displayScore.innerHTML = 'Score: ' + `<span>` + score + `</span> <br> Questions remaining: <span>` + (10-flag) + `</span>`;
        displayTimer.innerHTML = "Time left: " + `<span> 60 </span>` + " seconds";
        document.getElementById('heading').style.marginLeft = "150px";
        navicheck();
        showSideNav();
        showQuestion();
        handleSideNav();
        countDownTimer();
    }
    else {
        window.alert("Please enter your name!");
    } 
});

//Event listener on clicking next button
nextbtn.addEventListener('click', function() {
    count++;
    checkAnswer();
    if(questions[count].answered == false) {
        resetAnswer();
    }
    navicheck();
    qn.innerText = `${count+1}) ` + questions[count].question;
});

//Event listener on clicking previous button
previousbtn.addEventListener('click', function() {
    count--;
    checkAnswer();
    if(questions[count].answered == false) {
        resetAnswer();
    }
    navicheck();
    qn.innerText = `${count+1}) ` + questions[count].question;
});

//Event listener on clicking fact button
factbtn.addEventListener('click', function() {
    if(questions[count].answered == false) {
        flag++;
        if(questions[count].answer == "1") {
            score = score + 3*time;
            questions[count].result = true;
            correctCount++;
        }
        else {
            questions[count].result = false;
        }
    }
    handleSideNav();
    if(flag == 10) {
        score += (20*correctCount);
    }
    displayScore.innerHTML = 'Score: <span>' + score + `</span> <br> Questions remaining: <span>` + (10-flag) + `</span>`;
    questions[count].answered = true;
    checkAnswer();
    if(questions[count].answered == false) {
        resetAnswer();
    }
});

//Event listener on clicking myth button
mythbtn.addEventListener('click', function() {
    if(questions[count].answered == false) {
        flag++;
        if(questions[count].answer == "2") {
            score = score + 3*time;
            questions[count].result = true;
            correctCount++;
        }
        else {
            questions[count].result = false;
        }
    }
    handleSideNav();
    if(flag == 10) {
        score += (20*correctCount);
    }
    displayScore.innerHTML = 'Score: <span>' + score + `</span> <br> Questions remaining: <span>` + (10-flag) + `</span>`;
    questions[count].answered = true;
    checkAnswer();
    if(questions[count].answered == false) {
        resetAnswer();
    }
});

//Event listener on clicking GO HOME button
restartbtn.addEventListener('click', function() {
    window.location.reload();
});

//Event listener on clicking review answers button
let show = true;
reviewbtn.addEventListener('click', function() {
    if(show) {
        quizBody.classList.remove('hide');
        show = false;
        reviewbtn.innerText = "HIDE ANSWERS";
    }
    else {
        quizBody.classList.add('hide');
        show = true;
        reviewbtn.innerText = "REVIEW ANSWERS";
    }
});