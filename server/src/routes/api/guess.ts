import express from 'express';
import checkGuess from '../../controllers/checkGuess';

const router = express.Router();

router.post('/guess', (req, res) => {
    const guess:string = req.body.guess;

    const {isValid, error, results} = checkGuess(guess, 'CYKLA');
    if (isValid) {
        res.json({ results });
    } else {
        res.status(400).json({ error });
    }
});

export default router;