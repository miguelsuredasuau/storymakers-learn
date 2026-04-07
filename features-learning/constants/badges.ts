/**
 * Centralized Badge Definitions
 *
 * Single source of truth for all badge metadata.
 * Used by: DynamicIslandExpanded, ProgressDashboard, Celebration, learning router
 */

import {
  Award,
  BookOpen,
  Flame,
  Layers,
  ListOrdered,
  type LucideIcon,
  Rocket,
  Target,
  Trophy,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { BRAND } from "@/features/method/constants";

// Badge category types
export type BadgeCategory = "chapter" | "milestone" | "streak" | "capstone";

// Badge definition interface
export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  celebrationTitle: string;
  celebrationMessage: string;
  icon: LucideIcon;
  color: string;
  category: BadgeCategory;
}

/**
 * All badge definitions - matches BadgeType enum in Prisma schema
 */
export const BADGES: Record<string, BadgeDefinition> = {
  // Chapter Completion Badges
  LAYERS_COMPLETE: {
    id: "LAYERS_COMPLETE",
    name: "Layer Master",
    description: "Completed the Layers chapter",
    celebrationTitle: "Chapter Complete!",
    celebrationMessage: "You've mastered the art of Blocks, Loops & Slides",
    icon: Layers,
    color: BRAND.navy,
    category: "chapter",
  },
  AGENTS_COMPLETE: {
    id: "AGENTS_COMPLETE",
    name: "Agent Expert",
    description: "Completed the Agents chapter",
    celebrationTitle: "Chapter Complete!",
    celebrationMessage: "You've mastered the Architect, Storyteller & Designer",
    icon: Users,
    color: BRAND.coral,
    category: "chapter",
  },
  FRAMEWORK_COMPLETE: {
    id: "FRAMEWORK_COMPLETE",
    name: "Framework Pro",
    description: "Completed the 10-Step Framework",
    celebrationTitle: "Chapter Complete!",
    celebrationMessage: "You've mastered the complete presentation framework",
    icon: ListOrdered,
    color: BRAND.teal,
    category: "chapter",
  },
  TOOLKIT_COMPLETE: {
    id: "TOOLKIT_COMPLETE",
    name: "Toolkit Guru",
    description: "Completed the Toolkit chapter",
    celebrationTitle: "Chapter Complete!",
    celebrationMessage: "You've mastered SCQA, Pyramid, Sparklines & more",
    icon: Wrench,
    color: BRAND.tealDark,
    category: "chapter",
  },

  // Milestone Badges
  FIRST_STEPS: {
    id: "FIRST_STEPS",
    name: "First Steps",
    description: "Started your learning journey",
    celebrationTitle: "Welcome!",
    celebrationMessage: "You've taken the first step on your learning journey",
    icon: BookOpen,
    color: BRAND.teal,
    category: "milestone",
  },
  ARC_MASTER: {
    id: "ARC_MASTER",
    name: "Arc Master",
    description: "Used the Story Arc Matrix",
    celebrationTitle: "Arc Master!",
    celebrationMessage: "You've discovered the power of story arc selection",
    icon: Target,
    color: BRAND.coral,
    category: "milestone",
  },
  LOOP_SCHOLAR: {
    id: "LOOP_SCHOLAR",
    name: "Loop Scholar",
    description: "Explored 20+ narrative loops",
    celebrationTitle: "Loop Scholar!",
    celebrationMessage: "You've mastered the art of narrative structures",
    icon: Zap,
    color: BRAND.tealDark,
    category: "milestone",
  },
  FRAMEWORK_GRADUATE: {
    id: "FRAMEWORK_GRADUATE",
    name: "Framework Graduate",
    description: "Completed all 10 framework steps",
    celebrationTitle: "Framework Graduate!",
    celebrationMessage: "You've completed the entire 10-step journey",
    icon: Award,
    color: BRAND.navy,
    category: "milestone",
  },

  // Streak Badges
  STREAK_3_DAYS: {
    id: "STREAK_3_DAYS",
    name: "Warming Up",
    description: "3 consecutive days of learning",
    celebrationTitle: "Streak Started!",
    celebrationMessage: "3 days of consistent learning - keep it up!",
    icon: Flame,
    color: BRAND.coral,
    category: "streak",
  },
  STREAK_7_DAYS: {
    id: "STREAK_7_DAYS",
    name: "On Fire",
    description: "7 consecutive days of learning",
    celebrationTitle: "On Fire!",
    celebrationMessage: "7 days of dedication - you're unstoppable!",
    icon: Flame,
    color: BRAND.coral,
    category: "streak",
  },
  STREAK_30_DAYS: {
    id: "STREAK_30_DAYS",
    name: "Legendary",
    description: "30 consecutive days of learning",
    celebrationTitle: "Legendary!",
    celebrationMessage: "30 days of commitment - you're truly legendary!",
    icon: Flame,
    color: BRAND.coral,
    category: "streak",
  },

  // Capstone Badges
  CAPSTONE_COMPLETE: {
    id: "CAPSTONE_COMPLETE",
    name: "Capstone Champion",
    description: "Completed the capstone project",
    celebrationTitle: "Capstone Complete!",
    celebrationMessage:
      "You've applied everything you learned to a real project",
    icon: Rocket,
    color: BRAND.teal,
    category: "capstone",
  },
  MASTER_CERTIFIED: {
    id: "MASTER_CERTIFIED",
    name: "Storymaker Certified",
    description: "Earned the Storymakers Method certification",
    celebrationTitle: "Certified!",
    celebrationMessage: "You are now a certified Storymaker!",
    icon: Trophy,
    color: BRAND.navy,
    category: "capstone",
  },

  // Legacy/alias for first visit (some code uses FIRST_VISIT)
  FIRST_VISIT: {
    id: "FIRST_VISIT",
    name: "First Steps",
    description: "Started your learning journey",
    celebrationTitle: "Welcome!",
    celebrationMessage: "You've taken the first step on your learning journey",
    icon: BookOpen,
    color: BRAND.teal,
    category: "milestone",
  },

  // All chapters complete badge
  ALL_CHAPTERS_COMPLETE: {
    id: "ALL_CHAPTERS_COMPLETE",
    name: "Method Master",
    description: "Completed all chapters",
    celebrationTitle: "Method Master!",
    celebrationMessage: "You've completed the entire Storymakers Method!",
    icon: Trophy,
    color: BRAND.navy,
    category: "capstone",
  },
} as const;

/**
 * Get badge info by type
 */
export function getBadgeInfo(badgeType: string): BadgeDefinition {
  return (
    BADGES[badgeType] ?? {
      id: badgeType,
      name: badgeType,
      description: "Achievement unlocked",
      celebrationTitle: "Achievement Unlocked!",
      celebrationMessage: "You've earned a new badge",
      icon: Trophy,
      color: BRAND.teal,
      category: "milestone" as BadgeCategory,
    }
  );
}

/**
 * Get badge color based on category
 */
export function getBadgeColor(badgeType: string): string {
  const badge = BADGES[badgeType];
  if (!badge) {
    return BRAND.teal;
  }

  switch (badge.category) {
    case "chapter":
      return badge.color;
    case "streak":
      return BRAND.coral;
    case "capstone":
      return BRAND.navy;
    default:
      return BRAND.teal;
  }
}

/**
 * Get badges by category
 */
export function getBadgesByCategory(
  category: BadgeCategory
): BadgeDefinition[] {
  return Object.values(BADGES).filter((badge) => badge.category === category);
}

/**
 * All badge types as array (for validation)
 */
export const BADGE_TYPES = Object.keys(BADGES);
