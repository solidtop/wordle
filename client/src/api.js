export default class APIAdapter {
    async fetchSecretWord(query) {
        const res = await fetch('/api/secret-word' + query, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
        });
        const data = await res.json();
        return data;
    }

    async postGuess(guess) {
        const res = await fetch('/api/guess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({guess}),
        });
        const data = await res.json();
        return data;
    }
}