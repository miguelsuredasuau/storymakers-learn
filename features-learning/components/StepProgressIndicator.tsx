/**
 * Step Progress Indicator
 *
 * Visual indicator showing progress through the 10-step Framework.
 * Can be displayed horizontally (default) or vertically.
 */

"use client";

import { useLearningProgressOptional } from "@client/contexts/LearningProgressContext";
import { cn } from "@client/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { fg } from "@/lib/design-system";

// Check if flat development mode is enabled
const IS_FLAT_MODE =
  process.env.NEXT_PUBLIC_DEV_FLAT_MODE === "true" &&
  process.env.NODE_ENV !== "production";

// Color token sets for each step variant
const STEP_COLORS = {
  navy: {
    bgCompleted: "bg-brand-dark",
    bgCurrent: "bg-brand-dark/20",
    bgDefault: "bg-brand-dark/10",
    text: "text-brand-dark",
    textCompleted: "text-white",
    ring: "ring-brand-dark",
    connector: "bg-brand-dark",
  },
  coral: {
    bgCompleted: "bg-brand-coral",
    bgCurrent: "bg-brand-coral/20",
    bgDefault: "bg-brand-coral/10",
    text: "text-brand-coral",
    textCompleted: "text-white",
    ring: "ring-brand-coral",
    connector: "bg-brand-coral",
  },
  teal: {
    bgCompleted: "bg-brand-accent",
    bgCurrent: "bg-brand-accent/20",
    bgDefault: "bg-brand-accent/10",
    text: "text-brand-accent",
    textCompleted: "text-white",
    ring: "ring-brand-accent",
    connector: "bg-brand-accent",
  },
  tealDark: {
    bgCompleted: "bg-brand-mid",
    bgCurrent: "bg-brand-mid/20",
    bgDefault: "bg-brand-mid/10",
    text: "text-brand-mid",
    textCompleted: "text-white",
    ring: "ring-brand-mid",
    connector: "bg-brand-mid",
  },
} as const;

type StepColorKey = keyof typeof STEP_COLORS;

// Step definitions
const STEPS = [
  {
    id: "0",
    title: "Launchpad",
    subtitle: "SCQA Framework",
    colorKey: "navy" as StepColorKey,
  },
  {
    id: "1",
    title: "Narrative",
    subtitle: "Story Arc",
    colorKey: "coral" as StepColorKey,
  },
  {
    id: "2",
    title: "Structure",
    subtitle: "Pyramid Principle",
    colorKey: "coral" as StepColorKey,
  },
  {
    id: "3",
    title: "Tension",
    subtitle: "Arc Matrix",
    colorKey: "coral" as StepColorKey,
  },
  {
    id: "4",
    title: "Flow",
    subtitle: "Bridge Test",
    colorKey: "teal" as StepColorKey,
  },
  {
    id: "5",
    title: "Rhythm",
    subtitle: "Sparklines",
    colorKey: "teal" as StepColorKey,
  },
  {
    id: "6",
    title: "Evidence",
    subtitle: "Acid Test",
    colorKey: "teal" as StepColorKey,
  },
  {
    id: "7",
    title: "Clarity",
    subtitle: "Slide Doctor",
    colorKey: "tealDark" as StepColorKey,
  },
  {
    id: "8",
    title: "Impact",
    subtitle: "Data Ink",
    colorKey: "tealDark" as StepColorKey,
  },
  {
    id: "9",
    title: "Polish",
    subtitle: "Metaphor",
    colorKey: "tealDark" as StepColorKey,
  },
] as const;

interface StepProgressIndicatorProps {
  /** Current step being viewed (0-9) */
  currentStep?: number;
  /** Show labels below steps */
  showLabels?: boolean;
  /** Orientation */
  orientation?: "horizontal" | "vertical";
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Whether to make steps clickable */
  clickable?: boolean;
}

