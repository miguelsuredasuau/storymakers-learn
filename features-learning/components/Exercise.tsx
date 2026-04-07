/**
 * Exercise Component
 *
 * A single interactive exercise that can be embedded in content.
 * Supports multiple choice, true/false, and short answer formats.
 */

"use client";

import { trpc } from "@client/trpc";
import { cn } from "@client/utils";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, HelpCircle, Lightbulb, X } from "lucide-react";
import { useCallback, useState } from "react";
import { fg } from "@/lib/design-system";

export type ExerciseType = "multiple-choice" | "true-false" | "reflection";

interface BaseExerciseProps {
  exerciseId: string;
  chapterId?: string;
  stepId?: string;
  question: string;
  hint?: string;
  explanation?: string;
  onComplete?: (isCorrect: boolean) => void;
}

interface MultipleChoiceExercise extends BaseExerciseProps {
  type: "multiple-choice";
  options: string[];
  correctIndex: number;
}

interface TrueFalseExercise extends BaseExerciseProps {
  type: "true-false";
  correctAnswer: boolean;
}

interface ReflectionExercise extends BaseExerciseProps {
  type: "reflection";
  minLength?: number;
}

export type ExerciseProps =
  | MultipleChoiceExercise
  | TrueFalseExercise
  | ReflectionExercise;

