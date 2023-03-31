import express from 'express';
import filterHighscores from '../middlewares/scoreFilter';
import { getActiveMenu, getMainNav } from '../utils/menus';

const highscores = [
    {
        name: 'Axel',
        gameDuration: 12000,
        numGuesses: 2,
        score: 1000,
        settings: {
            wordLength: 5,
            allowRepeats: true,
        }
    },
    {
        name: 'Joel',
        gameDuration: 12000,
        numGuesses: 2,
        score: 1000,
        settings: {
            wordLength: 8,
            allowRepeats: false,
        }
    },
    {
        name: 'Gun',
        gameDuration: 12000,
        numGuesses: 2,
        score: 1000,
        settings: {
            wordLength: 10,
            allowRepeats: true,
        }
    }
];


const router = express.Router();

// Note: There problably is a better way of handling uniqueLetters param
router.get('/highscores/:wordLength/:uniqueLetters', (req, res) => {
    const { wordLength, uniqueLetters } = req.params; 
    const allowRepeats = uniqueLetters !== 'uniqueLetters';
    const filteredHighscores = filterHighscores(highscores, parseInt(wordLength) || 5, allowRepeats);
    res.render('highscores', { 
        menu: getActiveMenu(getMainNav(), `/highscores/${wordLength}/${uniqueLetters}`),
        highscores,
    });
});

export default router;