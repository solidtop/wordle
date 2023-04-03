export default interface Highscore {
    name: string;
    time: number;
    guesses: number;
    score: number;
    settings: {
        wordLength: number;
        uniqueLetters: boolean;
    }
}