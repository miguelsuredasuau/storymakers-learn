/**
 * Key Takeaways Component
 *
 * Displays the most important lessons from a chapter section.
 * Can be embedded at the end of content pages.
 */

"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Lightbulb } from "lucide-react";
import { useCallback, useState } from "react";
import { BRAND } from "@/features/method/constants";

interface Takeaway {
  title: string;
  description: string;
}

interface KeyTakeawaysProps {
  chapterId?: string;
  sectionId?: string;
  title?: string;
  takeaways: Takeaway[];
  color?: string;
}

export function KeyTakeaways({
  title = "Key Takeaways",
  takeaways,
  color = BRAND.teal,
}: KeyTakeawaysProps) {
  const [acknowledgedItems, setAcknowledgedItems] = useState<Set<number>>(
    new Set()
  );

  const handleAcknowledge = useCallback((index: number) => {
    setAcknowledgedItems((prev) => {
      const newAcknowledged = new Set(prev);
      if (newAcknowledged.has(index)) {
        newAcknowledged.delete(index);
      } else {
        newAcknowledged.add(index);
      }
      return newAcknowledged;
    });
  }, []);

  const allAcknowledged = acknowledgedItems.size === takeaways.length;

  return (
    <div
      className="my-8 overflow-hidden rounded-2xl border"
      style={{ borderColor: `${color}30` }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-6 py-4"
        style={{ backgroundColor: `${color}10` }}
      >
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}20` }}
        >
          <Lightbulb className="h-5 w-5" style={{ color }} />
        </div>
        <div>
          <h3 className="font-bold text-brand-dark text-lg">{title}</h3>
          <p className="text-slate-500 text-sm">
            {acknowledgedItems.size} of {takeaways.length} reviewed
          </p>
        </div>
        {allAcknowledged && (
          <motion.div
            animate={{ scale: 1 }}
            className="ml-auto flex items-center gap-1 rounded-full px-3 py-1 text-brand-accent"
            initial={{ scale: 0 }}
            style={{ backgroundColor: `${BRAND.teal}15` }}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span className="font-medium text-sm">Complete</span>
          </motion.div>
        )}
      </div>

      {/* Takeaways List */}
      <div className="divide-y divide-slate-100 bg-white">
        {takeaways.map((takeaway, index) => {
          const isAcknowledged = acknowledgedItems.has(index);

          return (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="group cursor-pointer px-6 py-4 transition-colors hover:bg-slate-50"
              initial={{ opacity: 0, y: 10 }}
              key={takeaway.title}
              onClick={() => handleAcknowledge(index)}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all"
                  style={{
                    backgroundColor: isAcknowledged ? color : `${color}15`,
                  }}
                >
                  {isAcknowledged ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                  ) : (
                    <span className="font-bold text-xs" style={{ color }}>
                      {index + 1}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h4
                    className={`font-semibold transition-colors ${
                      isAcknowledged ? "text-slate-400" : ""
                    }`}
                    style={{ color: isAcknowledged ? undefined : BRAND.navy }}
                  >
                    {takeaway.title}
                  </h4>
                  <p
                    className={`mt-1 text-sm leading-relaxed transition-colors ${
                      isAcknowledged ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {takeaway.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        className="px-6 py-3 text-center text-slate-500 text-xs"
        style={{ backgroundColor: `${color}05` }}
      >
        Click each takeaway to mark as reviewed
      </div>
    </div>
  );
}

// ============================================================================
// CHAPTER TAKEAWAYS DATA
// ============================================================================

export const LAYERS_TAKEAWAYS = {
  blocks: [
    {
      title: "Blocks Define Strategic Themes",
      description:
        "Blocks are the highest level of your presentation, defining the major themes that create impact. Think of them as the 'chapters' of your story.",
    },
    {
      title: "Start with Audience and Objective",
      description:
        "Before structuring blocks, clearly define who you're speaking to and what change you want to create. This shapes everything that follows.",
    },
    {
      title: "Use 2-4 Supporting Pillars",
      description:
        "Your Big Idea needs supporting pillars. Fewer than 2 feels thin, more than 4 overwhelms. Each pillar becomes a block.",
    },
    {
      title: "Design the Emotional Arc",
      description:
        "Great presentations take audiences on an emotional journey from current state to desired future, with clear tension and resolution.",
    },
  ],
  loops: [
    {
      title: "The Header Test is Essential",
      description:
        "If someone can read just the slide headers and understand the complete argument, your loop is well-structured. This is your primary quality check.",
    },
    {
      title: "One Point Per Loop",
      description:
        "Each loop should make exactly one point or validate one assumption. Multiple points create confusion and weaken your argument.",
    },
    {
      title: "Choose Your Reasoning Approach",
      description:
        "Use deductive reasoning (premise→premise→conclusion) or inductive (evidence→evidence→pattern), but stay consistent within a loop.",
    },
    {
      title: "3-10 Slides is the Sweet Spot",
      description:
        "Loops shorter than 3 slides lack substance; longer than 10 lose focus. Aim for the middle ground.",
    },
  ],
  slides: [
    {
      title: "Action Titles State Insights",
      description:
        "Every slide title should state an insight, not just a topic. 'Sales jumped 40%' is better than 'Sales Results'.",
    },
    {
      title: "The 3-Second Rule",
      description:
        "Someone should grasp your main point within 3 seconds of seeing the slide. If they can't, simplify.",
    },
    {
      title: "One Idea Per Slide",
      description:
        "If you need 'and' in your title, you have two ideas. Split them into separate slides for clarity.",
    },
    {
      title: "Visuals Must Prove the Title",
      description:
        "Your visual (chart, image, diagram) should serve as evidence for your title's claim, not decoration.",
    },
  ],
};

export const AGENTS_TAKEAWAYS = {
  architect: [
    {
      title: "Logic First, Always",
      description:
        "The Architect ensures your argument is sound before anything else. A beautiful presentation with flawed logic fails.",
    },
    {
      title: "MECE is Your Friend",
      description:
        "Mutually Exclusive, Collectively Exhaustive: ensure your categories don't overlap and cover everything needed.",
    },
    {
      title: "Structure Serves Understanding",
      description:
        "Good structure makes complex ideas simple. The Architect removes cognitive burden from your audience.",
    },
  ],
  storyteller: [
    {
      title: "Emotion Drives Action",
      description:
        "Facts inform, but emotions inspire action. The Storyteller transforms data into narratives that move people.",
    },
    {
      title: "Tension Creates Engagement",
      description:
        "Without tension, there's no story. Create contrast between 'what is' and 'what could be' to keep audiences hooked.",
    },
    {
      title: "Make the Audience the Hero",
      description:
        "Position your audience as the protagonist of the story, with you as the guide helping them succeed.",
    },
  ],
  designer: [
    {
      title: "Clarity Over Beauty",
      description:
        "The Designer prioritizes understanding over aesthetics. A clear, simple slide beats a pretty but confusing one.",
    },
    {
      title: "Signal vs Noise",
      description:
        "Every element should contribute to understanding. Remove anything that doesn't serve the message.",
    },
    {
      title: "The Squint Test",
      description:
        "When you squint at a slide, the most important element should still stand out. Use visual hierarchy intentionally.",
    },
  ],
};

export const FRAMEWORK_TAKEAWAYS = {
  scqa: [
    {
      title: "SCQA Opens Every Great Presentation",
      description:
        "Situation, Complication, Question, Answer: establish context, create tension, and promise resolution.",
    },
    {
      title: "Start with What's Familiar",
      description:
        "The Situation grounds your audience in shared understanding before introducing complexity.",
    },
  ],
  pyramid: [
    {
      title: "Lead with the Answer",
      description:
        "The Pyramid Principle: state your conclusion first, then support it. Respect your audience's time.",
    },
    {
      title: "Group and Summarize",
      description:
        "Similar ideas should be grouped together and summarized at a higher level of abstraction.",
    },
  ],
  evidence: [
    {
      title: "Evidence Must Be Plausible",
      description:
        "Three tests: Is it relevant? Is it recent? Is the source credible? Professional formatting isn't enough.",
    },
    {
      title: "Match Evidence to Claim",
      description:
        "Your visual evidence should directly support the specific claim in your title.",
    },
  ],
};

export const TOOLKIT_TAKEAWAYS = {
  overview: [
    {
      title: "Tools Accelerate, Not Replace",
      description:
        "The toolkit speeds up production while maintaining quality, but strategic thinking remains essential.",
    },
    {
      title: "Adapt Templates to Context",
      description:
        "Templates are starting points, not rigid rules. Customize them for your specific situation.",
    },
    {
      title: "Iterate Based on Feedback",
      description:
        "The best presentations emerge from cycles of creation and refinement, not one-shot attempts.",
    },
  ],
};

export default KeyTakeaways;
