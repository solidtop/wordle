


export default function checkGuess(guess, wordToGuess) {    
    
    const res = [];
    const letters = guess.split('');

    letters.forEach((letter, i) => {
        if (letter === wordToGuess.charAt(i)) {
            res.push({letter, result: 'correct'});
        } else if (letterExists(letter, wordToGuess)) {
            res.push({letter, result: 'misplaced'});
        } else {
            res.push({letter, result: 'incorrect'});
        }
    });

    return res;
}

function letterExists(letter, word) {
    return word.includes(letter);
}