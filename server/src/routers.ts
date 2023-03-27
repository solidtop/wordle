import express from 'express';
import gameRouter from './routes/game';
import infoRouter from './routes/info';
import highscoresRouter from './routes/highscores';
import secretWordRouter from './routes/api/secretWord';
import guessRouter from './routes/api/guess';

const router = express.Router();

router.use(gameRouter);
router.use(infoRouter);
router.use(highscoresRouter);

router.use('/api', secretWordRouter);
router.use('/api', guessRouter);

export default router;