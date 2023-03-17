import checkGuess from './rules.js';

const mockWord = 'CYKLA';

describe('checkGuess()', () => {
    it('Should return an array of objects', () => {
        expect(checkGuess('', mockWord)).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    letter: '',
                    result: 'incorrect'
                })
            ])
        );
    });

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
        expect(checkGuess('HUKLA', mockWord)[0]).toEqual({...obj, result: 'incorrect'});
    });

    it('Should return first result with "misplaced"', () => {
        expect(checkGuess('LYKLA')[0]).toEqual({...obj, result: 'misplaced'});
    });

    it('Should return results with "incorrect", "misplaced", "incorrect", "correct", "incorrect"', () => {
        const expected = ['incorrect', 'misplaced', 'incorrect', 'correct', 'incorrect'];
        
        const response = checkGuess('HALLÅ', mockWord);
        response.forEach((obj, i) => {
            expect(obj).toEqual({...obj, result: expected[i]});
        });
    });
});

