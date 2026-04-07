/**
 * Engagement Scoring System
 *
 * Calculates a unified engagement score from multiple learning signals.
 * Used for gamification, recommendations, and analytics.
 */

import { BRAND } from "@/features/method/constants";

// Engagement tier definitions
export type EngagementTier =
  | "beginner"
  | "explorer"
  | "practitioner"
  | "expert"
  | "master";

export interface EngagementTierInfo {
  id: EngagementTier;
  name: string;
  minScore: number;
  maxScore: number;
  color: string;
  description: string;
}

export const ENGAGEMENT_TIERS: Record<EngagementTier, EngagementTierInfo> = {
  beginner: {
    id: "beginner",
    name: "Beginner",
    minScore: 0,
    maxScore: 20,
    color: "#94a3b8", // slate
    description: "Just getting started",
  },
  explorer: {
    id: "explorer",
    name: "Explorer",
    minScore: 21,
    maxScore: 40,
    color: BRAND.teal,
    description: "Actively exploring the method",
  },
  practitioner: {
    id: "practitioner",
    name: "Practitioner",
    minScore: 41,
    maxScore: 60,
    color: BRAND.coral,
    description: "Putting knowledge into practice",
  },
  expert: {
    id: "expert",
    name: "Expert",
    minScore: 61,
    maxScore: 80,
    color: BRAND.navy,
    description: "Deep understanding achieved",
  },
  master: {
    id: "master",
    name: "Master",
    minScore: 81,
    maxScore: 100,
    color: "#eab308", // gold
    description: "Complete mastery of the Storymakers Method",
  },
};

// Weights for engagement score calculation
export const ENGAGEMENT_WEIGHTS = {
  progress: 0.3, // Overall progress (0-100)
  quizScore: 0.25, // Average quiz score (0-100)
  streak: 0.2, // Current streak (normalized to 0-100)
  timeSpent: 0.15, // Total time spent (normalized to 0-100)
  badges: 0.1, // Badge completion (normalized to 0-100)
} as const;

// Constants for normalization
export const ENGAGEMENT_CONSTANTS = {
  maxStreakForScore: 30, // 30+ days = max streak score
  maxTimeForScore: 36_000, // 10 hours = max time score
  totalBadges: 14, // Total possible badges
} as const;

export interface EngagementScoreInput {
  overallProgress: number; // 0-100
  avgQuizScore: number; // 0-100
  currentStreak: number; // days
  totalTimeSpent: number; // seconds
  badgeCount: number; // number of badges earned
}

/**
 * Calculate engagement score from multiple signals
 *
 * Formula:
 * score = (
 *   progressWeight * progress +
 *   quizWeight * avgQuizScore +
 *   streakWeight * normalizedStreak +
 *   timeWeight * normalizedTime +
 *   badgeWeight * normalizedBadges
 * )
 *
 * @returns Score from 0-100
 */
export function calculateEngagementScore(input: EngagementScoreInput): number {
  const {
    overallProgress,
    avgQuizScore,
    currentStreak,
    totalTimeSpent,
    badgeCount,
  } = input;

  // Normalize streak (cap at maxStreakForScore days)
  const normalizedStreak =
    (Math.min(currentStreak, ENGAGEMENT_CONSTANTS.maxStreakForScore) /
      ENGAGEMENT_CONSTANTS.maxStreakForScore) *
    100;

  // Normalize time spent (cap at maxTimeForScore seconds)
  const normalizedTime =
    (Math.min(totalTimeSpent, ENGAGEMENT_CONSTANTS.maxTimeForScore) /
      ENGAGEMENT_CONSTANTS.maxTimeForScore) *
    100;

  // Normalize badges
  const normalizedBadges =
    (badgeCount / ENGAGEMENT_CONSTANTS.totalBadges) * 100;

  // Calculate weighted score
  const score =
    ENGAGEMENT_WEIGHTS.progress * overallProgress +
    ENGAGEMENT_WEIGHTS.quizScore * avgQuizScore +
    ENGAGEMENT_WEIGHTS.streak * normalizedStreak +
    ENGAGEMENT_WEIGHTS.timeSpent * normalizedTime +
    ENGAGEMENT_WEIGHTS.badges * normalizedBadges;

  return Math.round(Math.min(100, Math.max(0, score)));
}

/**
 * Get engagement tier from score
 */
export function getEngagementTier(score: number): EngagementTierInfo {
  if (score >= ENGAGEMENT_TIERS.master.minScore) {
    return ENGAGEMENT_TIERS.master;
  }
  if (score >= ENGAGEMENT_TIERS.expert.minScore) {
    return ENGAGEMENT_TIERS.expert;
  }
  if (score >= ENGAGEMENT_TIERS.practitioner.minScore) {
    return ENGAGEMENT_TIERS.practitioner;
  }
  if (score >= ENGAGEMENT_TIERS.explorer.minScore) {
    return ENGAGEMENT_TIERS.explorer;
  }
  return ENGAGEMENT_TIERS.beginner;
}

/**
 * Get next tier info (for motivation)
 */
export function getNextTier(
  currentTier: EngagementTier
): EngagementTierInfo | null {
  const tiers: EngagementTier[] = [
    "beginner",
    "explorer",
    "practitioner",
    "expert",
    "master",
  ];
  const currentIndex = tiers.indexOf(currentTier);
  if (currentIndex === -1 || currentIndex === tiers.length - 1) {
    return null;
  }
  return ENGAGEMENT_TIERS[tiers[currentIndex + 1]];
}

/**
 * Calculate points needed to reach next tier
 */
export function getPointsToNextTier(currentScore: number): number {
  const tier = getEngagementTier(currentScore);
  const nextTier = getNextTier(tier.id);
  if (!nextTier) {
    return 0;
  }
  return Math.max(0, nextTier.minScore - currentScore);
}
