export default function getRandomWord(
  wordList: string[],
  wordLength = 5,
  uniqueLetters = false
): string {
  const excludedIndices: number[] = [];
  let chosenWord = "";
  while (!chosenWord && excludedIndices.length < wordList.length) {
    const index = Math.floor(Math.random() * wordList.length);
    if (excludedIndices.includes(index)) continue;

    const potentialWord = wordList[index];
    if (
      potentialWord.length === wordLength &&
      (!uniqueLetters || !hasDuplicates(potentialWord))
    ) {
      chosenWord = potentialWord;
    }
    excludedIndices.push(index);
  }
  if (!chosenWord)
    throw new Error("Could not find word with matching criteria");
  return chosenWord.toUpperCase();
}

export function hasDuplicates(word: string): boolean {
  return /([a-zA-Z]).*?\1/.test(word);
}
