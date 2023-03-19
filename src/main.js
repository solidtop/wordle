import checkGuess from './rules.js';
import getWord from './getWord.js';

const wordList = ['cykla', 'kaffe', 'hund', 'blomma', 'bokstav'];
const wordToGuess = getWord(wordList, 5, true);
const guess = 'cykla';
console.log(checkGuess(guess, wordToGuess));