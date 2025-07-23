const difficultyEl = document.getElementById('difficulty');
const textEl = document.getElementById('text');
const numEl = document.getElementById('num');
const buttonEl = document.getElementById('btn');
const conEl = document.getElementById('con');
const newEl = document.getElementById('new-game');


let difficulty;

let randomNumber;
let attempts = 0;
let maxAttempts;
let range;

// on change difficulty
difficultyEl.addEventListener('change', function() {

  attempts = 0;
  setDifficulty();
  click();
    
})


// set difficulty level
function setDifficulty() {
  difficulty = difficultyEl.selectedOptions[0].innerText.toLowerCase();

  switch (difficulty) {
    case 'easy':
      randomNumber = Math.ceil(Math.random() * 10);
      maxAttempts = 5;
      range = 10;
    break;

    case 'medium':
      randomNumber = Math.ceil(Math.random() * 100);
      maxAttempts = 7;
      range = 100;
    break;
    case 'hard':
      randomNumber = Math.ceil(Math.random() * 1000);
      maxAttempts = 10;
      range = 1000;
    break;
  
    default:
      console.log(`Invalid difficulty level`);
    break;
  }

  textEl.innerHTML = `Guess a number between 1 and ${range} (inclusive). You have ${maxAttempts - attempts} attempts left`;
}
setDifficulty();

buttonEl.addEventListener('click', function() {

  if(numEl.value !== '') {
    click();
  } else {
    conEl.innerHTML = 'Please enter a number';
  }

});


function click() {

  if(maxAttempts > attempts) {

    console.log(attempts, maxAttempts, randomNumber);
    console.log(maxAttempts - attempts);

    const getInput = parseInt(numEl.value);

    if(randomNumber === getInput) {
      conEl.innerHTML = `"${getInput}" Congratulation! You guess the number in ${attempts} attempts`;
      displayNone();
  
    } else if(randomNumber > getInput) {
      conEl.innerHTML = `"${getInput}" Your number is too low. Please try again`;
    } else if(randomNumber < getInput) {
      conEl.innerHTML = `"${getInput}" Your number is too high. Please try again`;
    }
       
  } else if(attempts === maxAttempts) {

    console.log(attempts, maxAttempts);
    conEl.innerHTML = `Sorry, You are out of attempts. The number is ${randomNumber}. Please try new game.`;

    displayNone();
  }
  
  attempts++;

  textEl.innerHTML = `Guess a number between 1 and ${range} (inclusive). You have ${maxAttempts - attempts + 1} attempts left`;

  numEl.value = '';

}

click();

newEl.addEventListener("click", () => {
  newGame();
  attempts = 0;
  
  textEl.innerHTML = `Guess a number between 1 and ${range} (inclusive). You have ${maxAttempts - attempts} attempts left`;
  
  setDifficulty();
  click();
});

function displayNone() {

  numEl.style.display = 'none';
  buttonEl.style.display = 'none';
  difficultyEl.style.display = 'none';
  textEl.style.display = 'none';

}

function newGame() {
  numEl.style.display = 'inline-block';
  buttonEl.style.display = 'inline-block';
  difficultyEl.style.display = 'block';
  textEl.style.display = 'block';
  conEl.innerHTML = "";
  difficultyEl.options.selectedIndex = 0;
}