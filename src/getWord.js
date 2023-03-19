export default function getWord(wordList, wordLength, allowRepeats) {
    const excludedIndices = [];
    let chosenWord = '';
    while (!chosenWord && excludedIndices.length < wordList.length) {
        const index = Math.floor(Math.random() * wordList.length);
        if (excludedIndices.includes(index)) continue;

        const potentialWord = wordList[index];
        if (potentialWord.length === wordLength && (allowRepeats || !hasRepeats(potentialWord))) {
            chosenWord = potentialWord;
        }
        excludedIndices.push(index);
    }
    if (!chosenWord) throw new Error('Could not find word with matching criteria');
    return chosenWord.toUpperCase();
}

export function hasRepeats(word) {
    return /(.).*\1/.test(word);
}