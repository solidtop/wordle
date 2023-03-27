import express from 'express';
import checkGuess, { Result } from '../../controllers/checkGuess';
import { getElapsedTime } from '../../controllers/gameController';

const router = express.Router();

interface GameResult {
    gameIsFinished: boolean;
    results: Result[] | undefined;
    numGuesses: number;
    playerHasWon?: boolean;
    message?: string;
    secretWord?: string;
    score?: number;
    gameDuration?: number;
}

router.post('/guess', (req, res) => {
    const { secretWord, gameStartTimestamp = '', numGuesses = 0 } = req.session;
    if (!secretWord) {
        res.status(500).send('Secret word is not defined');
        return;
    }

    const guess = req.body.guess;
    const {isValid, isExactMatch, error, results} = checkGuess(guess, secretWord);
    if (!isValid) {
        res.status(400).json({ error });
        return;
    }

    const gameDuration = getElapsedTime(gameStartTimestamp);
    const playerHasWon = isExactMatch;
    const gameIsFinished = playerHasWon || numGuesses <= 1;
    const updatedNumGuesses = gameIsFinished && playerHasWon ? numGuesses : numGuesses - 1;
    req.session.numGuesses = updatedNumGuesses;
   
    let gameResult: GameResult;
    if (gameIsFinished) {
        const message = playerHasWon ? 'Congratulations, you have won!' : 'You lose! Booo';
        gameResult = {
            gameIsFinished,
            playerHasWon,
            message,
            results,
            numGuesses: updatedNumGuesses,
            secretWord,
            score: 0, //NOTE: Not yet implemented
            gameDuration,
        };

        req.session.destroy(err => { if (err) throw err }); //Clear the session when game finishes
    } else {
        gameResult = {
            gameIsFinished,
            results,
            numGuesses: updatedNumGuesses,
        }
    }
   
    res.json({ ...gameResult });
});

export default router;

