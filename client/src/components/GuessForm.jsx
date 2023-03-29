import { useState } from 'react';

export default function GuessForm({ onGuess }) {
    const [text, setText] = useState('');

    return (
        <form onSubmit={e => {
            e.preventDefault();
            e.target.reset();
            onGuess(text);
        }}>
            <input 
                type="text" 
                id='guessInput'
                onChange={e => setText(e.target.value)}
            />
            <button type="submit">ENTER</button>
        </form>
    );
}