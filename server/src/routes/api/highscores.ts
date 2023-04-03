import express from 'express';
import fs from 'fs/promises';
import APIAdapter from '../../controllers/ApiAdapter';
import validateHighscore from '../../validators/scoreValidator';
import { getElapsedTime } from '../../controllers/gameController';

const router = express.Router();
router.post('/highscores', async (req, res) => {
    const  { name, numGuesses, score, settings } = req.body;

    const startTime = req.session.startTime || '';
    const gameDuration = getElapsedTime(startTime);
    const { isValid, error } = validateHighscore(name);
    if (!isValid) {
        res.status(400).json( { error });
        return;
    }

    const api = new APIAdapter();
    const isSuccess = await api.saveHighscore({name, gameDuration, numGuesses, score, settings});
    if (!isSuccess) {
        res.status(500).json({ error: 'There was a problem saving your highscore' });
    }
});

export default router;