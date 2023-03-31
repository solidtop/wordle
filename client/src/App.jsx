import { useEffect, useState } from 'react'
import APIAdapter from './api.js';
import Board from './components/Board';
import GuessForm from './components/GuessForm';
import MenuBar from './components/MenuBar';

function App() {
  const [results, setResults] = useState(initResults(5, 6));
  const [currentGuess, setCurrentGuess] = useState(0);
  const [guessesRemaining, setGuessesRemaining] = useState(5);

  useEffect(() => {
    async function startGame() {
      const api = new APIAdapter();
      const res = await api.fetchSecretWord(`?length=${length}&allowRepeats=${true}`);
      if (res.error) {
        console.log(res.error);
        return;
      }

      setResults(initResults(length, 6));
    }

    startGame();
    
  }, []);
  
  async function handleGuess(guess) {
    // Send guess to server
    const res = await fetch('/api/guess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({guess}),
    });
      //get response
      const data = await res.json();
      console.log(data);

      /*const newResults = mockResponse(guess);
      const updatedResults = [...results];
      updatedResults[currentGuess] = newResults; 
      setResults(updatedResults);
      setCurrentGuess(currentGuess + 1);
      setGuessesRemaining(guessesRemaining - 1);
      */
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
