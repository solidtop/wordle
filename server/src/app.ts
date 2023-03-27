import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import router from './routers';
import session from 'express-session';

declare module "express-session" {
  interface SessionData {
    secretWord?: string;
    gameDuration?: number;
  }
}

export default function initApp() {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());
    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');

    app.use(session({
      secret: 'sectret-key',
      resave: false,
      saveUninitialized: false,
    }));
    app.use('/', express.static('public'));
    app.use(router);

    return app;
}