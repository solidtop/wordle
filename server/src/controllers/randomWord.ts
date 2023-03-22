export default function getRandomWord(wordList: string[], wordLength: number, allowRepeats: boolean): string {
    const excludedIndices: number[] = [];
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

export function hasRepeats(word: string): boolean {
    return /(.).*\1/.test(word);
}