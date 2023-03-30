import { useEffect, useState } from 'react'
import Board from './components/Board';
import SettingsMenu from './components/SettingsMenu';
import GuessForm from './components/GuessForm';
import { loadSettings, saveSettings } from './settings';

const settingsData = localStorage.getItem('settings');
console.log(settingsData);

function App() {
  const [results, setResults] = useState(initResults(10, 6));
  const [currentGuess, setCurrentGuess] = useState(0);
  const [guessesRemaining, setGuessesRemaining] = useState(5);
  const [menuActive, setMenuActive] = useState(false);
  const [settings, setSettings] = useState(loadSettings() || {});
  //console.log(settings);

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

  function toggleMenu() {
    setMenuActive(!menuActive);
    //console.log(menuActive)
  }

  return (
    <div className="App">
      <section className='game-panel'>
        <button className='btn-open' onClick={toggleMenu}></button>
      </section>

      {menuActive && (
        <SettingsMenu 
          wordLengths={[5, 6, 7, 8, 9, 10]} 
          settings={settings}
          onSave={data => {
              saveSettings(data);
              setSettings(data);
              setMenuActive(false);
          }}/>
      )}
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
