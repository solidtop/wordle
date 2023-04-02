import { GameState, StateData } from '../types/game';

export function getElapsedTime(dateStr: string): number {
    const startDate = new Date(dateStr);
    const endDate = new Date();
    return (endDate.getTime() - startDate.getTime());
}

export function getGameState(stateData: StateData): GameState {
    const { results, secretWord, isExactMatch, gameStartTimestamp, guessesRemaining, currentGuess } = stateData;
    const playerHasWon = isExactMatch;
    const gameIsFinished = playerHasWon || guessesRemaining <= 1;
    const updatedNumGuesses = gameIsFinished && playerHasWon ? guessesRemaining : guessesRemaining - 1;
    const updatedCurrentGuess = gameIsFinished && playerHasWon ? currentGuess : currentGuess + 1;
   
    if (gameIsFinished) { 
        if (updatedNumGuesses === 0) { // Out of guesses
            return {
                gameIsFinished,
                playerHasWon,
                results,
            }
        }

        const gameDuration = getElapsedTime(gameStartTimestamp);
        const score = calculateScore(guessesRemaining, gameDuration, secretWord.length);
        return {
            gameIsFinished,
            playerHasWon,
            results,
            score,
            guessesRemaining: updatedNumGuesses,
            currentGuess: updatedCurrentGuess,
            secretWord,
            gameDuration,
        };
    } 

    return {
        gameIsFinished,
        results,
        guessesRemaining: updatedNumGuesses,
        currentGuess: updatedCurrentGuess,
    };
} 

export function calculateScore(guessesRemaining: number, gameDuration: number, wordLength: number): number {
    const timeInSeconds = gameDuration / 1000;

    let score = guessesRemaining * 1000;
    score -= timeInSeconds; // Small time penalty 
    score += wordLength * 100; // Bonus for longer words
    score = Math.max(score, 0);
    return Math.round(score);
}