import fs from 'fs/promises';
import { Result } from '../controllers/checkGuess';

interface HighScore {
    name: string;
    gameDuration: number;
    results: Result[];
    settings: {
        wordLength: number;
        allowRepeats: boolean;
    }
}

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
