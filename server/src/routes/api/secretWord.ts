import express from 'express';
import APIAdapter from '../../utils/ApiAdapter';
import getRandomWord from '../../controllers/randomWord';

const router = express.Router();


router.post('/secret-word', async (req, res) => {
    const length = parseInt(req.query.length as string) || 5;
    const allowRepeats = req.query.allowRepeats ? req.query.allowRepeats === 'true' : true;

    const api = new APIAdapter();
    const words = await api.fetchWords();
    const wordList = Object.keys(words);   
    const secretWord = getRandomWord(wordList, length, allowRepeats); 

    console.log(secretWord);
    if (secretWord) {
        req.session.secretWord = secretWord; // Save secret word in session
        res.json({ wordLength: secretWord.length}); // NOTE: Return word length for now 
    } else {
        res.status(500).send({ error: 'Could not find word with matching criteria' });
    }
});

export default router;