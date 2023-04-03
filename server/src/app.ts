import express from 'express';
import { engine } from 'express-handlebars';
import router from './routers';
import session from 'express-session';
import { Result } from './types/guess';

declare module "express-session" {
    interface SessionData {
        results?: Result[][];
        secretWord?: string;
        startTime?: string;
        guessesRemaining?: number;
        currentGuess?: number;
    }
}

export default function initApp() {
    const app = express();

    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');

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