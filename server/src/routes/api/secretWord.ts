import express from 'express';
import APIAdapter from '../../utils/api';
import getRandomWord from '../../controllers/randomWord';
import { NUM_GUESSES, TIME_LIMIT } from '../../constants';
import { initResults, getGameState, getElapsedTime } from '../../controllers/gameController';
import { SessionData } from 'express-session';

const router = express.Router();

router.post('/secret-word', async (req, res) => {
    const restart = req.query.restart ? req.query.restart === 'true' : false;

    if (!req.session.secretWord || restart) {
        const wordLength = parseInt(req.query.wordLength as string) || 5;
        const uniqueLetters = req.query.uniqueLetters
            ? req.query.uniqueLetters === 'true'
            : false;

        if (wordLength < 5 || wordLength > 10) {
            res.status(400).json({ error: 'Invalid length' });
            return;
        }

        const api = new APIAdapter();
        const wordList = await api.fetchWords(wordLength);
        const secretWord = getRandomWord(wordList, wordLength, uniqueLetters);

        if (!secretWord) {
            res.status(500).send({
                error: 'Could not find word with matching criteria',
            });
            return;
        }

        const timestamp = new Date().toString();
        req.session.results = initResults(secretWord.length, NUM_GUESSES);
        req.session.secretWord = secretWord;
        req.session.gameHasStarted = false;
        req.session.gameIsFinished = false;
        req.session.startTime = timestamp;
        req.session.endTime = timestamp;
        req.session.guessesRemaining = NUM_GUESSES;
        req.session.currentGuess = 0;
        req.session.settings = {
            wordLength,
            uniqueLetters,
        };
        req.session.highscorePosted = false;

        const sessionData = req.session as SessionData;
        const gameState = getGameState(sessionData);
        req.session.gameHasStarted = true;

        res.json({ ...gameState });
        return;
    }

    if (!req.session.gameIsFinished) {
        req.session.endTime = new Date().toString();
    }

    const sessionData = req.session as SessionData;
    const gameState = getGameState(sessionData);

    res.json({ ...gameState });
});

export default router;
