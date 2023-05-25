import { Result } from "./guess";

export default interface GameState {
  results: Result[][];
  gameHasStarted?: boolean;
  gameIsFinished?: boolean;
  guessesRemaining?: number;
  currentGuess?: number;
  playerHasWon?: boolean;
  secretWord?: string;
  score?: number;
  gameTime?: number;
  highscorePosted?: boolean;
}

declare module "express-session" {
  interface SessionData {
    results: Result[][];
    secretWord: string;
    startTime?: string;
    endTime?: string;
    gameTime?: number;
    guessesRemaining: number;
    currentGuess: number;
    score?: number;
    gameHasStarted: boolean;
    gameIsFinished: boolean;
    playerHasWon?: boolean;
    settings: {
      wordLength: number;
      uniqueLetters: boolean;
    };
    highscorePosted?: boolean;
  }
}
