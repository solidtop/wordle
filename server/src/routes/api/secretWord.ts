import express from 'express';
import APIAdapter from '../../utils/ApiAdapter';
import getRandomWord from '../../controllers/randomWord';

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
        req.session.secretWord = secretWord; // Save secret word in session
        req.session.numGuesses = 5;
        req.session.gameStartTimestamp = new Date().toString(); // Save start time of game
        res.json({ wordLength: secretWord.length}); // NOTE: Return word length for now 
    } else {
        res.status(500).send({ error: 'Could not find word with matching criteria' });
    }
});

export default router;