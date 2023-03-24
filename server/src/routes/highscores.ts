import express from 'express';

const router = express.Router();
router.get('/highscores', (req, res) => {
    res.render('highscores');
});

export default router;