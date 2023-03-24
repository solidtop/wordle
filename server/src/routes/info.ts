import express from 'express';

const router = express.Router();
router.get('/info', (req, res) => {
    res.render('info');
});

export default router;