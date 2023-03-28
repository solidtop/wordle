import { Result } from './guess'

export default interface HighScore {
    name: string;
    gameDuration: number;
    results: Result[];
    settings: {
        wordLength: number;
        allowRepeats: boolean;
    }
}