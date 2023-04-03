import express from 'express';
import Highscore from '../../models/highscore';
import { calculateScore, getElapsedTime } from '../../controllers/gameController';

const router = express.Router();
router.post('/highscores', async (req, res) => {
    const { name, settings } = req.body;
    const { score, gameIsFinished, currentGuess = 0, startTime = '', endTime = '' } = req.session;

    if (!gameIsFinished) {
        res.status(403).send('Highscore not allowed');
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

    const success = await highscore.save();
    if (!success) {
        res.status(500).send('There was a problem posting your highscore');
        return;
    }

    res.status(200).send('Highscore posted');
});

export default router;