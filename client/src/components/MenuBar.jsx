import { useState } from "react";
import SettingsMenu from "./SettingsMenu";
import { saveSettings } from "../utils/settings";

function MenuBar({ settings, setSettings, onRestart }) {
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  function handleSettingsMenu() {
    setShowSettingsMenu(!showSettingsMenu);
  }

  return (
    <>
      <section className="menu-bar">
        <button
          title="Settings"
          className="btn-settings"
          onClick={handleSettingsMenu}
        ></button>
      </section>

      {showSettingsMenu && (
        <SettingsMenu
          wordLengths={[5, 6, 7, 8, 9, 10]}
          settings={settings}
          onSave={(data) => {
            if (JSON.stringify(data) !== JSON.stringify(settings)) {
              onRestart(data);
            }
            saveSettings(data);
            setSettings(data);
          }}
          setShowSettingsMenu={setShowSettingsMenu}
        />
      )}
    </>
  );
}

export default MenuBar;
