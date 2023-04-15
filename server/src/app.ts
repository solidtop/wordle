import express from 'express';
import { engine } from 'express-handlebars';
import router from './routers';
import Handlebars from 'handlebars';
import session from 'express-session';
import mongoose from 'mongoose';

export default function initApp() {
    const app = express();

    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');
    
    Handlebars.registerHelper('inc', (value: string) => {
        return parseInt(value) + 1;
    });

    Handlebars.registerHelper('formatTime', (time: number) => {
        const date = new Date(time);
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
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