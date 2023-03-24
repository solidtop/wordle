import fetch from 'node-fetch';

const API_URL: string = 'https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json';

class APIAdapter {

    async fetchWords() {
        const res = await fetch(API_URL);
        const data: string = await res.json();
        return data;
    }

}

export default APIAdapter;
