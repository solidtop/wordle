import express from 'express';
import { getActiveMenu, getMainNav } from '../utils/menus';
import Highscore from '../models/highscore';

const router = express.Router();

// Note: There problably is a better way of handling uniqueLetters param
router.get('/highscores/:wordLength/:uniqueLetters', async (req, res) => {
    const wordLength = parseInt(req.params.wordLength) || 5;
    const uniqueLetters = req.params.uniqueLetters ? req.params.uniqueLetters === 'true' : true;

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
                `/highscores/${req.params.wordLength}/${req.params.uniqueLetters}`
            ),
            highscores: highscores.map(highscore => highscore.toObject()),
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

export default router;
