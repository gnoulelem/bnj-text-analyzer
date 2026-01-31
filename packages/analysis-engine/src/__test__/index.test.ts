import { describe, it, expect } from "vitest";
import { analyzeText } from "../";

describe("Analysis Engine Logic", () => {
  it("should return base score for neutral text", () => {
    expect(analyzeText("Ceci est un test.")).toBe(50);
  });

  it("should add 20 points for text longer than 100 chars", () => {
    const longText = "a".repeat(101);
    expect(analyzeText(longText)).toBe(70);
  });

  it("should subtract 10 points for forbidden words", () => {
    expect(analyzeText("Ceci est faux.")).toBe(40);
  });

  it("should clamp the score at 100", () => {
    const perfectText = "a".repeat(200);
    expect(analyzeText(perfectText)).toBeLessThanOrEqual(100);
  });
});