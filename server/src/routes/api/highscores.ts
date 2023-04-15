import express from 'express';
import Highscore from '../../models/highscore';

const router = express.Router();
router.post('/highscores', async (req, res) => {
    const name  = req.body.name;
    if (!name) {
        res.status(400).json({ error: "Please enter a name" });
        return;
    }

    const { 
        score, 
        gameIsFinished, 
        playerHasWon,
        currentGuess = 0, 
        gameTime,
        settings 
    } = req.session;

    if (!gameIsFinished || !playerHasWon) {
        res.status(403).json({ error: 'Highscore forbidden' });
        return;
    }

    const highscore = new Highscore({
        name,
        time: gameTime,
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

    req.session.highscorePosted = true;
    res.status(200).json({ success: 'Highscore posted!' });
});

export default router;