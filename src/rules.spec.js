import checkGuess from './rules.js';

const mockWord = 'CYKLA';

describe('checkGuess()', () => {
    /*it('Should return an array of objects', () => {
        expect(checkGuess('CYKLA', mockWord)).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    letter: 'C',
                    result: 'incorrect'
                })
            ])
        );
    });*/

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
        const response = checkGuess('LYKLA', mockWord)[0];
        expect(response).toEqual({...response, result: 'misplaced'});
    });

    it('Should return results with "incorrect", "misplaced", "incorrect", "correct", "incorrect"', () => {
        const expected = ['incorrect', 'misplaced', 'incorrect', 'correct', 'incorrect'];
        
        const response = checkGuess('HALLÅ', mockWord);
        response.forEach((obj, i) => {
            expect(obj).toEqual({...obj, result: expected[i]});
        });
    });
});

