import checkGuess from './rules.js';

/*
    These tests assumes the wordToGuess is always correct and therefore only validates the guess from user.

    STRATEGY
    it('Should return letters in correct order'): This test verifies that the letters in the response are in the correct order, which should match the order of the letters in the original guess.
    it('Should return all results with "correct"'): This test verifies that all letters in the response that match the letters in the original word are marked as "correct".
    it('Should return first result with "incorrect"'): This test verifies that if the first letter in the guess does not match the first letter in the word, it is marked as "incorrect".
    it('Should return first result with "misplaced"'): This test verifies that if a letter in the guess is present in the word but in a different position, it is marked as "misplaced".
    it('Should return results with "incorrect", "misplaced", "incorrect", "correct", "incorrect"'): This test verifies that the response contains the correct combination of "correct", "incorrect", and "misplaced" results for a mixed guess.
*/

const mockWord = 'CYKLA';

describe('checkGuess()', () => {
   
    it('Should return letters in correct order', () => { 
        const expected = ['C', 'Y', 'K', 'L', 'A'];
        const response = checkGuess('CYKLA', mockWord);
        response.forEach((obj, i) => {
            expect(obj).toEqual({...obj, letter: expected[i]});
        });
    });

    it('Should return all results with "correct"', () => {
        const response = checkGuess('CYKLA', mockWord);
        response.forEach(obj => {
            expect(obj).toEqual({...obj, result: 'correct'});
        });
    });

    it('Should return first result with "incorrect"', () => {
        const response = checkGuess('HUKLA', mockWord)[0];
        expect(response).toEqual({...response, result: 'incorrect'});
    });

    it('Should return first result with "misplaced"', () => {
        const response = checkGuess('LYKCA', mockWord)[0];
        expect(response).toEqual({...response, result: 'misplaced'});
    });

    it('Should return results with "incorrect", "misplaced", "incorrect", "correct", "incorrect"', () => {
        const expected = ['incorrect', 'misplaced', 'incorrect', 'correct', 'incorrect'];
        const response = checkGuess('HALLÅ', mockWord);
        response.forEach((obj, i) => {
            expect(obj).toEqual({...obj, result: expected[i]});
        });
    });

    it('Should handle guesses with incorrect number of letters', () => {
        const response = checkGuess('CYKL', mockWord);
        expect(response).toBe('invalid guess');
    });

    it('Should handle guesses with special characters', () => {
        const response = checkGuess('!?*-+', mockWord); 
        expect(response).toBe('invalid guess');
    });

    it('Should handle lower-case', () => {
        const response = checkGuess('cykla', mockWord);
        response.forEach(obj => {
            expect(obj).toEqual({...obj, result: 'correct'});
        });
    });

    it('Should handle space', () => {
        const response = checkGuess('cyk aa', mockWord); 
        expect(response).toBe('invalid guess');
    });
});

