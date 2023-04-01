export default function GameEndMenu({ isWin, score, secretWord, numGuesses, time, onRestart }) {
 
    return (
        <div className="modal-container">
            <div className="modal-content">
                <div className="game-end-menu">

                    {isWin && (
                        <>
                        <h2>YOU WON!</h2>
                        <h3>YOUR SCORE</h3>
                        <p>{score}</p>
                        <p>You managed to guess the secret word <span>{secretWord}</span> in <span>{numGuesses} tries</span></p>
                        <p>TIME: {time}</p>

                        <form name="highscore" className="highscore-form" onSubmit={e => {
                            e.preventDefault();
                        }}>
                            <label htmlFor="name"></label>
                            <input type="text" name="name" id="name" placeholder="Enter your name..." />
                            <button type="submit" className="btn secondary">SUBMIT SCORE</button>
                        </form>
                        </>
                    )}

                    {!isWin && (
                        <>
                        <h2>YOU LOSE!</h2>
                        <p>You ran out of guesses! Better luck next time!</p>
                        </>
                    )}
                    
                    <button className="btn primary">PLAY AGAIN</button>
                </div>

              
            </div>
        </div>
    );
}