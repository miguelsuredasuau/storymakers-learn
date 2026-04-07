/**
 * Learning Recommendations
 *
 * Provides personalized learning suggestions based on user progress,
 * engagement score, and learning patterns.
 */

"use client";

import { useLearningProgressOptional } from "@client/contexts/LearningProgressContext";
import { cn } from "@client/utils";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Flame,
  Lightbulb,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { fg } from "@/lib/design-system";
import {
  CHAPTERS_CONFIG,
  type ChapterId,
  calculateEngagementScore,
  getEngagementTier,
} from "../constants";

// Color token set for recommendations and engagement tiers
const REC_COLOR_TOKENS = {
  teal: {
    bg: "bg-brand-accent/10",
    bgIcon: "bg-brand-accent/10",
    text: "text-brand-accent",
  },
  coral: {
    bg: "bg-brand-coral/10",
    bgIcon: "bg-brand-coral/10",
    text: "text-brand-coral",
  },
  tealDark: {
    bg: "bg-brand-mid/10",
    bgIcon: "bg-brand-mid/10",
    text: "text-brand-mid",
  },
  navy: {
    bg: "bg-brand-dark/10",
    bgIcon: "bg-brand-dark/10",
    text: "text-brand-dark",
  },
  slate: {
    bg: "bg-slate-400/10",
    bgIcon: "bg-slate-400/20",
    text: "text-slate-500",
  },
  gold: {
    bg: "bg-yellow-500/10",
    bgIcon: "bg-yellow-500/20",
    text: "text-yellow-600",
  },
} as const;

type ColorKey = keyof typeof REC_COLOR_TOKENS;

// Recommendation types (unlock_chapter removed - all chapters are accessible)
type RecommendationType =
  | "continue_chapter"
  | "start_quiz"
  | "build_streak"
  | "explore_toolkit"
  | "complete_step"
  | "review_content";

interface Recommendation {
  type: RecommendationType;
  title: string;
  description: string;
  href: string;
  priority: number; // 1-10, higher = more important
  icon: typeof BookOpen;
  colorKey: ColorKey;
}

// Map engagement tier colors to token keys
function engagementTierColorKey(tierColor: string): ColorKey {
  if (tierColor === "#94a3b8") {
    return "slate";
  }
  if (tierColor === "#eab308") {
    return "gold";
  }
  // BRAND hex values
  if (tierColor === "#82c4cb") {
    return "teal";
  }
  if (tierColor === "#f56551") {
    return "coral";
  }
  if (tierColor === "#10303A" || tierColor === "#10303a") {
    return "navy";
  }
  if (tierColor === "#5aa0a8") {
    return "tealDark";
  }
  return "teal";
}

/**
 * Generate personalized recommendations based on user progress
 * Note: All chapters are now always accessible (no unlock gating)
 */
function generateRecommendations(progress: {
  overallProgress: number;
  currentStreak: number;
  badges: { badgeType: string }[];
  chapters: Array<{
    id: string;
    progress: number;
  }>;
  stepProgress: Record<string, number>;
  totalTimeSpent: number;
  avgQuizScore?: number;
}): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // Find current chapter (in progress)
  const currentChapter = progress.chapters.find(
    (c) => c.progress > 0 && c.progress < 100
  );

  // Find first unstarted chapter
  const unstartedChapter = progress.chapters.find((c) => c.progress === 0);

  // 1. Continue current chapter (highest priority if in progress)
  if (currentChapter) {
    const config = CHAPTERS_CONFIG[currentChapter.id as ChapterId];
    recommendations.push({
      type: "continue_chapter",
      title: `Continue ${config?.title || currentChapter.id}`,
      description: `You're ${currentChapter.progress}% through. Keep the momentum!`,
      href: config?.href || `/method/${currentChapter.id.toLowerCase()}`,
      priority: 10,
      icon: BookOpen,
      colorKey: "teal",
    });
  }

  // 2. Start new chapter
  if (unstartedChapter) {
    const config = CHAPTERS_CONFIG[unstartedChapter.id as ChapterId];
    recommendations.push({
      type: "continue_chapter",
      title: `Start ${config?.title || unstartedChapter.id}`,
      description: "Ready to learn something new!",
      href: config?.href || `/method/${unstartedChapter.id.toLowerCase()}`,
      priority: unstartedChapter.id === "LAYERS" ? 9 : 6,
      icon: Sparkles,
      colorKey: "coral",
    });
  }

  // 3. Build streak (if streak is low or at risk)
  if (progress.currentStreak === 0) {
    recommendations.push({
      type: "build_streak",
      title: "Start Your Streak",
      description: "Learn daily to build your streak and earn badges!",
      href: currentChapter
        ? CHAPTERS_CONFIG[currentChapter.id as ChapterId]?.href || "/method"
        : "/method/layers",
      priority: 5,
      icon: Flame,
      colorKey: "coral",
    });
  } else if (progress.currentStreak < 3) {
    recommendations.push({
      type: "build_streak",
      title: "Keep Your Streak Alive!",
      description: `${progress.currentStreak} day${progress.currentStreak !== 1 ? "s" : ""} - reach 3 for a badge!`,
      href: currentChapter
        ? CHAPTERS_CONFIG[currentChapter.id as ChapterId]?.href || "/method"
        : "/method/layers",
      priority: 6,
      icon: Flame,
      colorKey: "coral",
    });
  }

  // 4. Explore toolkit (if Framework is progressing)
  const frameworkProgress = progress.chapters.find((c) => c.id === "FRAMEWORK");
  const toolkitChapter = progress.chapters.find((c) => c.id === "TOOLKIT");
  if (
    toolkitChapter &&
    frameworkProgress &&
    frameworkProgress.progress >= 50 &&
    toolkitChapter.progress < 50
  ) {
    recommendations.push({
      type: "explore_toolkit",
      title: "Explore the Toolkit",
      description: "Apply what you've learned with practical tools",
      href: "/method/toolkit",
      priority: 4,
      icon: Lightbulb,
      colorKey: "tealDark",
    });
  }

  // 5. Complete specific steps (for Framework chapter)
  if (
    frameworkProgress &&
    frameworkProgress.progress > 0 &&
    frameworkProgress.progress < 100
  ) {
    // Find first incomplete step
    for (let i = 0; i <= 9; i++) {
      const stepProgress = progress.stepProgress[String(i)] || 0;
      if (stepProgress < 100) {
        recommendations.push({
          type: "complete_step",
          title: `Complete Step ${i}`,
          description:
            stepProgress > 0
              ? `${100 - stepProgress}% left to finish`
              : "Start this step",
          href: `/method/framework/step-${i}`,
          priority: 5,
          icon: Clock,
          colorKey: "teal",
        });
        break; // Only recommend one step at a time
      }
    }
  }

  // Sort by priority (highest first) and return top 3
  return recommendations.sort((a, b) => b.priority - a.priority).slice(0, 3);
}

