import express from 'express';
import APIAdapter from '../../controllers/ApiAdapter';
import getRandomWord from '../../controllers/randomWord';
import { NUM_GUESSES } from '../../constants';
import { initResults } from '../../controllers/gameController';

const router = express.Router();

router.post('/secret-word', async (req, res) => {
    if (!req.session.secretWord) {
        const wordLength = parseInt(req.query.wordLength as string) || 5;
        const uniqueLetters = req.query.uniqueLetters ? req.query.uniqueLetters === 'true' : true;

        if (wordLength < 5 || wordLength > 10) {
            res.status(400).json({ error: 'Invalid length' });
            return;
        }

        const api = new APIAdapter();
        const wordList = await api.fetchWords(wordLength);
        const secretWord = getRandomWord(wordList, wordLength, uniqueLetters); 
        if (!secretWord) {
            res.status(500).send({ error: 'Could not find word with matching criteria' });
            return;
        }

        // Save info in server session
        const timestamp = new Date().toString(); 
        req.session.results = initResults(secretWord.length, NUM_GUESSES); 
        req.session.secretWord = secretWord; 
        console.log(secretWord);
        req.session.guessesRemaining = NUM_GUESSES;
        req.session.currentGuess = 0;
        req.session.gameStartTimestamp = timestamp; 
    }

    res.json({ 
        guessesRemaining: req.session.guessesRemaining,
        currentGuess: req.session.currentGuess,
        gameStartTimestamp: req.session.gameStartTimestamp,
        gameHasStarted: true,
        results: req.session.results,
    }); 
});

export default router;