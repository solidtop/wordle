import express from 'express';
import checkGuess from '../../controllers/checkGuess';
import { getElapsedTime } from '../../controllers/gameController';

const router = express.Router();

router.post('/guess', (req, res) => {
    const guess:string = req.body.guess;
    const secretWord = req.session.secretWord;
    if (secretWord) {
        const {isValid, isExactMatch, error, results} = checkGuess(guess, secretWord);
        if (!isValid) {
            res.status(400).json({ error });
            return;
        }

        if (isExactMatch) {
            const gameDuration = getElapsedTime(req.session.gameStartTimestamp || '');
            res.json({ 
                gameIsFinished: true, 
                playerHasWon: true, 
                message: 'Congratulations, you have won!',
                results,
                score: 0,
                gameDuration,
            });
            req.session.destroy(err => { if (err) throw err; }); //Clear the session after the game finishes
        } else {
            res.json({ gameIsFinished: false, results });
        }
    } else {
        res.status(500).send('Secret word is not defined');
    }
});

export default router;