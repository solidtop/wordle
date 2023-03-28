import { describe, it, expect } from '@jest/globals';
import { calculateScore } from './gameController';

describe('calculateScore()', () => {
    it('returns higher score with longer secretWord', () => {
        const gameDuration = 2 * 60 * 1000;
        const score1 = calculateScore(3, gameDuration, 6);
        const score2 = calculateScore(3, gameDuration, 5);
        expect(score1).toBeGreaterThan(score2);
    });

    it('returns higher score with fewer guesses', () => {
        const gameDuration = 2 * 60 * 1000;
        const score1 = calculateScore(3, gameDuration, 5);
        const score2 = calculateScore(2, gameDuration, 5);
        expect(score1).toBeGreaterThan(score2);
    });

    it('returns higher score with less gameDuration', () => {
        const gameDuration = 1 * 60 * 1000;
        const score1 = calculateScore(3, gameDuration, 5);
        const score2 = calculateScore(3, gameDuration * 2, 5);
        expect(score1).toBeGreaterThan(score2);
    });

    it('returns 0 score when gameDuration is very long', () => {
        const gameDuration = 60 * 60 * 1000; 
        const score = calculateScore(3, gameDuration, 5);
        expect(score).toBe(0);
    });

    it('numGuesses holds more score weight than gameDuration', () => {
        const gameDuration = 1 * 60 * 1000; 
        const score1 = calculateScore(5, gameDuration * 10, 5);
        const score2 = calculateScore(4, gameDuration, 5);
        expect(score1).toBeGreaterThan(score2);
    });
});



