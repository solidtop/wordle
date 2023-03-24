import express from 'express';
import APIAdapter from '../../utils/ApiAdapter';
import getRandomWord from '../../controllers/randomWord';

const router = express.Router();

router.get('/secret-word', async (req, res) => {
    const length = parseInt(req.query.length as string) || 5;
    const allowRepeats = req.query.allowRepeats ? req.query.allowRepeats === 'true' : true;

    const api = new APIAdapter();
    const words = await api.fetchWords();
    const wordList = Object.keys(words);   
    const secretWord = getRandomWord(wordList, length, allowRepeats); 
   
    if (secretWord) {
        res.json({ secretWord });
    } else {
        res.status(500).send({ message: 'Could not find word with matching criteria' });
    }
});

export default router;