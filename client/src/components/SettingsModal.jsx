export default function SettingsModal( { wordLengths } ) {
    return (
        <div className="modal-container">
            <div className="modal-content">
                <label htmlFor="select-word-length">CHOOSE WORD LENGHT</label>
                <select name="" id="select-word-length">
                   {wordLengths.map(length => {
                        return <option value={length}>{length} LETTERS</option>
                   })}
                </select>

                <label htmlFor="">ONLY UNIQUE LETTERS IN SECRET WORD</label>
                <input type="checkbox"/>
            </div>
        </div>
    );
}