import express from 'express';
import fs from 'fs/promises';
import APIAdapter from '../../utils/ApIAdapter';

const router = express.Router();

router.post('/highscores', async (req, res) => {
    const  { name, gameDuration, results, settings } = req.body;

    let status = validateHighscore(name, gameDuration);
    if (!status.isValid) {
        res.status(400).json( { status.error });
        return;
    }

    const api = new APIAdapter();
    const isSuccess = await api.saveHighscore(req.body);
    if (!isSuccess) {
        res.status(500).json({ error: 'There was a problem saving your highscore' });
    }
});

export default router;