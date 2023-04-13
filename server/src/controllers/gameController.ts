import { GameState, StateData } from '../types/game';
import { Result } from '../types/guess';

export function getElapsedTime(startTime: string, endTime: string): number {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    return (endDate.getTime() - startDate.getTime());
}

export function getGameState(stateData: StateData): GameState {
    const { 
        prevResults, 
        newResults, 
        secretWord, 
        isExactMatch, 
        startTime, 
        endTime,
        guessesRemaining, 
        currentGuess 
    } = stateData;

    const playerHasWon = isExactMatch;
    const gameIsFinished = playerHasWon || guessesRemaining <= 1;
    const updatedGuessesRemaining = gameIsFinished && playerHasWon ? guessesRemaining : guessesRemaining - 1;
    const updatedCurrentGuess = gameIsFinished && playerHasWon ? currentGuess : currentGuess + 1;
    const updatedResults = [...prevResults];
    updatedResults[currentGuess] = newResults; 

    if (gameIsFinished) { 
        if (updatedGuessesRemaining === 0) {// Out of guesses
            return {
                gameIsFinished,
                playerHasWon,
                results: updatedResults,
            };
        }

        const gameDuration = getElapsedTime(startTime, endTime);
        const score = calculateScore(guessesRemaining, gameDuration, secretWord.length);
        return {
            gameIsFinished,
            playerHasWon,
            score,
            guessesRemaining: updatedGuessesRemaining,
            currentGuess: updatedCurrentGuess,
            secretWord,
            gameDuration,
            results: updatedResults,
        };
    } 

    return {
        gameIsFinished,
        guessesRemaining: updatedGuessesRemaining,
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
    const resultGrid = [];
    for (let i = 0; i < cols; i++) {
        resultGrid.push(emptyResults(rows));
    }

    return resultGrid;
}

function emptyResults(rows: number): Result[] {
    const results = [];
    for (let i = 0; i < rows; i++) {
        results.push({
            letter: '',
            result: '',
        });
    }

    return results;
}