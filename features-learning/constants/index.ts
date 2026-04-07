/**
 * Learning Constants - Central exports
 */

// Badge definitions
export {
  BADGE_TYPES,
  BADGES,
  type BadgeCategory,
  type BadgeDefinition,
  getBadgeColor,
  getBadgeInfo,
  getBadgesByCategory,
} from "./badges";

// Chapter configuration
export {
  CHAPTER_ORDER,
  CHAPTERS_CONFIG,
  type ChapterConfig,
  type ChapterId,
  calculateOverallProgress,
  getChapterConfig,
  getChaptersInOrder,
  getPrerequisiteChapter,
  getUnlockHint,
  isChapterUnlocked,
  type UnlockRequirement,
  type UnlockRequirementType,
} from "./chapters";

// Engagement scoring (will be added)
export {
  calculateEngagementScore,
  type EngagementScoreInput,
  type EngagementTier,
  getEngagementTier,
} from "./engagement";
