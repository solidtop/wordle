import { GameState, StateData } from '../types/game';

export function getElapsedTime(dateStr: string): number {
    const startDate = new Date(dateStr);
    const endDate = new Date();
    return (endDate.getTime() - startDate.getTime());
}

export function getGameState(stateData: StateData): GameState {
    const { results, secretWord, isExactMatch, gameStartTimestamp, guessesRemaining } = stateData;
    const playerHasWon = isExactMatch;
    const gameIsFinished = playerHasWon || guessesRemaining <= 1;
    const updatedNumGuesses = gameIsFinished && playerHasWon ? guessesRemaining : guessesRemaining - 1;
   
    if (gameIsFinished) {
        const gameDuration = getElapsedTime(gameStartTimestamp);
        const score = calculateScore(guessesRemaining, gameDuration, secretWord.length);
        const message = playerHasWon ? 'Congratulations, you have won!' : 'You lose! Booo';
        return {
            gameIsFinished,
            playerHasWon,
            message,
            results,
            score,
            guessesRemaining: updatedNumGuesses,
            secretWord,
            gameDuration,
        };
    } 

    return {
        gameIsFinished,
        results,
        guessesRemaining: updatedNumGuesses,
    }
} 

export function calculateScore(guessesRemaining: number, gameDuration: number, wordLength: number): number {
    const timeInSeconds = gameDuration / 1000;

    let score = guessesRemaining * 1000;
    score -= timeInSeconds; // Small time penalty 
    score += wordLength * 100; // Bonus for longer words
    score = Math.max(score, 0);
    return Math.round(score);
}