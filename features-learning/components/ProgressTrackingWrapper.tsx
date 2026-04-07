/**
 * Progress Tracking Wrapper
 *
 * Automatically tracks chapter progress based on the current route
 * and scroll position. Add this to the method layout to enable
 * automatic progress tracking across all method pages.
 *
 * Disabled in flat dev mode (NEXT_PUBLIC_DEV_FLAT_MODE=true)
 */

"use client";

import { useLearningProgressOptional } from "@client/contexts/LearningProgressContext";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";

// Check if flat development mode is enabled - skip tracking in dev mode
const IS_FLAT_MODE =
  process.env.NEXT_PUBLIC_DEV_FLAT_MODE === "true" &&
  process.env.NODE_ENV !== "production";

interface ProgressTrackingWrapperProps {
  children: React.ReactNode;
}

// Map routes to chapters
function getChapterFromPath(
  pathname: string
): "LAYERS" | "AGENTS" | "FRAMEWORK" | "TOOLKIT" | null {
  if (pathname.startsWith("/method/layers")) {
    return "LAYERS";
  }
  if (pathname.startsWith("/method/agents")) {
    return "AGENTS";
  }
  if (pathname.startsWith("/method/workers")) {
    return "AGENTS"; // Workers is part of agents
  }
  if (pathname.startsWith("/method/framework")) {
    return "FRAMEWORK";
  }
  if (pathname.startsWith("/method/toolkit")) {
    return "TOOLKIT";
  }
  return null;
}

// Get section ID from pathname for more granular tracking
function getSectionIdFromPath(pathname: string): string {
  // Remove /method/ prefix and convert to section ID
  const sectionPath = pathname.replace(/^\/method\//, "").replace(/\//g, "-");
  return sectionPath || "home";
}

export function ProgressTrackingWrapper({
  children,
}: ProgressTrackingWrapperProps) {
  const pathname = usePathname();
  const progressCtx = useLearningProgressOptional();

  // Track whether we've already tracked progress for this page visit
  const hasTracked = useRef(false);
  const scrollThresholdMet = useRef(false);

  // Get the chapter for current route
  const chapter = useMemo(() => getChapterFromPath(pathname ?? ""), [pathname]);
  const sectionId = useMemo(
    () => getSectionIdFromPath(pathname ?? ""),
    [pathname]
  );

  // Reset tracking when pathname changes
  useEffect(() => {
    hasTracked.current = false;
    scrollThresholdMet.current = false;
  }, []);

  // Track progress function
  const trackProgress = useCallback(async () => {
    // Skip tracking in flat dev mode
    if (IS_FLAT_MODE) {
      return;
    }
    if (!(progressCtx && chapter) || hasTracked.current) {
      return;
    }

    const { getChapterProgress, updateChapterProgress, completeSection } =
      progressCtx;
    const currentProgress = getChapterProgress(chapter);

    // Increment progress by a small amount (5%) per page
    if (currentProgress < 100) {
      const newProgress = Math.min(100, currentProgress + 5);
      try {
        await updateChapterProgress(chapter, newProgress);
      } catch {
        // Silently fail - progress tracking is not critical
      }
    }

    // Mark section as completed
    if (sectionId) {
      try {
        await completeSection(sectionId);
      } catch {
        // Silently fail
      }
    }

    hasTracked.current = true;
  }, [progressCtx, chapter, sectionId]);

  // Track when user scrolls past 50% of the page
  useEffect(() => {
    // Skip tracking in flat dev mode
    if (IS_FLAT_MODE) {
      return;
    }
    if (!(progressCtx && chapter)) {
      return;
    }

    const handleScroll = () => {
      if (scrollThresholdMet.current || hasTracked.current) {
        return;
      }

      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 1;

      if (scrollPercent >= 0.5) {
        scrollThresholdMet.current = true;
        trackProgress();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // For short pages (no scroll needed), track after a brief delay
    const timer = setTimeout(() => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight < 100 && !hasTracked.current) {
        trackProgress();
      }
    }, 3000); // 3 seconds on short pages

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [progressCtx, chapter, trackProgress]);

  return <>{children}</>;
}

export default ProgressTrackingWrapper;