interface LearningRecommendationsProps {
  /** Maximum number of recommendations to show */
  maxRecommendations?: number;
  /** Show engagement score summary */
  showEngagementScore?: boolean;
  /** Compact mode for smaller displays */
  compact?: boolean;
}

export function LearningRecommendations({
  maxRecommendations = 3,
  showEngagementScore = false,
  compact = false,
}: LearningRecommendationsProps) {
  const progress = useLearningProgressOptional();

  const { recommendations, engagementScore, engagementTier } = useMemo(() => {
    if (!progress || progress.loading || !progress.progress) {
      return { recommendations: [], engagementScore: 0, engagementTier: null };
    }

    const chapters = progress.progress.chapters.map((c) => ({
      id: c.id,
      progress: c.progress,
    }));

    const stepProgress = (progress.progress.stepProgress || {}) as Record<
      string,
      number
    >;

    const recs = generateRecommendations({
      overallProgress: progress.overallProgress,
      currentStreak: progress.currentStreak,
      badges: progress.badges,
      chapters,
      stepProgress,
      totalTimeSpent: progress.progress.totalTimeSpent || 0,
    });

    // Calculate engagement score
    const score = calculateEngagementScore({
      overallProgress: progress.overallProgress,
      avgQuizScore: progress.progress.avgQuizScore || 0,
      currentStreak: progress.currentStreak,
      totalTimeSpent: progress.progress.totalTimeSpent || 0,
      badgeCount: progress.badges.length,
    });

    return {
      recommendations: recs.slice(0, maxRecommendations),
      engagementScore: score,
      engagementTier: getEngagementTier(score),
    };
  }, [progress, maxRecommendations]);

  if (!progress || progress.loading) {
    return null;
  }

  if (recommendations.length === 0) {
    return null;
  }

  const tierTokens = engagementTier
    ? REC_COLOR_TOKENS[engagementTierColorKey(engagementTier.color)]
    : null;

  return (
    <div className="space-y-4">
      {/* Engagement Score Summary */}
      {showEngagementScore && engagementTier && tierTokens && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "flex items-center justify-between rounded-xl p-4",
            tierTokens.bg
          )}
          initial={{ opacity: 0, y: -10 }}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full",
                tierTokens.bgIcon
              )}
            >
              <TrendingUp className={cn("h-5 w-5", tierTokens.text)} />
            </div>
            <div>
              <p className={cn("font-medium text-sm", fg.brandDark)}>
                {engagementTier.name}
              </p>
              <p className="text-muted-foreground text-xs">
                {engagementTier.description}
              </p>
            </div>
          </div>
          <div className={cn("font-bold text-2xl", tierTokens.text)}>
            {engagementScore}
          </div>
        </motion.div>
      )}

      {/* Recommendations Header */}
      <div className="flex items-center gap-2">
        <Lightbulb className={cn("h-4 w-4", fg.brandAccent)} />
        <h3 className={cn("font-semibold text-sm", fg.brandDark)}>
          Recommended for You
        </h3>
      </div>

      {/* Recommendation Cards */}
      <div
        className={`space-y-3 ${compact ? "" : "grid gap-4 md:grid-cols-3 md:space-y-0"}`}
      >
        {recommendations.map((rec, index) => {
          const Icon = rec.icon;
          const tokens = REC_COLOR_TOKENS[rec.colorKey];
          return (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 10 }}
              key={rec.type + rec.title}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={rec.href}>
                <motion.div
                  className="group flex items-center gap-3 rounded-xl border border-black/[0.08] bg-white p-4 transition-all hover:border-transparent hover:shadow-md"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl",
                      tokens.bgIcon
                    )}
                  >
                    <Icon className={cn("h-5 w-5", tokens.text)} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "truncate font-medium text-sm",
                        fg.brandDark
                      )}
                    >
                      {rec.title}
                    </p>
                    <p className="truncate text-muted-foreground text-xs">
                      {rec.description}
                    </p>
                  </div>
                  <ArrowRight
                    className={cn(
                      "h-4 w-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100",
                      tokens.text
                    )}
                  />
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default LearningRecommendations;
