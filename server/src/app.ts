import express from 'express';
import { engine } from 'express-handlebars';
import router from './routers';
import Handlebars from 'handlebars';
import session from 'express-session';
import { Result } from './types/guess';
import mongoose from 'mongoose';

declare module "express-session" {
    interface SessionData {
        results?: Result[][];
        secretWord?: string;
        startTime?: string;
        endTime?: string;
        guessesRemaining?: number;
        currentGuess?: number;
        score?: number;
        gameIsFinished?: boolean;
        playerHasWon?: boolean;
        settings?: {
            wordLength: number;
            uniqueLetters: boolean;
        }
    }
}

export default function initApp() {
    const app = express();

    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');
    Handlebars.registerHelper('inc', (value, options) => {
        return parseInt(value) + 1;
    });

    app.use(session({
        secret: 'sectret-key',
        resave: false,
        saveUninitialized: false,
    }));
    
    app.use(express.json());
    app.use(express.static('../client/dist'));
    app.use(router);

    return app;
}

async function run() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/wordle');  
    } catch(err) {
        throw err;
    }
}

run();