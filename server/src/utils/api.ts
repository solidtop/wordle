import fs from 'fs/promises';

class APIAdapter {
    async fetchWords(wordLength: number): Promise<string[]> {
        const content = await fs.readFile(`./data/words${wordLength}.json`);
        const data = JSON.parse(content.toString());
        return data.words;
    }
}

export default APIAdapter;
