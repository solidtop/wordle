import { useState } from 'react';

export default function GuessForm({ onGuess, length }) {
    const [text, setText] = useState('');

    return (
        <form className="guess-form" onSubmit={e => {
            e.preventDefault();
            e.target.reset();
            onGuess(text);
        }}>
            <input 
                type="text" 
                className="guess-input"
                id="guessInput"
                onChange={e => setText(e.target.value)}
                minLength={length}
                maxLength={length}
                required
            />
            <button type="submit" className="btn primary">ENTER</button>
        </form>
    );
}