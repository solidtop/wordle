import { Result } from './guess';

export interface GameState {
    results: Result[][];
    gameIsFinished: boolean;
    guessesRemaining?: number;
    currentGuess?: number;
    playerHasWon?: boolean;
    secretWord?: string;
    score?: number;
    gameDuration?: number;
}

export interface StateData {
    prevResults: Result[][];
    newResults: Result[];
    secretWord: string;
    isExactMatch: boolean | undefined;
    startTime: string;
    endTime: string;
    guessesRemaining: number;
    currentGuess: number;
}