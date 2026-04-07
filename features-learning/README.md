# Learning

Interactive learning system for the Storymakers presentation methodology. Provides progress tracking, exercises (multiple-choice, true/false, reflection), chapter gating, badges, engagement scoring, and PDF certificate generation.

## Structure

```
learning/
├── index.ts                           # Barrel exports
├── components/
│   ├── ChapterGate.tsx                # Gate component + useChapterAccess hook
│   ├── Exercise.tsx                   # Renders exercises by type (MC, T/F, reflection)
│   ├── KeyTakeaways.tsx               # Chapter summary cards (per-chapter constants)
│   ├── LearningRecommendations.tsx    # Personalized next-step suggestions
│   ├── ProgressTrackingWrapper.tsx    # Wraps pages with auto-progress tracking
│   └── StepProgressIndicator.tsx      # StepProgressDots, StepProgressIndicator, StepProgressSummary
├── hooks/
│   └── useProgressTracker.ts          # Auto-tracks page visits + scroll depth
├── data/
│   └── exercises.ts                   # All exercise definitions by chapter/step
├── constants/
│   ├── badges.ts                      # Badge definitions (chapter, milestone, streak, capstone)
│   ├── chapters.ts                    # Chapter config, unlock requirements, prerequisites
│   ├── engagement.ts                  # Engagement tiers (beginner..master), scoring formula
│   └── index.ts                       # Barrel re-exports
└── utils/
    └── generateCertificate.ts         # PDF certificate generation via jsPDF
```

## Public API

```typescript
// Components
export { ChapterGate, useChapterAccess } from "./components/ChapterGate";
export { Exercise, type ExerciseProps, type ExerciseType } from "./components/Exercise";
export { KeyTakeaways, FRAMEWORK_TAKEAWAYS, LAYERS_TAKEAWAYS, AGENTS_TAKEAWAYS, TOOLKIT_TAKEAWAYS } from "./components/KeyTakeaways";
export { LearningRecommendations } from "./components/LearningRecommendations";
export { ProgressTrackingWrapper } from "./components/ProgressTrackingWrapper";
export { StepProgressDots, StepProgressIndicator, StepProgressSummary } from "./components/StepProgressIndicator";

// Hooks
export { useProgressTracker, useStepProgressTracker } from "./hooks/useProgressTracker";

// Exercise data
export { ALL_EXERCISES, FRAMEWORK_EXERCISES, LAYERS_EXERCISES, AGENTS_EXERCISES, TOOLKIT_EXERCISES } from "./data/exercises";
export { getExercisesByChapter, getExercisesByStep } from "./data/exercises";

// Constants
export { BADGES, BADGE_TYPES, getBadgeInfo, type BadgeDefinition } from "./constants";
export { CHAPTERS_CONFIG, CHAPTER_ORDER, isChapterUnlocked, type ChapterId } from "./constants";
export { getEngagementTier, calculateEngagementScore, type EngagementTier } from "./constants";
```

## Data Layer

**Prisma models:** `UserProgress`, `BadgeAward`, `ExerciseAttempt` (via learning tRPC)

**tRPC router:** `learning` (`lib/trpc/routers/learning.ts`)
- Chapter progress read/write
- Section completion tracking
- Badge awards
- Exercise attempt recording

## Shared Infrastructure

| Dependency | Interface | Notes |
|---|---|---|
| `lib/contexts/LearningProgressContext` | `useLearningProgressOptional()` | Provides progress state to hooks |
| `features/method/constants` | `BRAND` colors | Badge and tier color definitions |
| `jsPDF` | `new jsPDF()` | Certificate PDF generation |
| `lucide-react` | Icon components | Badge icons (Award, Trophy, Flame, etc.) |

## Reuse Notes

To extract standalone, replace:
- tRPC learning router with your own progress persistence API
- `LearningProgressContext` with your own state provider
- `BRAND` import with local color constants
- Chapter IDs (`LAYERS`, `AGENTS`, `FRAMEWORK`, `TOOLKIT`) are hardcoded throughout
