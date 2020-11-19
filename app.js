/* eslint-disable quotes */
/* eslint-disable no-undef */
'use strict';

const store = {
  questions: [
      {
        question: 'In an episode where Jessie gets hooked on caffeine pills to study, she also starts a girl group with Kelly and Jessie. What is the name of the girl group?',
        answers: [
            'Jessie & the Rippers',
            'The Cupcakes',
            'A la Mode',
            'Hot Sundae'
        ],
        correctAnswer: 'Hot Sundae'
  },
  {
    question: 'What kind of pet named Artie does Slater leave in the care of his friends, only to return from his trip to find said pet dead?',
    answers: [
      'Lizard',
      'Tarantula',
      'Chameleon',
      'Snake'
    ],
    correctAnswer: 'Chameleon'
  },
  {
    question: 'What King of Queens TV star once played Zack Morris\' love interest?',
    answers: [
      'Leah Remini',
      'Nicole Sullivan',
      'Patton Oswalt',
      'Kevin James'
    ],
    correctAnswer: 'Leah Remini'
  },
  {
    question: 'What fake college offered Slater a brand new car to play on their football team?',
    answers: [
      'Stanislavski',
      'Stanburg',
      'Stansville',
      'Stansbury'
    ],
    correctAnswer: 'Stansbury'
  },
  {
    question: 'Saved by the Bell was a reboot of another show called \'Good Morning, Miss Bliss\' on another network. What network aired GM,MB?',
    answers: [
      'Nickelodeon',
      'BBC',
      'AMC',
      'Disney Channel'
    ],
    correctAnswer: 'Disney Channel'
  }
  ],
  feedbackGiven: true,
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  currentAnswer: ''
};

function generateMainPage() {
  return `
      <div class="mainPage">
        <h2>Click on and take the quiz to test your knowledge on TV rerun's favorite gang of kids.</h2>
        <img src="img/download.jpg" alt="Group Photo">
        <p>Don't worry, Belding won't see these test results.</p>
        <button type='submit' id="startquiz">Start Quiz</button>
        </form>
      </div>`;
}

function generateQuestionPage() {
  const question = store.questions[store.questionNumber];
  const answers = question.answers.map(function(answer,index){return `
  <input type="radio" id="answer${index}" name="answer" value="${answer}" required>
        <label for="answer${index}">${answer}</label></br>`;
  });

  return `
  <div class="mainPage">
    <form id="question">
      <h2>${question.question}</h2>
      ${answers.join('')}<br>
      <button type="form">Submit Answer</button>
    </form>

      <div class="quiz-info">
        <p>Question ${store.questionNumber+1} out of 5</p>
        <p>${store.score}/${store.questionNumber} Correctly Answered</p>
      </div>
  `;
  
}

function generateFeedbackPage(){
  let results = '';
  if(store.currentAnswer===store.questions[store.questionNumber].correctAnswer){
    results = `<img src="img/cheer.gif" alt="Cheering for your right answer"><br>You really know your stuff!`;
  } else{
    results = `<img src="img/tear.gif" alt="Now you're crying"><br>Maybe it's time to hit the books.`;
  }
  return`
  <div class="mainPage">
      <h2>Question ${store.questionNumber+1}</h2>
      <p>The correct answer was: ${store.questions[store.questionNumber].correctAnswer}.</p>
      ${results}
      <p>Answered ${store.score}/${store.questionNumber+1} questions correctly so far.</p>
      <button type='submit' id="continue">Continue</button>
      </form>
    </div>
    `;
}

function generateFinalPage(){
  let results = '';
  if (store.currentAnswer === store.questions[store.questionNumber].correctAnswer) {
    results = `<img src="img/shake.gif" alt="You're done now!"><br>You really know your stuff!`;
  } else {
    results = `<img src="img/nope.gif" alt="Close but no cigar"><br>Maybe it's time to hit the books.`;
  }
  return`
  <div class="mainPage">
      <h2>Question ${store.questionNumber+1}</h2>
      <p>The correct answer was: ${store.questions[store.questionNumber].correctAnswer}.</p>
      ${results}
      <p>Thanks for playing!<p>
      <p>You got ${store.score}/${store.questionNumber+1} questions right.</p>
      <button type='submit' id="home">Home</button>
      </form>
      <button type='submit' id="try-again">Try Again</button>
      </form>
    </div>
    `;
}

function handleStartButton(){
  $('main').on('click','#startquiz', function(e){
    store.quizStarted = true;
    render();
  });
}

function handleTryAgainButton(){
  $('main').on('click','#try-again', function(e){
    store.currentAnswer = '';
    store.score = 0;
    store.questionNumber = 0;
    store.feedbackGiven = true;
    render();
  });
}

function handleHomeButton(){
  $('main').on('click','#home', function(e){
    store.currentAnswer = '';
    store.score = 0;
    store.questionNumber = 0;
    store.feedbackGiven = true;
    store.quizStarted = false;
    render();
  });
}

function handleSubmitButton(){
  $('main').on('submit','#question', function(e){
    e.preventDefault();
    store.currentAnswer = $(`input[name='answer']:checked`).val();
    store.feedbackGiven = false;
    if(store.currentAnswer===store.questions[store.questionNumber].correctAnswer){
      store.score++;
    }
    console.log(store.currentAnswer);
    render();
  });
}

function handleContinueButton(){
  $('main').on('click','#continue', function(e){
    store.feedbackGiven = true;
    store.currentAnswer = '';
    store.questionNumber++;
    render();
  });
}

function render() {
  let html = '';
  if (store.quizStarted === false) {
    html = generateMainPage();
  } else if (store.feedbackGiven === true) {
    html = generateQuestionPage();
  } else if (store.feedbackGiven === false && store.questionNumber === store.questions.length-1){
    html = generateFinalPage();
  } else{
    html = generateFeedbackPage();
  }
  $('main').html(html);
}

function main() {
  render();
  handleStartButton();
  handleSubmitButton();
  handleContinueButton();
  handleTryAgainButton();
  handleHomeButton();
}
$(main);
