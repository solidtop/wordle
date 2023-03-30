export function saveSettings(settings) {
    localStorage.setItem('settings', settings.wordLength);
    localStorage.setItem('settings', settings.uniqueLetters);
}

export function loadSettings(settings) {
    return localStorage.getItem('settings');
}
