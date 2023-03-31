import express from 'express';
import APIAdapter from '../../controllers/ApiAdapter';
import getRandomWord from '../../controllers/randomWord';
import { NUM_GUESSES } from '../../constants';

const router = express.Router();

router.post('/secret-word', async (req, res) => {
    const wordLength = parseInt(req.query.wordLength as string) || 5;
    const uniqueLetters = req.query.uniqueLetters ? req.query.uniqueLetters === 'true' : true;
    console.log(uniqueLetters);

    if (wordLength < 5 || wordLength > 10) {
        res.status(400).send({ error: 'Invalid length' });
        return;
    }

    const api = new APIAdapter();
    const wordList = await api.fetchWords(wordLength);
    const secretWord = getRandomWord(wordList, wordLength, uniqueLetters); 
    
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