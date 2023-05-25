import { useState, useEffect } from "react";

export default function GameTimer({ time }) {
  const [secondsElapsed, setSecondsElapsed] = useState(Math.floor(time / 1000));

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(secondsElapsed / 3600);
  const minutes = Math.floor((secondsElapsed % 3600) / 60);
  const seconds = secondsElapsed % 60;

  return (
    <div className="game-timer">
      {hours > 0 ? `${hours.toString().padStart(2, "0")}:` : ""}
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
}
