type Result = {
    letter: string;
    result: string;
}

type Status = {
    isValid: boolean;
    message?: string;
    results?: Result[];
}

export default function checkGuess(guess: string, wordToGuess: string): Status {
    guess = guess.toUpperCase();
    const regex = /^[A-ZÄÖÅ]+$/;

    if (guess.length !== wordToGuess.length || !regex.test(guess)) {
        return { isValid: false, message: 'invalid guess' };
    }
    
    const results: Result[] = [];
    for (let i = 0; i < guess.length; i++) {
        const letter = guess.charAt(i);
        const targetLetter = wordToGuess.charAt(i);
        const isCorrect = letter === targetLetter;
        const isMisplaced = !isCorrect && checkMisplaced(letter, guess, wordToGuess);
        
        results.push({ letter, result: isCorrect ? 'correct' : isMisplaced ? 'misplaced' : 'incorrect' });
    }

    return { isValid: true, results };
}

function checkMisplaced(letter: string, guess: string, wordToGuess: string): boolean {
    for (let i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess.charAt(i) === letter && guess.charAt(i) !== letter) {
            return true;
        }
    }
    return false;
}

