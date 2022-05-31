import wordList from './Words/wordList.js';

// Elements
const informationContainer = document.getElementById('information-container');
const letterOneOne = document.getElementById('letter-one-one');
const letterOneTwo = document.getElementById('letter-one-two');
const letterOneThree = document.getElementById('letter-one-three');
const letterOneFour = document.getElementById('letter-one-four');
const letterOneFive = document.getElementById('letter-one-five');

const letterTwoOne = document.getElementById('letter-two-one');
const letterTwoTwo = document.getElementById('letter-two-two');
const letterTwoThree = document.getElementById('letter-two-three');
const letterTwoFour = document.getElementById('letter-two-four');
const letterTwoFive = document.getElementById('letter-two-five');

const letterThreeOne = document.getElementById('letter-three-one');
const letterThreeTwo = document.getElementById('letter-three-two');
const letterThreeThree = document.getElementById('letter-three-three');
const letterThreeFour = document.getElementById('letter-three-four');
const letterThreeFive = document.getElementById('letter-three-five');

const letterFourOne = document.getElementById('letter-four-one');
const letterFourTwo = document.getElementById('letter-four-two');
const letterFourThree = document.getElementById('letter-four-three');
const letterFourFour = document.getElementById('letter-four-four');
const letterFourFive = document.getElementById('letter-four-five');

const letterFiveOne = document.getElementById('letter-five-one');
const letterFiveTwo = document.getElementById('letter-five-two');
const letterFiveThree = document.getElementById('letter-five-three');
const letterFiveFour = document.getElementById('letter-five-four');
const letterFiveFive = document.getElementById('letter-five-five');

const letterSixOne = document.getElementById('letter-six-one');
const letterSixTwo = document.getElementById('letter-six-two');
const letterSixThree = document.getElementById('letter-six-three');
const letterSixFour = document.getElementById('letter-six-four');
const letterSixFive = document.getElementById('letter-six-five');

// Element Arrays
const firstRowElements = [
  letterOneOne,
  letterOneTwo,
  letterOneThree,
  letterOneFour,
  letterOneFive,
];

const secondRowElements = [
  letterTwoOne,
  letterTwoTwo,
  letterTwoThree,
  letterTwoFour,
  letterTwoFive,
];

const thirdRowElements = [
  letterThreeOne,
  letterThreeTwo,
  letterThreeThree,
  letterThreeFour,
  letterThreeFive,
];

const fourthRowElements = [
  letterFourOne,
  letterFourTwo,
  letterFourThree,
  letterFourFour,
  letterFourFive,
];

const fifthRowElements = [
  letterFiveOne,
  letterFiveTwo,
  letterFiveThree,
  letterFiveFour,
  letterFiveFive,
];

const sixthRowElements = [
  letterSixOne,
  letterSixTwo,
  letterSixThree,
  letterSixFour,
  letterSixFive,
];

const rowElementsArray = [
  firstRowElements,
  secondRowElements,
  thirdRowElements,
  fourthRowElements,
  fifthRowElements,
  sixthRowElements,
];

// Words Array
const words = wordList;
const word = words[Math.floor(Math.random() * wordList.length)].toUpperCase();

let rowOneArray = [];
let rowTwoArray = [];
let rowThreeArray = [];
let rowFourArray = [];
let rowFiveArray = [];
let rowSixArray = [];

let rowArray = [
  rowOneArray,
  rowTwoArray,
  rowThreeArray,
  rowFourArray,
  rowFiveArray,
  rowSixArray,
];

// Active Row
let activeRow = 0;

// Change Active Row
function changeActiveRow() {
  if (activeRow < 5) {
    activeRow++;
  } else {
    gameLost();
  }
}

// Input Letters in a Row
function inputLetter(row, letter) {
  const selectedRow = rowArray[row];
  const selectedRowElements = rowElementsArray[row];

  if (selectedRow.length >= 5) {
    return;
  } else {
    selectedRow.push(letter.toUpperCase());
    for (let i = 0; i < selectedRow.length; i++) {
      selectedRowElements[i].innerText = selectedRow[i];
    }
  }
}

// Deletes Letter on Backscape
function deleteLetter(row) {
  const selectedRow = rowArray[row];
  const selectedRowElements = rowElementsArray[row];

  selectedRow.pop();
  for (let i = 0; i < 5; i++) {
    if (selectedRow[i]) {
      selectedRowElements[i].innerText = selectedRow[i];
    } else {
      selectedRowElements[i].innerText = '';
    }
  }
}

// Clears Row when input was invalid
function clearInput(row) {
  const selectedRow = rowArray[row];
  const selectedRowElements = rowElementsArray[row];
  selectedRow.splice(0);
  for (let i = 0; i < 5; i++) {
    selectedRowElements[i].innerText = '';
  }
}

// Checks the input for correct or wrong letters and validates word
function checkRowInput(row) {
  const wordArray = [...word];
  const selectedRow = rowArray[row];
  const selectedRowElements = rowElementsArray[row];
  let wordInput = selectedRow.join('');
  let wordCorrect = true;

  if (selectedRow.length < 5) {
    alert('Please enter 5 Words');
    wordCorrect = 'invalid';
    clearInput(row);
  } else if (!words.includes(wordInput.toLowerCase())) {
    alert('Please enter a valid word');
    wordCorrect = 'invalid';
    clearInput(row);
  } else {
    for (let i = 0; i < 5; i++) {
      if (
        selectedRow[i] !== wordArray[i] &&
        wordArray.includes(selectedRow[i])
      ) {
        selectedRowElements[i].classList.add('incorrect');
        wordArray.splice(
          wordArray.findIndex((e) => e === selectedRow[i]),
          1,
          ''
        );
        wordCorrect = false;
      }
    }
    for (let i = 0; i < 5; i++) {
      if (
        selectedRow[i] !== wordArray[i] &&
        !wordArray.includes(selectedRow[i])
      ) {
        selectedRowElements[i].classList.add('error');
        wordCorrect = false;
      }
    }
    for (let i = 0; i < 5; i++) {
      if (selectedRow[i] === wordArray[i]) {
        selectedRowElements[i].classList.add('correct');
        wordArray.splice(i, 1, '');
      }
    }
  }

  if (!wordCorrect) {
    console.log('booo');
    changeActiveRow();
  } else if (wordCorrect === 'invalid') {
    return;
  } else {
    gameWon();
  }
}

// Game Won Function
function gameWon() {
  informationContainer.innerHTML =
    '<h2>Congratulations! You have won the game!</h2>';
}

// Game Lost Function
function gameLost() {
  informationContainer.innerHTML =
    '<h2>Booooo! You have lost!</h2>';
}

// Event Listeners
window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    inputLetter(activeRow, letter);
  } else if (e.keyCode === 8) {
    deleteLetter(activeRow);
  } else if (e.keyCode === 13) {
    checkRowInput(activeRow);
  } else {
    alert('Please enter a valid letter');
  }
});