export function StepProgressIndicator({
  currentStep,
  showLabels = false,
  orientation = "horizontal",
  size = "md",
  clickable = true,
}: StepProgressIndicatorProps) {
  const progress = useLearningProgressOptional();

  // Size configurations
  const sizeConfig = {
    sm: { step: "h-6 w-6 text-xs", connector: "h-0.5 w-4", gap: "gap-1" },
    md: { step: "h-8 w-8 text-sm", connector: "h-0.5 w-6", gap: "gap-2" },
    lg: { step: "h-10 w-10 text-base", connector: "h-1 w-8", gap: "gap-3" },
  };

  const config = sizeConfig[size];

  // Get step progress from context - all steps are always accessible (no locking)
  const getStepStatus = (stepId: string): "completed" | "in_progress" => {
    if (currentStep !== undefined && stepId === String(currentStep)) {
      return "in_progress";
    }

    if (!progress) {
      return "in_progress";
    }

    const stepProgress = progress.getStepProgress(stepId);
    if (stepProgress >= 100) {
      return "completed";
    }

    return "in_progress";
  };

  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={`flex ${isHorizontal ? "flex-row items-center" : "flex-col items-start"} ${config.gap}`}
    >
      {STEPS.map((step, index) => {
        const status = getStepStatus(step.id);
        const isCurrent =
          currentStep !== undefined &&
          Number.parseInt(step.id, 10) === currentStep;
        const isCompleted = status === "completed";
        const colors = STEP_COLORS[step.colorKey];

        const stepContent = (
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: index * 0.05 }}
          >
            <div
              className={cn(
                config.step,
                "flex items-center justify-center rounded-full font-semibold transition-all duration-200",
                isCompleted && cn(colors.bgCompleted, colors.textCompleted),
                isCurrent &&
                  !isCompleted &&
                  cn(
                    colors.bgCurrent,
                    colors.text,
                    "ring-2 ring-offset-2",
                    colors.ring
                  ),
                !(isCompleted || isCurrent) && cn(colors.bgDefault, colors.text)
              )}
            >
              {isCompleted ? <Check className="h-4 w-4" /> : step.id}
            </div>

            {showLabels && (
              <div className="mt-1.5 text-center">
                <p className={cn("font-medium text-xs", fg.brandDark)}>
                  {step.title}
                </p>
                {size === "lg" && (
                  <p className="text-micro text-muted-foreground">
                    {step.subtitle}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        );

        const connector = index < STEPS.length - 1 && (
          <div
            className={cn(
              isHorizontal ? config.connector : "h-4 w-0.5",
              "rounded-full transition-colors",
              isCompleted ? colors.connector : "bg-gray-200"
            )}
          />
        );

        return (
          <div
            className={`flex ${isHorizontal ? "flex-row items-center" : "flex-col items-center"} ${config.gap}`}
            key={step.id}
          >
            {clickable ? (
              <Link
                className="transition-transform hover:scale-110"
                href={`/method/framework/step-${step.id}`}
              >
                {stepContent}
              </Link>
            ) : (
              stepContent
            )}
            {connector}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Compact step progress bar (just the dots)
 */
export function StepProgressDots({
  currentStep,
  size = "sm",
}: {
  currentStep?: number;
  size?: "sm" | "md";
}) {
  return (
    <StepProgressIndicator
      clickable={true}
      currentStep={currentStep}
      orientation="horizontal"
      showLabels={false}
      size={size}
    />
  );
}

/**
 * Summary of step progress (e.g., "3/10 steps completed")
 */
export function StepProgressSummary() {
  const progress = useLearningProgressOptional();

  if (IS_FLAT_MODE || !progress) {
    return null;
  }

  let completedCount = 0;
  for (let i = 0; i <= 9; i++) {
    const stepProgress = progress.getStepProgress(String(i));
    if (stepProgress >= 100) {
      completedCount++;
    }
  }

  const percentage = Math.round((completedCount / 10) * 100);

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <div className="mb-1 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Framework Progress</span>
          <span className={cn("font-medium", fg.brandAccent)}>
            {completedCount}/10 steps
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            animate={{ width: `${percentage}%` }}
            className="h-full rounded-full bg-brand-accent"
            initial={{ width: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}

export default StepProgressIndicator;
