import { useState } from "react";

export default function SettingsMenu({
  wordLengths,
  settings,
  onSave,
  setShowSettingsMenu,
}) {
  const { wordLength, uniqueLetters } = settings;
  const [checked, setChecked] = useState(uniqueLetters ? true : false);
  const [value, setValue] = useState(wordLength);

  function handleMenuClose(form) {
    const formData = new FormData(form);
    const settingsData = Object.fromEntries(formData.entries());
    onSave(settingsData);
  }

  return (
    <div
      className="modal-container"
      onClick={() => {
        setShowSettingsMenu(false);
      }}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form
          name="settings"
          className="settings-menu"
          onSubmit={(e) => {
            e.preventDefault();
            handleMenuClose(e.target);
            setShowSettingsMenu(false);
          }}
        >
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowSettingsMenu(false)}
          ></button>

          <h2>SETTINGS</h2>
          <div className="menu-row">
            <label htmlFor="select-word-length">Word length</label>

            {
              <select
                name="wordLength"
                id="select-word-length"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              >
                {wordLengths.map((length, index) => {
                  return (
                    <option key={index} value={length}>
                      {length} LETTERS
                    </option>
                  );
                })}
              </select>
            }
          </div>

          <div className="menu-row">
            <label htmlFor="">Unique Letters</label>
            <input
              name="uniqueLetters"
              type="checkbox"
              defaultChecked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          </div>

          <button type="submit" className="btn btn primary">
            SAVE
          </button>
        </form>
      </div>
    </div>
  );
}
