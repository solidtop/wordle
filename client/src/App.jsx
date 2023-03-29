import { useEffect, useState } from 'react'
import Board from './components/Board';
import SettingsModal from './components/SettingsModal';
import GuessForm from './components/GuessForm';


function App() {
  const [results, setResults] = useState(initResults(5, 5));
  const [currentGuess, setCurrentGuess] = useState(0);
  const [guessesRemaining, setGuessesRemaining] = useState(5);

  function handleGuess(guess) {
    // Send guess to server

      //get response

      const newResults = mockResponse(guess);
      const updatedResults = [...results];
      updatedResults[currentGuess] = newResults; 
      setResults(updatedResults);
      setCurrentGuess(currentGuess + 1);
      setGuessesRemaining(guessesRemaining - 1);
  };

  return (
    <div className="App">
      <Board results={results}/>
      <GuessForm onGuess={handleGuess}/> 
    </div>
  )
}

function mockResponse(guess) {
    return guess.split('').map(letter => {
      return {
        letter,
        result: 'incorrect',
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
