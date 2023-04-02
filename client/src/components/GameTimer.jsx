import { useState, useEffect } from 'react';

export default function GameTimer() {
    const [secondsElapsed, setSecondsElapsed] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsElapsed(prevSeconds => prevSeconds + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const hours = Math.floor(secondsElapsed / 60 / 60);
    const minutes = Math.floor(secondsElapsed / 60);
    const seconds = secondsElapsed % 60;

    return (
        <div className="game-timer">
            {hours < 10 ? `0${hours}` : hours}: 
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
        </div>
    );
} 