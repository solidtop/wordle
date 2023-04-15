import express from 'express';
import checkGuess from '../../controllers/checkGuess';
import { getGameState } from '../../controllers/gameController';
import { SessionData } from 'express-session';

const router = express.Router();

router.post("/guess", (req, res) => {
    const { secretWord, gameHasStarted, gameIsFinished } = req.session;

    if (!secretWord || !gameHasStarted || gameIsFinished) {
        res.status(403).json({ error: "Game session is not active" });
        return;
    }

    const guess: string = req.body.guess;
    const { isValid, isExactMatch, error, results } = checkGuess(guess, secretWord);

    if (!isValid) {
        res.status(400).json({ error });
        return;
    }

    req.session.endTime = new Date().toString();
    const sessionData = req.session as SessionData;
    sessionData.playerHasWon = isExactMatch;
    const gameState = getGameState(sessionData, results);

    req.session.results = gameState.results;
    req.session.gameIsFinished = gameState.gameIsFinished;
    req.session.guessesRemaining = gameState.guessesRemaining;
    req.session.currentGuess = gameState.currentGuess;
    req.session.playerHasWon = gameState.playerHasWon;
    req.session.score = gameState.score;
    req.session.gameTime = gameState.gameTime;

    res.json({ ...gameState });
});

export default router;

