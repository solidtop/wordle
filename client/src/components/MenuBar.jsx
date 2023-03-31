import { useState } from 'react';
import SettingsMenu from './SettingsMenu';
import { loadSettings, saveSettings } from '../settings';


function MenuBar({ onClick }) {
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [settings, setSettings] = useState(loadSettings() || {});

  function handleSettingsMenu() {
    setShowSettingsMenu(!showSettingsMenu);
  }

  return (
    <>
      <section className='menu-bar'>
        <button className='btn-settings' onClick={handleSettingsMenu}></button>
      </section>

      {showSettingsMenu && (
          <SettingsMenu 
            wordLengths={[5, 6, 7, 8, 9, 10]} 
            settings={settings}
            onSave={data => {
                saveSettings(data);
                setSettings(data);
                setShowSettingsMenu(false);
            }}/>
        )}
    </>
  );
}
  
export default MenuBar;

  