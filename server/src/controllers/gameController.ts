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
        const message = playerHasWon ? 'Congratulations, you have won!' : 'You lose! Booo';
        return {
            gameIsFinished,
            playerHasWon,
            message,
            results,
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
