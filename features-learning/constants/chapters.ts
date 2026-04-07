/**
 * Chapter Configuration & Unlock Requirements
 *
 * Single source of truth for chapter unlock logic.
 * Used by: ChapterGate, LearningProgressContext, learning router, MethodPrinciples
 */

import {
  Layers,
  ListOrdered,
  type LucideIcon,
  Users,
  Wrench,
} from "lucide-react";
import { BRAND } from "@/features/method/constants";

// Chapter IDs - matches Prisma ChapterType enum
export type ChapterId = "LAYERS" | "AGENTS" | "FRAMEWORK" | "TOOLKIT";

// Unlock requirement types
export type UnlockRequirementType =
  | "none" // Always unlocked
  | "progress" // Requires X% progress in prerequisite chapter
  | "quiz" // Requires passing quiz in prerequisite chapter
  | "step"; // Requires completing specific step

export interface UnlockRequirement {
  type: UnlockRequirementType;
  prerequisiteChapter?: ChapterId;
  requiredProgress?: number; // For 'progress' type: 0-100
  requiredStep?: string; // For 'step' type: step number
  hint: string; // User-facing unlock hint text
  actionLabel: string;
  actionHref: string;
}

export interface ChapterConfig {
  id: ChapterId;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  unlockRequirement: UnlockRequirement;
  // Progress thresholds for this chapter
  progressWeightInOverall: number; // 0-1, how much this contributes to overall progress
  totalSections: number; // For progress calculation
}

/**
 * Chapter configurations with unlock requirements
 */
export const CHAPTERS_CONFIG: Record<ChapterId, ChapterConfig> = {
  LAYERS: {
    id: "LAYERS",
    order: 1,
    title: "The 3 Layers",
    subtitle: "Blocks, Loops & Slides",
    description:
      "Understand the three levels of abstraction that make every presentation structurally sound and easy to navigate.",
    href: "/method/layers",
    icon: Layers,
    color: BRAND.navy,
    bgColor: `${BRAND.navy}08`,
    unlockRequirement: {
      type: "none",
      hint: "This chapter is always available.",
      actionLabel: "Start Learning",
      actionHref: "/method/layers",
    },
    progressWeightInOverall: 0.2,
    totalSections: 21, // From navigation structure
  },
  AGENTS: {
    id: "AGENTS",
    order: 2,
    title: "The 3 Agents",
    subtitle: "Architect, Storyteller & Designer",
    description:
      "Three AI perspectives that ensure your presentation is logical, emotionally resonant, and visually clear.",
    href: "/method/agents",
    icon: Users,
    color: BRAND.coral,
    bgColor: `${BRAND.coral}08`,
    unlockRequirement: {
      type: "none",
      hint: "This chapter is always available.",
      actionLabel: "Start Learning",
      actionHref: "/method/agents",
    },
    progressWeightInOverall: 0.2,
    totalSections: 20,
  },
  FRAMEWORK: {
    id: "FRAMEWORK",
    order: 3,
    title: "The 10-Step Framework",
    subtitle: "From Strategy to Slides",
    description:
      "The complete process: Launchpad + 9 disciplines across our 3×3 matrix. A systematic path to compelling presentations.",
    href: "/method/framework",
    icon: ListOrdered,
    color: BRAND.teal,
    bgColor: `${BRAND.teal}15`,
    unlockRequirement: {
      type: "none",
      hint: "This chapter is always available.",
      actionLabel: "Start Learning",
      actionHref: "/method/framework",
    },
    progressWeightInOverall: 0.4, // Heaviest chapter
    totalSections: 14,
  },
  TOOLKIT: {
    id: "TOOLKIT",
    order: 4,
    title: "The Toolkit",
    subtitle: "SCQA, Pyramid, Sparklines & More",
    description:
      "The proven frameworks and methodologies that power each step. Reference guides for every tool in your arsenal.",
    href: "/method/toolkit",
    icon: Wrench,
    color: BRAND.tealDark,
    bgColor: `${BRAND.teal}10`,
    unlockRequirement: {
      type: "none",
      hint: "This chapter is always available.",
      actionLabel: "Start Learning",
      actionHref: "/method/toolkit",
    },
    progressWeightInOverall: 0.2,
    totalSections: 2,
  },
} as const;

/**
 * Get chapters in order
 */
export function getChaptersInOrder(): ChapterConfig[] {
  return Object.values(CHAPTERS_CONFIG).sort((a, b) => a.order - b.order);
}

/**
 * Get chapter by ID
 */
export function getChapterConfig(chapterId: ChapterId): ChapterConfig {
  return CHAPTERS_CONFIG[chapterId];
}

/**
 * Get prerequisite chapter
 */
export function getPrerequisiteChapter(chapterId: ChapterId): ChapterId | null {
  const config = CHAPTERS_CONFIG[chapterId];
  return config.unlockRequirement.prerequisiteChapter ?? null;
}

/**
 * Calculate overall progress from chapter progress values
 */
export function calculateOverallProgress(
  chapterProgress: Record<ChapterId, number>
): number {
  let total = 0;
  for (const chapter of Object.values(CHAPTERS_CONFIG)) {
    const progress = chapterProgress[chapter.id] ?? 0;
    total += progress * chapter.progressWeightInOverall;
  }
  return Math.round(total);
}

/**
 * Chapter order as array
 */
export const CHAPTER_ORDER: ChapterId[] = [
  "LAYERS",
  "AGENTS",
  "FRAMEWORK",
  "TOOLKIT",
];

/**
 * Check if a chapter should be unlocked based on progress data
 *
 * @param chapterId - The chapter to check
 * @param chapterProgress - Progress values for all chapters (0-100)
 * @param quizResults - Record of chapterId -> passed (boolean)
 * @param stepProgress - Record of stepId -> progress (0-100)
 */
export function isChapterUnlocked(
  chapterId: ChapterId,
  chapterProgress: Record<ChapterId, number>,
  quizResults: Record<string, boolean>,
  stepProgress: Record<string, number>
): boolean {
  const config = CHAPTERS_CONFIG[chapterId];
  const { unlockRequirement } = config;

  switch (unlockRequirement.type) {
    case "none":
      return true;

    case "progress": {
      if (!unlockRequirement.prerequisiteChapter) {
        return true;
      }
      const prereqProgress =
        chapterProgress[unlockRequirement.prerequisiteChapter] ?? 0;
      return prereqProgress >= (unlockRequirement.requiredProgress ?? 0);
    }

    case "quiz": {
      if (!unlockRequirement.prerequisiteChapter) {
        return true;
      }
      return quizResults[unlockRequirement.prerequisiteChapter] === true;
    }

    case "step": {
      if (!unlockRequirement.requiredStep) {
        return true;
      }
      const stepProg = stepProgress[unlockRequirement.requiredStep] ?? 0;
      return stepProg >= 100;
    }

    default:
      return true;
  }
}

/**
 * Get unlock hint text for a chapter
 */
export function getUnlockHint(chapterId: ChapterId): string | null {
  const config = CHAPTERS_CONFIG[chapterId];
  if (config.unlockRequirement.type === "none") {
    return null;
  }
  return config.unlockRequirement.hint;
}
