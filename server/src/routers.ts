import express from 'express';
import gameRouter from './routes/game';
import aboutRouter from './routes/about';
import highscoresRouter from './routes/highscores';
import secretWordApiRouter from './routes/api/secretWord';
import guessApiRouter from './routes/api/guess';
import highscoresApiRouter from './routes/api/highscores';

const router = express.Router();

router.use(gameRouter);
router.use(aboutRouter);
router.use(highscoresRouter);

router.use('/api', secretWordApiRouter);
router.use('/api', guessApiRouter);
router.use('/api', highscoresApiRouter);

export default router;