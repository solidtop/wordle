export default function checkGuess(guess, wordToGuess) {    
    
    const results = [];
    const letters = guess.split('');

    letters.forEach((letter, i) => {
        if (letter === wordToGuess.charAt(i)) {
            results.push({letter, result: 'correct'});
        } else {
            results.push({letter, result: 'incorrect'});
        }
    });

    letters.forEach((letter, i) => {
        if (wordToGuess.includes(letter) && !hasCorrectResult(letter, results)) {
            results[i] = {letter, result: 'misplaced'};
        }
    });

    return results;
}

function hasCorrectResult(letter, results) {
    for (let i = 0; i < results.length; i++) {
        if (results[i].letter === letter && results[i].result === 'correct') {
            return true;
        }
    }

    return false;
}


console.log(checkGuess('ismisppsiis', 'mississippi'));