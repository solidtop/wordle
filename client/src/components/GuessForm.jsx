import { useState } from 'react';

export default function GuessForm({ onGuess, length }) {
    const [text, setText] = useState('');

    function handleChange(e) {
        const resultText = e.target.value.replace(/[^a-z]/gi, '');
        setText(resultText);
    }

    return (
        <form
            className="guess-form"
            onSubmit={(e) => {
                e.preventDefault();
                setText('');
                onGuess(text);
            }}
        >
            <input
                type="text"
                value={text}
                className="guess-input"
                id="guessInput"
                onChange={handleChange}
                minLength={length}
                maxLength={length}
                required
            />
            <button type="submit" className="btn primary">
                ENTER
            </button>
        </form>
    );
}
