import express from 'express';
import Highscore from '../../models/highscore';
import { calculateScore, getElapsedTime } from '../../controllers/gameController';

const router = express.Router();
router.post('/highscores', async (req, res) => {
    const name  = req.body.name;
    const { 
        score, 
        gameIsFinished, 
        playerHasWon,
        currentGuess = 0, 
        startTime = '', 
        endTime = '', 
        settings 
    } = req.session;

    if (!gameIsFinished || !playerHasWon) {
        res.status(403).json({ error: 'Highscore forbidden' });
        return;
    }

    const time = getElapsedTime(startTime, endTime);
    const highscore = new Highscore({
        name,
        time,
        guesses: currentGuess + 1,
        score,
        settings,
    });

    try {
        await highscore.save(); 
    } catch(err) {
        res.status(500).json({ error: 'There was a problem posting your highscore' });
        return;
    }
   
    res.status(200).send('Highscore posted');
});

export default router;