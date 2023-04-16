export default class APIAdapter {
    async fetchSecretWord(wordLength, uniqueLetters, restart) {
        const res = await fetch(`/api/secret-word?wordLength=${wordLength}&uniqueLetters=${uniqueLetters}&restart=${restart}`, {
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