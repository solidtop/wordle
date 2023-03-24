import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import router from './routers';
import cookieParser from 'cookie-parser';
import jsonwebtoken from 'jsonwebtoken';

export default function initApp() {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());
    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');

    app.use('/', express.static('public'));
    app.use(router);

    return app;
}