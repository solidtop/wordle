import { useEffect, useState } from 'react'
import APIAdapter from './api.js';
import Board from './components/Board';
import GuessForm from './components/GuessForm';
import MenuBar from './components/MenuBar';

function App() {
  const [results, setResults] = useState([[]]);
  const [currentGuess, setCurrentGuess] = useState(0);
  const [guessesRemaining, setGuessesRemaining] = useState(5);
  const [gameIsFinished, setGameIsFinished] = useState(false);

  useEffect(() => {
    async function startGame() {
      const api = new APIAdapter();
      const res = await api.fetchSecretWord(`?length=${5}&allowRepeats=${true}`);
      if (res.error) {
        throw new Error(res.error);
      }

      setResults(initResults(res.wordLength, res.guessesRemaining));
      setCurrentGuess(res.currentGuess);
      setGuessesRemaining(res.guessesRemaining);
    }

    startGame();
    
  }, []);
  
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

    if (gameIsFinished) {
      //TODO: Show end screen
    }
  };

  return (
    <div className="App">
      <MenuBar/>
      <Board results={results}/>
      <GuessForm onGuess={handleGuess} length={results[0].length}/> 
    </div>
  )
}

function mockResponse(guess) {
    return guess.split('').map(letter => {
      return {
        letter,
        result: Math.random() <= .33 ? 'correct' : Math.random() <= .33 ? 'incorrect' : 'misplaced'
      }
    });
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
