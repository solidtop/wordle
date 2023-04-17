export function saveSettings(settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
}

export function loadSettings() {
    return JSON.parse(localStorage.getItem('settings')) || {};
}
