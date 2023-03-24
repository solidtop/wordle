import { describe, it, expect } from '@jest/globals';
import getRandomWord, { hasRepeats } from './randomWord';

/*
    TESTING OBJECTIVES
    - Ensure that getRandomWord() returns a word of the correct length with no repeated letters when allowRepeats is set to false.
    - Ensure that getRandomWord() returns a word of the correct length with potentially repeated letters when allowRepeats is set to true.
    - Verify that an error is thrown if getRandomWord() cannot find a matching word.
    - Confirm that getRandomWord() returns a word from the input wordList.
    - Verify that hasRepeats() correctly identifies words with repeated letters.
    - Ensure that hasRepeats() returns false for an empty string or a single-character string.
    - Verify that hasRepeats() works correctly for strings with special characters or whitespace.
*/

describe('getRandomWord()', () => {
    it('returns an uppercase word', () => {
        const wordList = ['apple', 'banana', 'cherry', 'grape'];
        const wordLength = 5;
        const word = getRandomWord(wordList, wordLength, true);
        expect(word).toBe(word.toUpperCase());
    });

    it('returns a word of the correct length with no repeated letters', () => {
        const wordList = ['APPLE', 'BANANA', 'CHERRY', 'GRAPE'];
        const wordLength = 5;
        const word = getRandomWord(wordList, wordLength, false);
        expect(word.length).toBe(wordLength);
        expect(hasRepeats(word)).toBe(false);
    });

    it('returns a word of the correct length with repeated letters', () => {
        const wordList = ['APPLE', 'BANANA', 'CHERRY', 'GRAPE'];
        const wordLength = 5;
        const word = getRandomWord(wordList, wordLength, true);
        expect(word.length).toBe(wordLength);
    });

    it('throws an error if it cannot find a matching word', () => {
        const wordList = ['APPLE', 'BANANA', 'CHERRY', 'GRAPE'];
        const wordLength = 7;
        expect(() => getRandomWord(wordList, wordLength, true)).toThrow();
    });

    it('returns a word from the input wordList', () => {
        const wordList = ['APPLE', 'BANANA', 'CHERRY', 'GRAPE'];
        const wordLength = 5;
        const word = getRandomWord(wordList, wordLength, true);
        expect(wordList).toContain(word);
    });
});

describe('hasRepeats()', () => {
    it('correctly identifies words with repeated letters', () => {
        const word1 = 'hello';
        const word2 = 'mississippi';
        const word3 = 'banana';
        expect(hasRepeats(word1)).toBe(true);
        expect(hasRepeats(word2)).toBe(true);
        expect(hasRepeats(word3)).toBe(true);
    });

    it('returns false for an empty string or a single-character string', () => {
        const word1 = '';
        const word2 = 'a';
        expect(hasRepeats(word1)).toBe(false);
        expect(hasRepeats(word2)).toBe(false);
    });
});