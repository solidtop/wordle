import express from 'express';
import APIAdapter from '../../controllers/ApiAdapter';
import getRandomWord from '../../controllers/randomWord';
import { NUM_GUESSES } from '../../constants';

const router = express.Router();

router.post('/secret-word', async (req, res) => {
    const length = parseInt(req.query.length as string) || 5;
    const allowRepeats = req.query.allowRepeats ? req.query.allowRepeats === 'true' : true;

    if (length < 5 || length > 10) {
        res.status(400).send({ error: 'Invalid length' });
        return;
    }

    const api = new APIAdapter();
    const wordList = await api.fetchWords(length);
    const secretWord = getRandomWord(wordList, length, allowRepeats); 
    
    if (secretWord) {
        const timestamp = new Date().toString(); 
        req.session.secretWord = secretWord; // Save info in server session
        console.log(secretWord);
        req.session.guessesRemaining = NUM_GUESSES;
        req.session.currentGuess = 0;
        req.session.gameStartTimestamp = timestamp; 
        
        res.json({ 
            wordLength: secretWord.length,
            guessesRemaining: NUM_GUESSES,
            currentGuess: 0,
            gameStartTimestamp: timestamp,
            gameHasStarted: true,
        }); 
    } else {
        res.status(500).send({ error: 'Could not find word with matching criteria' });
    }
});

export default router;