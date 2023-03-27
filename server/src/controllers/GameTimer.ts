import { SessionData } from "express-session";

export default class GameTimer {
    private session: SessionData;
    private interval: NodeJS.Timer | undefined;

    constructor(session: SessionData) {
        this.session = session;
        this.session.gameDuration = 0;
    }

    start() {
        this.interval = setInterval(() => {
            if (this.session.gameDuration !== undefined) {
                this.session.gameDuration ++;
                console.log(this.session.gameDuration);
            }
        }, 1000);
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}