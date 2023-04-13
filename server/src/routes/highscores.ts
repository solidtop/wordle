import express from 'express';
import { getActiveMenu, getMainNav } from '../utils/menus';
import Highscore from '../models/highscore';

const router = express.Router();

router.get('/highscores', async (req, res) => {
    const wordLength = parseInt(req.query.wordLength as string) || 5;
    const uniqueLetters = req.query.uniqueLetters
        ? req.query.uniqueLetters === 'true'
        : false;

    try {
        const highscores = await Highscore.find({
            settings: {
                wordLength,
                uniqueLetters,
            },
        }).sort({ score: -1 });

        res.render("highscores", {
            menu: getActiveMenu(
                getMainNav(),
                `/highscores`
            ),
            highscores: highscores.map(highscore => highscore.toObject()),
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

export default router;