export function Exercise(props: ExerciseProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(
    null
  );
  const [showHint, setShowHint] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [reflectionText, setReflectionText] = useState("");
  const [startTime] = useState(Date.now());

  const submitExercise = trpc.learning.submitExercise.useMutation();

  const isCorrect = useCallback(() => {
    if (props.type === "multiple-choice") {
      return selectedAnswer === props.correctIndex;
    }
    if (props.type === "true-false") {
      return selectedAnswer === (props.correctAnswer ? 0 : 1);
    }
    // Reflection exercises are always "correct" if they meet the minimum length
    if (props.type === "reflection") {
      return reflectionText.length >= (props.minLength ?? 10);
    }
    return false;
  }, [props, selectedAnswer, reflectionText]);

  const handleSubmit = useCallback(() => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const correct = isCorrect();

    // Submit to backend
    submitExercise.mutate({
      exerciseId: props.exerciseId,
      chapterId: props.chapterId,
      stepId: props.stepId,
      selectedAnswer:
        props.type === "reflection"
          ? reflectionText
          : String(selectedAnswer ?? ""),
      isCorrect: correct,
      timeSpentSeconds: timeSpent,
    });

    setShowResult(true);
    props.onComplete?.(correct);
  }, [
    startTime,
    isCorrect,
    submitExercise,
    props,
    reflectionText,
    selectedAnswer,
  ]);

  const canSubmit = () => {
    if (props.type === "reflection") {
      return reflectionText.length >= (props.minLength ?? 10);
    }
    return selectedAnswer !== null;
  };

  return (
    <div className="my-8 rounded-xl border border-brand-accent/20 bg-white p-6">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle className={cn("h-5 w-5", fg.brandAccent)} />
          <span className={cn("font-medium text-sm", fg.brandAccent)}>
            {props.type === "reflection" ? "Reflection" : "Quick Check"}
          </span>
        </div>
        {props.hint && !showResult && (
          <button
            className={cn(
              "flex items-center gap-1 rounded-full px-3 py-1 text-xs transition-colors hover:bg-neutral-100",
              fg.brandCoral
            )}
            onClick={() => setShowHint(!showHint)}
            type="button"
          >
            <Lightbulb className="h-3.5 w-3.5" />
            {showHint ? "Hide hint" : "Show hint"}
          </button>
        )}
      </div>

      {/* Question */}
      <p
        className={cn("mb-4 font-medium text-lg", fg.brandDark)}
        id={`exercise-question-${props.exerciseId}`}
      >
        {props.question}
      </p>

      {/* Hint */}
      <AnimatePresence>
        {showHint && props.hint && (
          <motion.div
            animate={{ opacity: 1, height: "auto" }}
            className="mb-4 overflow-hidden rounded-lg bg-brand-coral/10 p-3"
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
          >
            <p className="flex items-start gap-2 text-sm">
              <Lightbulb
                className={cn("mt-0.5 h-4 w-4 flex-shrink-0", fg.brandCoral)}
              />
              <span className={fg.brandCoral}>{props.hint}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Answer Options - increased spacing on mobile for touch targets */}
      {props.type === "multiple-choice" && (
        <div
          aria-labelledby={`exercise-question-${props.exerciseId}`}
          className="space-y-3 sm:space-y-2"
          role="radiogroup"
        >
          {props.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === props.correctIndex;

            return (
              <button
                aria-checked={isSelected}
                aria-label={`Option ${String.fromCharCode(65 + index)}: ${option}`}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg border px-3 py-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 sm:p-3",
                  showResult &&
                    isCorrectOption &&
                    "border-brand-accent bg-brand-accent/10 text-brand-accent",
                  showResult &&
                    isSelected &&
                    !isCorrectOption &&
                    "border-brand-coral bg-brand-coral/10 text-brand-coral",
                  !showResult &&
                    isSelected &&
                    "border-brand-accent bg-brand-accent/5 text-brand-dark",
                  !(showResult || isSelected) &&
                    "border-black/10 bg-transparent text-brand-dark"
                )}
                disabled={showResult}
                key={index}
                onClick={() => setSelectedAnswer(index)}
                role="radio"
                type="button"
              >
                <span
                  className={cn(
                    "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full font-medium text-xs",
                    showResult &&
                      isCorrectOption &&
                      "bg-brand-accent text-white",
                    showResult &&
                      isSelected &&
                      !isCorrectOption &&
                      "bg-brand-coral text-white",
                    !(showResult && (isCorrectOption || isSelected)) &&
                      "bg-brand-dark/10 text-brand-dark"
                  )}
                >
                  {showResult && isCorrectOption ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : showResult && isSelected ? (
                    <X className="h-3.5 w-3.5" />
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </span>
                <span className="text-sm">{option}</span>
              </button>
            );
          })}
        </div>
      )}

      {props.type === "true-false" && (
        <div
          aria-labelledby={`exercise-question-${props.exerciseId}`}
          className="flex gap-3"
          role="radiogroup"
        >
          {["True", "False"].map((label, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption =
              (index === 0 && props.correctAnswer) ||
              (index === 1 && !props.correctAnswer);

            return (
              <button
                aria-checked={isSelected}
                className={cn(
                  "flex-1 rounded-lg border py-3 font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2",
                  showResult &&
                    isCorrectOption &&
                    "border-brand-accent bg-brand-accent/10 text-brand-accent",
                  showResult &&
                    isSelected &&
                    !isCorrectOption &&
                    "border-brand-coral bg-brand-coral/10 text-brand-coral",
                  !showResult &&
                    isSelected &&
                    "border-brand-accent bg-brand-accent/5 text-brand-dark",
                  !(showResult || isSelected) &&
                    "border-black/10 bg-transparent text-brand-dark"
                )}
                disabled={showResult}
                key={label}
                onClick={() => setSelectedAnswer(index)}
                role="radio"
                type="button"
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      {props.type === "reflection" && (
        <div>
          <textarea
            className="w-full rounded-lg border border-black/10 p-3 text-sm transition-colors focus:border-brand-accent focus:outline-none"
            disabled={showResult}
            onChange={(e) => setReflectionText(e.target.value)}
            placeholder="Write your reflection here..."
            rows={4}
            value={reflectionText}
          />
          {props.minLength && !showResult && (
            <p className="mt-1 text-muted-foreground text-xs">
              {reflectionText.length}/{props.minLength} characters minimum
            </p>
          )}
        </div>
      )}

      {/* Submit Button / Result */}
      <div className="mt-4">
        {showResult ? (
          <AnimatePresence>
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "rounded-lg p-4",
                isCorrect() ? "bg-brand-accent/10" : "bg-brand-coral/10"
              )}
              initial={{ opacity: 0, y: 10 }}
            >
              <div className="flex items-center gap-2">
                {isCorrect() ? (
                  <CheckCircle2 className={cn("h-5 w-5", fg.brandAccent)} />
                ) : (
                  <X className={cn("h-5 w-5", fg.brandCoral)} />
                )}
                <span
                  className={cn(
                    "font-medium",
                    isCorrect() ? fg.brandAccent : fg.brandCoral
                  )}
                >
                  {props.type === "reflection"
                    ? "Thanks for your reflection!"
                    : isCorrect()
                      ? "Correct!"
                      : "Not quite right"}
                </span>
              </div>
              {props.explanation && (
                <p className="mt-2 text-foreground/70 text-sm">
                  {props.explanation}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <button
            className="rounded-full bg-brand-accent px-6 py-2 font-medium text-white transition-all hover:bg-brand-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!canSubmit()}
            onClick={handleSubmit}
            type="button"
          >
            {props.type === "reflection" ? "Save Reflection" : "Check Answer"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Exercise;
