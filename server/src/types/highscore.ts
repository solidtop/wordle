export default interface HighScore {
    name: string;
    gameDuration: number;
    numGuesses: number;
    score: number;
    settings: {
        wordLength: number;
        allowRepeats: boolean;
    }
}