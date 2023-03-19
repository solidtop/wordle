export default function checkGuess(guess, wordToGuess) {    
    guess = guess.toUpperCase();
    const regex = /^[A-ZÄÖÅ]+$/;

    if (guess.length !== wordToGuess.length || !regex.test(guess)) {
        return 'invalid guess';
    }

    const results = [];
    for (let i = 0; i < guess.length; i++) {
        const letter = guess.charAt(i);
        const targetLetter = wordToGuess.charAt(i);
        const isCorrect = letter === targetLetter;
        const isMisplaced = !isCorrect && hasMisplaced(letter, guess, wordToGuess);
        
        results.push({ letter, result: isCorrect ? 'correct' : isMisplaced ? 'misplaced' : 'incorrect' });
    }
    
    return results;
}

function hasMisplaced(letter, guess, wordToGuess) {
    let index = wordToGuess.indexOf(letter);
    while (index !== -1) {
        if (guess.charAt(index) !== letter) {
            return true;
        }
        index = wordToGuess.indexOf(letter, index + 1);
    }
    return false;
}


