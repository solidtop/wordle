import express from 'express';
import checkGuess from '../../controllers/checkGuess';

const router = express.Router();

router.post('/guess', (req, res) => {
    const guess:string = req.body.guess;

    const secretWord = req.session.secretWord;
    if (secretWord) {
        const {isValid, error, results} = checkGuess(guess, secretWord);
        if (isValid) {
            res.json({ results });
        } else {
            res.status(400).json({ error });
        }
    } else {
        res.status(500).send('Secret word is not defined');
    }
    
});

export default router;