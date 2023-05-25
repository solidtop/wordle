import { describe, it, expect } from "@jest/globals";
import { calculateScore } from "./gameController";

describe("calculateScore()", () => {
  it("returns higher score with longer secretWord", () => {
    const gameTime = 2 * 60 * 1000;
    const score1 = calculateScore(3, gameTime, 6);
    const score2 = calculateScore(3, gameTime, 5);
    expect(score1).toBeGreaterThan(score2);
  });

  it("returns higher score with fewer guesses", () => {
    const gameTime = 2 * 60 * 1000;
    const score1 = calculateScore(3, gameTime, 5);
    const score2 = calculateScore(2, gameTime, 5);
    expect(score1).toBeGreaterThan(score2);
  });

  it("returns higher score with less gameTime", () => {
    const gameTime = 1 * 60 * 1000;
    const score1 = calculateScore(3, gameTime, 5);
    const score2 = calculateScore(3, gameTime * 2, 5);
    expect(score1).toBeGreaterThan(score2);
  });

  it("returns 0 score when gameTime is very long", () => {
    const gameTime = 60 * 60 * 1000;
    const score = calculateScore(3, gameTime, 5);
    expect(score).toBe(0);
  });

  it("numGuesses holds more score weight than gameTime", () => {
    const gameTime = 1 * 60 * 1000;
    const score1 = calculateScore(5, gameTime * 10, 5);
    const score2 = calculateScore(4, gameTime, 5);
    expect(score1).toBeGreaterThan(score2);
  });
});
