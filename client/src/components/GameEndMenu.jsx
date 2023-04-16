import { useState } from 'react';
import formatTime from '../utils/timeFormat.js';

export default function GameEndMenu({
    isWin,
    score,
    secretWord,
    guesses,
    time,
    onRestart,
    showForm,
}) {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const res = await fetch('/api/highscores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        });

        const { error = '', success = '' } = await res.json();
        setError(error);
        setSuccess(success);
    }

    return (
        <div className="modal-container">
            <div className="modal-content">
                <div className="game-end-menu">
                    {isWin && (
                        <>
                            <h2>YOU WON!</h2>
                            <h3>YOUR SCORE</h3>
                            <p className="score">{score}</p>
                            <p className="time">
                                {'TIME: ' + formatTime(time)}
                            </p>
                            <p>
                                You managed to guess the secret word{' '}
                                <span className="secret-word">
                                    {secretWord}
                                </span>{' '}
                                in{' '}
                                <span className="guesses">{guesses} tries</span>
                            </p>

                            {!success && showForm && (
                                <form
                                    name="highscore"
                                    className="highscore-form"
                                    onSubmit={handleSubmit}
                                >
                                    <label htmlFor="name"></label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Enter your name..."
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="btn secondary"
                                    >
                                        SUBMIT SCORE
                                    </button>
                                    {error && <strong>{error}</strong>}
                                </form>
                            )}

                            {success && <p>{success}</p>}
                        </>
                    )}

                    {!isWin && (
                        <>
                            <h2>YOU LOSE!</h2>
                            <p>
                                You ran out of guesses! Better luck next time!
                            </p>
                        </>
                    )}

                    <button className="btn primary" onClick={onRestart}>
                        PLAY AGAIN
                    </button>
                </div>
            </div>
        </div>
    );
}
