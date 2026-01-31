import { ANALYSIS_RULES } from "./rules.config";
import { IAnalysisResponse } from "./types";

/**
 * Simulates a text analysis "IA" based on regulatory rules.
 * @param {string} text 
 * @returns {number}
 */
export const analyzeText = (text: string): number => {
  let score = ANALYSIS_RULES.BASE_SCORE;

  // Rule 1: Length bonus
  if (text.length > ANALYSIS_RULES.LENGTH_THRESHOLD) {
    score += ANALYSIS_RULES.LENGTH_BONUS;
  }

  // Rule 2: Forbidden words penalty
  const hasForbiddenWord = ANALYSIS_RULES.FORBIDDEN_WORDS.some((word) =>
    text.toLowerCase().includes(word.toLowerCase())
  );

  if (hasForbiddenWord) {
    score -= ANALYSIS_RULES.FORBIDDEN_WORD_PENALTY;
  }

  // Ensure score is bounded between 0 and 100
  return Math.min(
    Math.max(score, ANALYSIS_RULES.MIN_SCORE),
    ANALYSIS_RULES.MAX_SCORE
  );
};

export {
  IAnalysisResponse,
  ANALYSIS_RULES
};