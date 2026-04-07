/**
 * Progress Tracker Hook
 *
 * Automatically tracks page visits and section completion
 * based on scroll position and time spent.
 */

"use client";

import { useLearningProgressOptional } from "@client/contexts/LearningProgressContext";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

interface UseProgressTrackerOptions {
  chapter: "LAYERS" | "AGENTS" | "FRAMEWORK" | "TOOLKIT";
  sectionId?: string;
  progressIncrement?: number; // How much to increment chapter progress (0-100)
}

/**
 * Hook to automatically track progress when viewing content
 */
export function useProgressTracker(options: UseProgressTrackerOptions) {
  const { chapter, sectionId, progressIncrement = 5 } = options;
  const _pathname = usePathname();
  const progressCtx = useLearningProgressOptional();
  const hasTracked = useRef(false);
  const scrollThresholdMet = useRef(false);

  const trackProgress = useCallback(async () => {
    if (!progressCtx || hasTracked.current) {
      return;
    }

    const { getChapterProgress, updateChapterProgress, completeSection } =
      progressCtx;
    const currentProgress = getChapterProgress(chapter);

    // Only increment if we haven't already maxed out this section's contribution
    if (currentProgress < 100) {
      const newProgress = Math.min(100, currentProgress + progressIncrement);
      try {
        await updateChapterProgress(chapter, newProgress);
      } catch (error) {
        console.error("Failed to update chapter progress:", error);
      }
    }

    // Mark section as completed if provided
    if (sectionId) {
      try {
        await completeSection(sectionId);
      } catch (error) {
        console.error("Failed to complete section:", error);
      }
    }

    hasTracked.current = true;
  }, [progressCtx, chapter, sectionId, progressIncrement]);

  // Track when user scrolls past 50% of the page (debounced)
  useEffect(() => {
    if (!progressCtx) {
      return;
    }

    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      if (scrollThresholdMet.current) {
        return;
      }

      // Debounce scroll handling for performance
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 1;

        if (scrollPercent >= 0.5) {
          scrollThresholdMet.current = true;
          trackProgress();
        }
      }, 100); // 100ms debounce
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Also track if page is short (no scroll needed)
    const timer = setTimeout(() => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight < 100) {
        trackProgress();
      }
    }, 3000); // After 3 seconds on short pages

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [progressCtx, trackProgress]);

  // Reset tracking when pathname changes
  useEffect(() => {
    hasTracked.current = false;
    scrollThresholdMet.current = false;
  }, []);

  return {
    trackProgress, // Manual trigger if needed
    hasTracked: hasTracked.current,
  };
}

/**
 * Hook to track framework step progress
 */
export function useStepProgressTracker(stepId: string) {
  const progressCtx = useLearningProgressOptional();
  const hasTracked = useRef(false);

  const trackStep = useCallback(
    async (progress: number) => {
      if (!progressCtx || hasTracked.current) {
        return;
      }

      try {
        await progressCtx.updateStepProgress(stepId, progress);
        hasTracked.current = true;
      } catch (error) {
        console.error("Failed to update step progress:", error);
      }
    },
    [progressCtx, stepId]
  );

  const completeStep = useCallback(async () => {
    await trackStep(100);
  }, [trackStep]);

  return {
    trackStep,
    completeStep,
    hasTracked: hasTracked.current,
  };
}

export default useProgressTracker;
