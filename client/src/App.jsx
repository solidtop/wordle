import { useEffect, useState } from 'react';
import APIAdapter from './api.js';
import Board from './components/Board';
import GuessForm from './components/GuessForm';
import MenuBar from './components/MenuBar';
import GameEndMenu from './components/GameEndMenu';
import GameTimer from './components/GameTimer';
import { loadSettings } from './settings.js';

function App() {
    const [settings, setSettings] = useState(loadSettings());
    const [results, setResults] = useState([[]]);
    const [gameHasStarted, setGameHasStarted] = useState(false);
    const [gameIsFinished, setGameIsFinished] = useState(false);
    const [endResults, setEndResults] = useState(null);
    const [gameDuration, setGameDuration] = useState(0);

    async function startGame(restart = false) {
        const api = new APIAdapter();
        const { wordLength, uniqueLetters } = settings;
        const res = await api.fetchSecretWord(
            wordLength || 5,
            uniqueLetters ? true : false,
            restart
        );

        if (res.error) {
            return alert(res.error);
        }

        setGameHasStarted(res.gameHasStarted);
        setResults(res.results);
        setGameDuration(res.gameDuration);
    }

    useEffect(() => {
        startGame();
    }, []);

    async function handleRestart() {
        startGame(true);
        setGameHasStarted(false);
        setGameIsFinished(false);
    }

    async function handleGuess(guess) {
        const api = new APIAdapter();
        const res = await api.postGuess(guess);

        if (res.error) {
          return alert(res.error);
        }

        setGameIsFinished(res.gameIsFinished);
        setResults(res.results);

        if (res.gameIsFinished) {
            setEndResults({
                isWin: res.playerHasWon,
                score: res.score,
                secretWord: res.secretWord,
                numGuesses: res.currentGuess + 1,
                time: new Date(res.gameDuration),
            });
        }
  }

  return (
    <div className="App">
      <MenuBar
        settings={settings}
        setSettings={setSettings}
        onRestart={handleRestart}
      />

      {gameHasStarted && (
        <>
            {!gameIsFinished && <GameTimer duration={gameDuration} />}
            <Board results={results} />

            <div className="game-inputs">
                <button className="btn-restart" onClick={handleRestart}></button>
                <GuessForm onGuess={handleGuess} length={results[0].length} />
            </div>
        </>
      )}

    {gameIsFinished && endResults && (
        <GameEndMenu
            isWin={endResults.isWin}
            score={endResults.score}
            secretWord={endResults.secretWord}
            numGuesses={endResults.numGuesses}
            time={endResults.time}
            onRestart={handleRestart}
        />
    )}
    </div>
  );
}

export default App;
