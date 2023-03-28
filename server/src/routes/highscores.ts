import express from 'express';
import filterHighscores from '../middlewares/scoreFilter';

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
    const wordLength = parseInt(req.params.wordLength as string) || 5;
    const allowRepeats = req.params.uniqueLetters === 'uniqueLetters' ? false : true;

    const filteredHighscores = filterHighscores(highscores, wordLength, allowRepeats);
    res.render('highscores', { highscores: filteredHighscores });
});

export default router;