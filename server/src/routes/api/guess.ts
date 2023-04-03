import express from 'express';
import checkGuess from '../../controllers/checkGuess';
import { getGameState } from '../../controllers/gameController';

const router = express.Router();

router.post('/guess', (req, res) => {
    const { secretWord, startTime = '', guessesRemaining = 0, currentGuess = 0 } = req.session;
    if (!secretWord) {
        res.status(500).json({ error: 'Secret word is not defined' });
        return;
    }

    const guess:string = req.body.guess;
    const { isValid, isExactMatch, error, results } = checkGuess(guess, secretWord);

    if (!isValid) {
        res.status(400).json({ error });
        return;
    }

    const gameState = getGameState({
        prevResults: req.session.results || [],
        newResults: results || [],
        secretWord, 
        isExactMatch, 
        startTime, 
        endTime: new Date().toString(),
        guessesRemaining,
        currentGuess, 
    });

    req.session.results = gameState.results;
    req.session.guessesRemaining = gameState.guessesRemaining;
    req.session.currentGuess = gameState.currentGuess;
    req.session.gameIsFinished = gameState.gameIsFinished;
    req.session.score = gameState.score;
    req.session.endTime = gameState.endTime;
    
    if (gameState.gameIsFinished) {

    }
   
    res.json({ ...gameState });
});

export default router;

