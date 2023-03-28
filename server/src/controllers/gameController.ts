import { Result } from './checkGuess';

export function getElapsedTime(dateStr: string): number {
    const startDate = new Date(dateStr);
    const endDate = new Date();
    return (endDate.getTime() - startDate.getTime());
}

interface GameState {
    gameIsFinished: boolean;
    results: Result[] | undefined;
    numGuesses: number;
    playerHasWon?: boolean;
    message?: string;
    secretWord?: string;
    score?: number;
    gameDuration?: number;
}

interface StateData {
    results: Result[] | undefined;
    secretWord: string;
    isExactMatch: boolean | undefined;
    gameStartTimestamp: string;
    numGuesses: number;
}

export function getGameState(stateData: StateData): GameState {
    const { results, secretWord, isExactMatch, gameStartTimestamp, numGuesses } = stateData;
    const playerHasWon = isExactMatch;
    const gameIsFinished = playerHasWon || numGuesses <= 1;
    const updatedNumGuesses = gameIsFinished && playerHasWon ? numGuesses : numGuesses - 1;
   
    if (gameIsFinished) {
        const gameDuration = getElapsedTime(gameStartTimestamp);
        const score = calculateScore(numGuesses, gameDuration, secretWord.length);
        const message = playerHasWon ? 'Congratulations, you have won!' : 'You lose! Booo';
        return {
            gameIsFinished,
            playerHasWon,
            message,
            results,
            score,
            numGuesses: updatedNumGuesses,
            secretWord,
            gameDuration,
        };
    } 

    return {
        gameIsFinished,
        results,
        numGuesses: updatedNumGuesses,
    }
} 

export function calculateScore(numGuesses: number, gameDuration: number, wordLength: number): number {
    const timeInSeconds = gameDuration / 1000;
    
    let score =numGuesses * 1000;
    score -= timeInSeconds; // Small time penalty 
    score += wordLength * 100; // Bonus for longer words
    score = Math.max(score, 0);
    console.log(score);
    return Math.round(score);
}