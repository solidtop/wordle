export default function getWord(wordList, wordLength, allowRepeats) {
    let safety = 0;
    let isValid = false;
    let chosenWord = '';
    while(!isValid && safety++ < wordList.length) {
        const i = Math.floor(Math.random() * wordList.length);
        const potentialWord = wordList[i];
        if (potentialWord.length === wordLength && !allowRepeats ? !hasRepeats(potentialWord) : true) {
            isValid = true;
            chosenWord = potentialWord;
        }
    }

    if (!chosenWord) {
        throw new Error('Could not find word with matching criteria');
    }

    return chosenWord;
}

export function hasRepeats(word) {
    return /(.).*\1/.test(word);
}