import { Result } from './guess';

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