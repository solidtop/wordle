import { useEffect, useState } from 'react'
import Board from './components/Board';
import SettingsMenu from './components/SettingsMenu';
import GuessForm from './components/GuessForm';
import MenuBar from './components/MenuBar';
import { loadSettings, saveSettings } from './settings';

const settingsData = localStorage.getItem('settings');
console.log(settingsData);

function App() {
  const [results, setResults] = useState(initResults(10, 6));
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
