import express from 'express';

const router = express.Router();
router.get('/secret-word', (req, res) => {
    const {length, hasRepeats} = req.query;
    res.json({
        secretWord: 'HELLO',
    });
});

export default router;