import { useState, useEffect } from 'react';

export default function GameTimer({ duration }) {
    const [secondsElapsed, setSecondsElapsed] = useState(Math.floor(duration / 1000));

    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsElapsed(prevSeconds => prevSeconds + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const minutes = Math.floor(secondsElapsed / 60);
    const seconds = secondsElapsed % 60;

    return (
        <div className="game-timer">
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
        </div>
    );
} 