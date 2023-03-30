import { saveSettings } from '../settings.js';


export default function SettingsMenu( { wordLengths, onSave } ) {
    return (
        <div className="modal-container">
            <div className="modal-content">
                <form name="settings" className="settings-menu" onSubmit={e => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const settingsData = Object.fromEntries(formData.entries());
                    onSave(JSON.stringify(settingsData));
                }}>
                    <button className="btn-close"></button>

                    <h2>SETTINGS</h2>
                    <div className="menu-row">
                        <label htmlFor="select-word-length">Word length</label>
                        <select name="wordLength" id="select-word-length">
                        {wordLengths.map((length, index) => {
                                return <option key={index} value={length}>{length} LETTERS</option>
                        })}
                        </select>
                    </div>

                    <div className="menu-row">
                        <label htmlFor="">Unique Letters</label>
                        <input name="uniqueLetters" type="checkbox"/>
                    </div>

                    <button type="submit" className="btn primary" >SAVE</button>
                </form>
            </div>
        </div>
    );
}