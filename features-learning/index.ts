/**
 * Learning Features
 *
 * Progress tracking, engagement, and gamification components
 */

export { ChapterGate, useChapterAccess } from "./components/ChapterGate";
export {
  Exercise,
  type ExerciseProps,
  type ExerciseType,
} from "./components/Exercise";
export {
  AGENTS_TAKEAWAYS,
  FRAMEWORK_TAKEAWAYS,
  KeyTakeaways,
  LAYERS_TAKEAWAYS,
  TOOLKIT_TAKEAWAYS,
} from "./components/KeyTakeaways";
export { LearningRecommendations } from "./components/LearningRecommendations";
export { ProgressTrackingWrapper } from "./components/ProgressTrackingWrapper";
export {
  StepProgressDots,
  StepProgressIndicator,
  StepProgressSummary,
} from "./components/StepProgressIndicator";
// Exercise Data
export {
  AGENTS_EXERCISES,
  ALL_EXERCISES,
  FRAMEWORK_EXERCISES,
  getExercisesByChapter,
  getExercisesByStep,
  LAYERS_EXERCISES,
  TOOLKIT_EXERCISES,
} from "./data/exercises";
// Hooks
export {
  useProgressTracker,
  useStepProgressTracker,
} from "./hooks/useProgressTracker";
