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
        guessesRemaining,
        currentGuess, 
    });

    req.session.results = gameState.results;
    req.session.guessesRemaining = gameState.guessesRemaining;
    req.session.currentGuess = gameState.currentGuess;
    // req.session.gameDuration = gameState.gameDuration; // TODO: save gameduration on server 
    
    if (gameState.gameIsFinished) {
        req.session.destroy(err => { if (err) throw err }); //Clear the session when game finishes
    }
   
    res.json({ ...gameState });
});

export default router;

