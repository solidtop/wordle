import { useEffect, useState } from 'react';
import APIAdapter from './utils/api.js';
import Board from './components/Board';
import GuessForm from './components/GuessForm';
import MenuBar from './components/MenuBar';
import GameEndMenu from './components/GameEndMenu';
import GameTimer from './components/GameTimer';
import { loadSettings } from './utils/settings.js';

function App() {
    const [settings, setSettings] = useState(loadSettings());
    const [results, setResults] = useState([[]]);
    const [gameHasStarted, setGameHasStarted] = useState(false);
    const [gameIsFinished, setGameIsFinished] = useState(false);
    const [endResults, setEndResults] = useState(null);
    const [gameTime, setGameTime] = useState(0);

    async function startGame(restart, settings) {
        const { wordLength, uniqueLetters } = settings;

        const api = new APIAdapter();
        const res = await api.fetchSecretWord(
            wordLength || 5,
            uniqueLetters ? true : false,
            restart
        );

        if (res.error) {
            return alert(res.error);
        }

        setResults(res.results);
        setGameHasStarted(res.gameHasStarted || true);
        setGameIsFinished(res.gameIsFinished || false);
        setGameTime(res.gameTime || 0);

        if (res.gameIsFinished) {
            handleGameEnd(res);
        }
    }

    useEffect(() => {
        startGame(false, settings);
    }, []);

    function handleRestart(settings) {
        startGame(true, settings);
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
            handleGameEnd(res);
        }
    }

    function handleGameEnd(res) {
        setEndResults({
            isWin: res.playerHasWon,
            score: res.score,
            secretWord: res.secretWord,
            guesses: res.currentGuess,
            time: new Date(res.gameTime),
            highscorePosted: res.highscorePosted,
        });
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
                    {!gameIsFinished && <GameTimer time={gameTime} />}
                    <Board results={results} />

                    <div className="game-inputs">
                        <button
                            className="btn-restart"
                            onClick={() => handleRestart(settings)}
                            title="Restart game"
                        ></button>
                        <GuessForm
                            onGuess={handleGuess}
                            length={results[0].length}
                            disabled={gameIsFinished}
                        />
                    </div>
                </>
            )}

            {gameIsFinished && endResults && (
                <GameEndMenu
                    isWin={endResults.isWin}
                    score={endResults.score}
                    secretWord={endResults.secretWord}
                    guesses={endResults.guesses}
                    time={endResults.time}
                    onRestart={handleRestart}
                    showForm={!endResults.highscorePosted}
                />
            )}
        </div>
    );
}

export default App;
