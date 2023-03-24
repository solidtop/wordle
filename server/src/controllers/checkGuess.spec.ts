import { describe, it, expect } from '@jest/globals';
import checkGuess from './checkGuess';

/*
These tests assumes the wordToGuess is always correct with uppercase and therefore only validates the guess from user.

TESTING OBJECTIVES
- "returns all results with 'correct'": This test ensures that the function returns 'correct' for all letters in the guess that are in the correct position.
- "returns all results with 'incorrect'": This test ensures that the function returns 'incorrect' for all letters in the guess that are not in the correct position.
- "returns all results with 'misplaced'": This test ensures that the function returns 'misplaced' for all letters in the guess that are in the wrong position.
- "returns results with 'incorrect', 'misplaced', 'incorrect', 'correct', 'incorrect'": This test ensures that the function returns the correct result when some letters are correct, some are misplaced, and some are incorrect.
- "handles guesses with incorrect number of letters": This test ensures that the function returns 'invalid guess' if the guess has the wrong number of letters.
- "handles guesses with special characters": This test ensures that the function returns 'invalid guess' if the guess contains any special characters.
- "handles lowercase": This test ensures that the function can handle lowercase letters in the guess and still return the correct results.
- "handles whitespace": This test ensures that the function returns 'invalid guess' if the guess contains any whitespace.
*/

const mockWord: string = 'CYKLA';

describe('checkGuess()', () => {
   
    it('returns all results with "correct"', () => {
        const expected = [
            { letter: 'C', result: 'correct'},
            { letter: 'Y', result: 'correct'},
            { letter: 'K', result: 'correct'},
            { letter: 'L', result: 'correct'},
            { letter: 'A', result: 'correct'},
        ];
        const {results} = checkGuess('CYKLA', 'CYKLA');
        expect(results).toStrictEqual(expected);
    });

    it('returns all results with "incorrect"', () => {
        const expected = [
            { letter: 'F', result: 'incorrect'},
            { letter: 'J', result: 'incorrect'},
            { letter: 'O', result: 'incorrect'},
            { letter: 'R', result: 'incorrect'},
            { letter: 'D', result: 'incorrect'},
        ];
        const {results} = checkGuess('FJORD', 'CYKLA');
        expect(results).toStrictEqual(expected);
    });

    it('returns all results with "misplaced"', () => {
        const expected = [
            { letter: 'I', result: 'misplaced'},
            { letter: 'S', result: 'misplaced'},
            { letter: 'M', result: 'misplaced'},
            { letter: 'I', result: 'misplaced'},
            { letter: 'S', result: 'misplaced'},
            { letter: 'P', result: 'misplaced'},
            { letter: 'P', result: 'misplaced'},
            { letter: 'S', result: 'misplaced'},
            { letter: 'I', result: 'misplaced'},
            { letter: 'I', result: 'misplaced'},
            { letter: 'S', result: 'misplaced'},
        ];
        const {results} = checkGuess('ISMISPPSIIS', 'MISSISSIPPI');
        expect(results).toStrictEqual(expected);
    });

    it('returns results with "incorrect", "incorrect", "correct", "correct", "incorrect", "correct", "correct", "incorrect", "incorrect", "incorrect", "incorrect"', () => {
        const expected = [
            { letter: 'S', result: 'incorrect'},
            { letter: 'S', result: 'incorrect'},
            { letter: 'S', result: 'correct'},
            { letter: 'S', result: 'correct'},
            { letter: 'S', result: 'incorrect'},
            { letter: 'S', result: 'correct'},
            { letter: 'S', result: 'correct'},
            { letter: 'S', result: 'incorrect'},
            { letter: 'S', result: 'incorrect'},
            { letter: 'S', result: 'incorrect'},
            { letter: 'S', result: 'incorrect'},
        ];
        const {results} = checkGuess('SSSSSSSSSSS', 'MISSISSIPPI');
        expect(results).toStrictEqual(expected);
    });

    it('returns results with "incorrect", "misplaced", "incorrect", "correct", "incorrect"', () => {
        const expected = [
            { letter: 'H', result: 'incorrect'},
            { letter: 'A', result: 'misplaced'},
            { letter: 'L', result: 'incorrect'},
            { letter: 'L', result: 'correct'},
            { letter: 'Å', result: 'incorrect'},
        ];
        const {results} = checkGuess('HALLÅ', 'CYKLA');
        expect(results).toStrictEqual(expected);
    });

    it('handles guesses with incorrect number of letters', () => {
        const status = checkGuess('CYKL', 'CYKLA');
        expect(status.isValid).toBeFalsy();
        expect(status.message).toBe('invalid guess');
    });

    it('handles guesses with special characters', () => {
        const status = checkGuess('!?*-+', 'CYKLA'); 
        expect(status.isValid).toBeFalsy();
        expect(status.message).toBe('invalid guess');
    });

    it('handles lowercase', () => {
        const expected = [
            { letter: 'C', result: 'correct'},
            { letter: 'Y', result: 'correct'},
            { letter: 'K', result: 'correct'},
            { letter: 'L', result: 'correct'},
            { letter: 'A', result: 'correct'},
        ];
        const {results} = checkGuess('cykla', 'CYKLA');
        expect(results).toStrictEqual(expected);
    });

    it('handles whitespace', () => {
        const status = checkGuess('cyk aa', mockWord); 
        expect(status.isValid).toBeFalsy();
        expect(status.message).toBe('invalid guess');
    });
});

