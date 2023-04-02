import { Result } from './guess';

export interface GameState {
    gameIsFinished: boolean;
    results: Result[] | undefined;
    guessesRemaining?: number;
    currentGuess?: number;
    playerHasWon?: boolean;
    secretWord?: string;
    score?: number;
    gameDuration?: number;
}

export interface StateData {
    results: Result[] | undefined;
    secretWord: string;
    isExactMatch: boolean | undefined;
    gameStartTimestamp: string;
    guessesRemaining: number;
    currentGuess: number;
}