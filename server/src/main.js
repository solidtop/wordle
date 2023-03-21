import checkGuess from './controllers/checkGuess.js';
import getRandomWord from './randomWord.js';

const wordList = ['cykla', 'kaffe', 'hund', 'blomma', 'bokstav'];
const wordToGuess = getRandomWord(wordList, 5, true);
const guess = 'cykla';
console.log(checkGuess(guess, wordToGuess));
