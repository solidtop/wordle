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
                        <select name="wordLength" id="select-word-length">
                        {wordLengths.map((length, index) => {
                                return <option key={index} value={length}>{length} LETTERS</option>
                        })}
                        </select>

                        <label htmlFor="select-word-length">Word length</label>
                    </div>

                    <div className="menu-row">
                        <input name="uniqueLetters" type="checkbox"/>
                        <label htmlFor="">Unique Letters</label>
                    </div>

                    <button type="submit" className="btn primary" >APPLY</button>
                </form>
            </div>
        </div>
    );
}