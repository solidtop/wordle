import { useEffect, useState } from 'react'
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
  const [currentGuess, setCurrentGuess] = useState(0);
  const [guessesRemaining, setGuessesRemaining] = useState(5);
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [gameIsFinished, setGameIsFinished] = useState(false);
  const [endResults, setEndResults] = useState(null);

    async function startGame() {
      const api = new APIAdapter();
      const wordLength = settings.wordLength;
      const uniqueLetters = settings.uniqueLetters ? true : false;
      const res = await api.fetchSecretWord(`?wordLength=${wordLength}&uniqueLetters=${uniqueLetters}`);
      if (res.error) {
        throw new Error(res.error);
      }
      
      setGameHasStarted(res.gameHasStarted);
      setResults(initResults(res.wordLength, res.guessesRemaining));
      setCurrentGuess(res.currentGuess);
      setGuessesRemaining(res.guessesRemaining);
    }


  useEffect(() => {
    startGame();
    
  }, []);

  function handleRestart() { //TODO: limit users ability to restart somehow
    setGameIsFinished(false);
    setGameHasStarted(false);
    startGame();
  }
  
  async function handleGuess(guess) {
    const api = new APIAdapter();
    const res = await api.postGuess(guess);

    if (res.error) {
      throw new Error(res.error);
    }

    setGameIsFinished(res.gameIsFinished);
    setCurrentGuess(res.currentGuess);
    setGuessesRemaining(res.guessesRemaining);

    const newResults = res.results;
    const updatedResults = [...results];
    updatedResults[currentGuess] = newResults; 
    setResults(updatedResults);

    if (res.gameIsFinished) {
      setEndResults({
        isWin: res.playerHasWon,
        score: res.score,
        secretWord: res.secretWord,
        numGuesses: res.currentGuess + 1,
        time: new Date(res.gameDuration),
      })
    }
  };

  return (
    <div className="App">
      <MenuBar settings={settings} setSettings={setSettings} onRestart={handleRestart}/>
      
      
      {gameHasStarted && (
        <>
          <GameTimer /> 
          <Board results={results} /> 
          <GuessForm onGuess={handleGuess} length={results[0].length} />
        </>
      )}

      {gameIsFinished && endResults && (
        <GameEndMenu
          isWin={endResults.isWin}
          score={endResults.score} 
          secretWord={endResults.secretWord}
          numGuesses={endResults.numGuesses}
          time={endResults.time}
          onRestart={handleRestart} />
      )}
    </div>
  )
}


function initResults(rows, cols) {
  const totalResults = [];
  for (let i = 0; i < cols; i++) {
    totalResults.push(emptyResults(rows));
  }

  return totalResults;
}

function emptyResults(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push({
      letter: '',
      result: '',
    })
  }
  return arr;
}

export default App;
