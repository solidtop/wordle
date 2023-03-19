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
        const isMisplaced = !isCorrect && checkMisplaced(letter, guess, wordToGuess);
        
        results.push({ letter, result: isCorrect ? 'correct' : isMisplaced ? 'misplaced' : 'incorrect' });
    }
    
    return results;
}

function checkMisplaced(letter, guess, wordToGuess) {
    for (let i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess.charAt(i) === letter && guess.charAt(i) !== letter) {
            return true;
        }
    }
    return false;
}


