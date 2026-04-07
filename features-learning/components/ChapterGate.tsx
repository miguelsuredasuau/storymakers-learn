/**
 * Chapter Gate Component
 *
 * Previously used to gate chapter access based on progress and subscriptions.
 * Now simplified to always allow access - all chapters are unlocked.
 */

"use client";

import type { ChapterId } from "../constants";

interface ChapterGateProps {
  chapter: ChapterId;
  children: React.ReactNode;
  /** Kept for backwards compatibility but no longer used */
  showPreview?: boolean;
}

export function ChapterGate({ children }: ChapterGateProps) {
  // All chapters are now always accessible - no gating
  return <>{children}</>;
}

/**
 * Hook to check if current user can access a chapter
 * Now always returns unlocked/accessible
 */
export function useChapterAccess(_chapter: ChapterId) {
  return {
    isUnlocked: true,
    loading: false,
    progress: 0,
    hasSubscription: true,
  };
}

export default ChapterGate;
