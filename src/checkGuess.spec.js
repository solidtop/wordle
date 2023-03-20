import checkGuess from './checkGuess.js';

/*
These tests assumes the wordToGuess is always correct with uppercase and therefore only validates the guess from user.

TESTING OBJECTIVES
- "returns letters in correct order": This test ensures that the function returns the correct letters in the correct order as they appear in the guess.
- "returns all results with 'correct'": This test ensures that the function returns 'correct' for all letters in the guess that are in the correct position.
- "returns all results with 'incorrect'": This test ensures that the function returns 'incorrect' for all letters in the guess that are not in the correct position.
- "returns all results with 'misplaced'": This test ensures that the function returns 'misplaced' for all letters in the guess that are in the wrong position.
- "returns results with 'incorrect', 'misplaced', 'incorrect', 'correct', 'incorrect'": This test ensures that the function returns the correct result when some letters are correct, some are misplaced, and some are incorrect.
- "handles guesses with incorrect number of letters": This test ensures that the function returns 'invalid guess' if the guess has the wrong number of letters.
- "handles guesses with special characters": This test ensures that the function returns 'invalid guess' if the guess contains any special characters.
- "handles lowercase": This test ensures that the function can handle lowercase letters in the guess and still return the correct results.
- "handles whitespace": This test ensures that the function returns 'invalid guess' if the guess contains any whitespace.
*/

const mockWord = 'CYKLA';

describe('checkGuess()', () => {
    it('returns letters in correct order', () => { 
        const expected = ['C', 'Y', 'K', 'L', 'A'];
        const response = checkGuess('CYKLA', mockWord);
        response.forEach((obj, i) => {
            expect(obj).toEqual({...obj, letter: expected[i]});
        });
    });

    it('returns all results with "correct"', () => {
        const response = checkGuess('CYKLA', mockWord);
        response.forEach(obj => {
            expect(obj).toEqual({...obj, result: 'correct'});
        });
    });

    it('returns all results with "incorrect"', () => {
        const response = checkGuess('FJORD', mockWord);
        response.forEach(obj => {
            expect(obj).toEqual({...obj, result: 'incorrect'});
        });
    });

    it('returns all results with "misplaced"', () => {
        const response = checkGuess('ISMISPPSIIS', 'MISSISSIPPI');
        response.forEach(obj => {
            expect(obj).toEqual({...obj, result: 'misplaced'});
        });
    });

    it('returns results with "incorrect", "incorrect", "correct", "correct", "incorrect", "correct", "correct", "incorrect", "incorrect", "incorrect", "incorrect"', () => {
        const expected = ['incorrect', 'incorrect', 'correct', 'correct', 'incorrect', 'correct', 'correct', 'incorrect', 'incorrect', 'incorrect', 'incorrect'];
        const response = checkGuess("sssssssssss", "MISSISSIPPI");
        response.forEach((obj, i) => {
            expect(obj).toEqual({...obj, result: expected[i]});
        });
    });

    it('returns results with "incorrect", "misplaced", "incorrect", "correct", "incorrect"', () => {
        const expected = ['incorrect', 'misplaced', 'incorrect', 'correct', 'incorrect'];
        const response = checkGuess('HALLÅ', mockWord);
        response.forEach((obj, i) => {
            expect(obj).toEqual({...obj, result: expected[i]});
        });
    });

    it('handles guesses with incorrect number of letters', () => {
        const response = checkGuess('CYKL', mockWord);
        expect(response).toBe('invalid guess');
    });

    it('handles guesses with special characters', () => {
        const response = checkGuess('!?*-+', mockWord); 
        expect(response).toBe('invalid guess');
    });

    it('handles lowercase', () => {
        const response = checkGuess('cykla', mockWord);
        response.forEach(obj => {
            expect(obj).toEqual({...obj, result: 'correct'});
        });
    });

    it('handles whitespace', () => {
        const response = checkGuess('cyk aa', mockWord); 
        expect(response).toBe('invalid guess');
    });
});

