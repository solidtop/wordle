import { SessionData } from "express-session";

export default class GameTimer {
    private session: SessionData;
    private interval: NodeJS.Timer | undefined;

    constructor(session: SessionData) {
        this.session = session;
        this.session.gameTimer = 0;
    }

    start() {
        this.interval = setInterval(() => {
            if (this.session.gameTimer !== undefined) {
                this.session.gameTimer ++;
                console.log(this.session.gameTimer);
            }
        }, 1000);
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}