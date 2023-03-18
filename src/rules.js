export default function checkGuess(guess, wordToGuess) {    
    
    const results = [];
    for (let i = 0; i < guess.length; i++) {
        const letter = guess.charAt(i);
        if (letter === wordToGuess.charAt(i)) {
            results.push({letter, result: 'correct'});
        } else if (isMisplaced(letter, guess, wordToGuess)) {
            results.push({letter, result: 'misplaced'});
        } else {
            results.push({letter, result: 'incorrect'});
        }
    }
    
    return results;
}

function isMisplaced(letter, guess, wordToGuess) {
    let index = wordToGuess.indexOf(letter);

    while (index !== -1) {
        if (guess.charAt(index) !== letter) {
            return true;
        }
        index = wordToGuess.indexOf(letter, index + 1);
    }
    return false;
}


