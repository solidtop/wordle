import { SessionData } from 'express-session';
import GameState from '../types/game';
import { Result } from '../types/guess';
import { Request } from 'express';

export function getElapsedTime(startTime: string, endTime: string): number {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    return (endDate.getTime() - startDate.getTime());
}

export function getGameState(sessionData: SessionData, newResults: Result[] = []): GameState {
    let {
        results,
        secretWord,
        startTime = '',
        endTime = '',
        guessesRemaining,
        currentGuess,
        gameHasStarted,
        gameIsFinished,
        playerHasWon,
        highscorePosted,
    } = sessionData;

    if (!gameHasStarted) {
        return {
            gameHasStarted: true,
            guessesRemaining,
            currentGuess,
            gameTime: 0,
            results,
        };
    }

    const updatedResults = [...results];

    if (newResults.length > 0) {
        updatedResults[currentGuess] = newResults;
        guessesRemaining --;
        currentGuess ++;
        gameIsFinished = playerHasWon || guessesRemaining < 1;
    }

    const gameTime = getElapsedTime(startTime, endTime);
    if (gameIsFinished && playerHasWon) {
        const score = calculateScore(guessesRemaining, gameTime, secretWord.length);
        return {
            gameIsFinished: true,
            playerHasWon: true,
            score,
            guessesRemaining,
            currentGuess,
            secretWord,
            gameTime,
            highscorePosted,
            results: updatedResults,
        };
    }  

    if (gameIsFinished && !playerHasWon) {
        return {
            gameIsFinished: true,
            playerHasWon: false,
            results: updatedResults,
        };
    }

    return {
        gameIsFinished: false,
        guessesRemaining,
        currentGuess,
        gameTime,
        results: updatedResults,
    };
} 

export function calculateScore(guessesRemaining: number, gameTime: number, wordLength: number): number {
    const timeInSeconds = gameTime / 1000;

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