import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import router from './routers';
import session from 'express-session';

declare module "express-session" {
  interface SessionData {
    secretWord?: string;
    gameStartTimestamp?: string;
    guessesRemaining?: number;
    currentGuess?: number;
  }
}

export default function initApp() {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
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