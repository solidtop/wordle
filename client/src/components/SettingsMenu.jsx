import { useState } from 'react';


export default function SettingsMenu( { wordLengths, settings, onSave } ) {
    const { wordLength, uniqueLetters } = settings;
    const [checked, setChecked] = useState(uniqueLetters ? true : false);
    const [value, setValue] = useState(wordLength);

    return (
        <div className="modal-container">
            <div className="modal-content">
                <form name="settings" className="settings-menu" onSubmit={e => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const settingsData = Object.fromEntries(formData.entries());
                    onSave(settingsData);
                }}>
                    <button type='submit' className="btn-close"></button>

                    <h2>SETTINGS</h2>
                    <div className="menu-row">
                        <label htmlFor="select-word-length">Word length</label>
                        <select 
                            name="wordLength" 
                            id="select-word-length" value={value} 
                            onChange={e => setValue(e.target.value)}>
                        {wordLengths.map((length, index) => {
                            return ( 
                                <option key={index} 
                                    value={length}>
                                    {length} LETTERS
                                </option>
                            )
                        })}
                        </select>
                    </div>

                    <div className="menu-row">
                        <label htmlFor="">Unique Letters</label>
                        <input 
                            name="uniqueLetters" 
                            type="checkbox"
                            defaultChecked={checked}
                            onChange= {e => setChecked(e.target.checked)}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}