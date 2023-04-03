import { GameState, StateData } from '../types/game';
import { Result } from '../types/guess';

export function getElapsedTime(dateStr: string): number {
    const startDate = new Date(dateStr);
    const endDate = new Date();
    return (endDate.getTime() - startDate.getTime());
}

export function getGameState(stateData: StateData): GameState {
    const { prevResults, newResults, secretWord, isExactMatch, gameStartTimestamp, guessesRemaining, currentGuess } = stateData;
    const playerHasWon = isExactMatch;
    const gameIsFinished = playerHasWon || guessesRemaining <= 1;
    const updatedNumGuesses = gameIsFinished && playerHasWon ? guessesRemaining : guessesRemaining - 1;
    const updatedCurrentGuess = gameIsFinished && playerHasWon ? currentGuess : currentGuess + 1;
    const updatedResults = [...prevResults];
    updatedResults[currentGuess] = newResults; 

    if (gameIsFinished) { 
        if (updatedNumGuesses === 0) { // Out of guesses
            return {
                gameIsFinished,
                playerHasWon,
                results: updatedResults,
            }
        }

        const gameDuration = getElapsedTime(gameStartTimestamp);
        const score = calculateScore(guessesRemaining, gameDuration, secretWord.length);
        return {
            gameIsFinished,
            playerHasWon,
            score,
            guessesRemaining: updatedNumGuesses,
            currentGuess: updatedCurrentGuess,
            secretWord,
            gameDuration,
            results: updatedResults,
        };
    } 

    return {
        gameIsFinished,
        guessesRemaining: updatedNumGuesses,
        currentGuess: updatedCurrentGuess,
        results: updatedResults,
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

export function initResults(rows: number, cols: number): Result[][] {
    const totalResults = [];
    for (let i = 0; i < cols; i++) {
        totalResults.push(emptyResults(rows));
    }

    return totalResults;
}

function emptyResults(cols: number): Result[] {
    let arr = [];
    for (let i = 0; i < cols; i++) {
        arr.push({
            letter: '',
            result: '',
        })
    }

    return arr;
}