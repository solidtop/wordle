import HighScore from '../types/highscore';

export default function filterHighscores(highscores: HighScore[], length: number, allowRepeats: boolean): HighScore[] {
    let filteredArr = highscores.filter(highscore => {
        return highscore.settings.wordLength === length;
    });

    if (!allowRepeats) {
        filteredArr = filteredArr.filter(highscore => {
            return highscore.settings.allowRepeats === allowRepeats;
        });
    }

    return filteredArr;
}
