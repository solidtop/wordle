import fs from 'fs/promises';
import HighScore from '../types/highscore';

class APIAdapter {
    async fetchWords(wordLength: number): Promise<string[]> {
        const content = await fs.readFile(`./data/words${wordLength}.json`);
        const data = JSON.parse(content.toString());
        return data.words;
    }

    async saveHighscore(highScore: HighScore): Promise<boolean> {
        return true;
    }
}

export default APIAdapter;
