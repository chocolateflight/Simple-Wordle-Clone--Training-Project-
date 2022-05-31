import wordList from './Words/wordList.js';
import { rowElementsArray, informationContainer } from './Elements/elements.js';

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
