import express from 'express';

const highscores = [
    {
        name: 'Axel',
        gameDuration: 12000,
        results: [],
        settings: {
            wordLength: 5,
            allowRepeats: true,
        }
    },
    {
        name: 'Joel',
        gameDuration: 12000,
        results: [],
        settings: {
            wordLength: 8,
            allowRepeats: false,
        }
    },
    {
        name: 'Gun',
        gameDuration: 12000,
        results: [],
        settings: {
            wordLength: 10,
            allowRepeats: true,
        }
    }
];


const router = express.Router();
router.get('/highscores/:wordLength/:allowRepeats', (req, res) => {
    const { wordLength, allowRepeats } = req.params;



    
    res.render('highscores');
});

export default router;