import { Schema, model } from 'mongoose';
import Highscore from '../types/highscore';

const highscoreSchema = new Schema<Highscore>({
    name: { type: String, required: true },
    time: { type: Number, required: true },
    guesses: { type: Number, required: true },
    score: { type: Number, required: true },
    settings: {
        wordLength: { type: Number, required: true },
        uniqueLetters: { type: Boolean, required: true },
    },
});

const Highscore = model<Highscore>('Highscore', highscoreSchema);
export default Highscore;