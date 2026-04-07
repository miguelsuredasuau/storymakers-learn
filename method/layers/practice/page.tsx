"use client";

import { BookOpen } from "lucide-react";
import { Exercise } from "@/features/learning";
import { ChapterNavigation } from "@/features/method/components";

export default function LayersPracticePage() {
  return (
    <div className="min-h-screen bg-transparent">
      <ChapterNavigation />

      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 font-semibold text-brand-accent text-sm uppercase tracking-widest">
            Practice Exercises
          </p>
          <h1 className="mb-4 font-bold font-serif text-4xl text-brand-dark">
            Apply the 3 Layers
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Test your understanding with these interactive exercises. Each one
            helps reinforce key concepts from the Layers chapter.
          </p>
        </div>

        {/* Exercises */}
        <div className="space-y-8">
          {/* Exercise 1: Multiple Choice */}
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand-dark" />
              <h2 className="font-semibold text-brand-dark text-lg">
                Understanding Blocks
              </h2>
            </div>
            <p className="mb-4 text-muted-foreground">
              Blocks are the highest level of presentation structure. They
              represent major strategic sections that create impact.
            </p>

            <Exercise
              chapterId="LAYERS"
              correctIndex={1}
              exerciseId="layers-blocks-mc-1"
              explanation="Blocks represent strategic themes that create the overall impact of your presentation. They answer the question: 'What themes will create the impact we need?'"
              hint="Think about what level of planning happens first when you start a new presentation."
              options={[
                "Individual slides with bullet points",
                "Strategic themes or sections that create impact",
                "Visual design elements like colors and fonts",
                "Speaker notes and talking points",
              ]}
              question="What do 'Blocks' represent in the Storymakers Method?"
              type="multiple-choice"
            />
          </section>

          {/* Exercise 2: True/False */}
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand-accent" />
              <h2 className="font-semibold text-brand-dark text-lg">
                Loop Structure
              </h2>
            </div>
            <p className="mb-4 text-muted-foreground">
              Loops are argumentative sequences that tell a coherent story
              through their headers alone.
            </p>

            <Exercise
              chapterId="LAYERS"
              correctAnswer={true}
              exerciseId="layers-loops-tf-1"
              explanation="This is true! The 'header test' for Loops means that if you read just the slide headers in sequence, you should understand the logical flow and main argument being made."
              hint="Consider how someone might skim a presentation by reading only the slide titles."
              question="If someone reads only the slide headers in a Loop, they should be able to understand the main story."
              type="true-false"
            />
          </section>

          {/* Exercise 3: Multiple Choice */}
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand-coral" />
              <h2 className="font-semibold text-brand-dark text-lg">
                The 3-Second Rule
              </h2>
            </div>
            <p className="mb-4 text-muted-foreground">
              At the Slide level, we apply the 3-second rule to ensure clarity
              and immediate understanding.
            </p>

            <Exercise
              chapterId="LAYERS"
              correctIndex={1}
              exerciseId="layers-slides-mc-1"
              explanation="The 3-second rule states that viewers should be able to grasp the main point of a slide within 3 seconds of seeing it. This ensures slides communicate clearly and aren't overloaded with information."
              hint="Think about how much time someone typically spends looking at a slide before moving on."
              options={[
                "Each slide should have exactly 3 bullet points",
                "Viewers should understand the main point within 3 seconds",
                "Animations should last no longer than 3 seconds",
                "You should spend only 3 minutes on each slide design",
              ]}
              question="What does the '3-second rule' mean at the Slide level?"
              type="multiple-choice"
            />
          </section>

          {/* Exercise 4: Reflection */}
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand-dark" />
              <h2 className="font-semibold text-brand-dark text-lg">
                Applying the Layers
              </h2>
            </div>
            <p className="mb-4 text-muted-foreground">
              Think about a recent presentation you&apos;ve created or seen. How
              might it benefit from the 3-layer approach?
            </p>

            <Exercise
              chapterId="LAYERS"
              exerciseId="layers-reflection-1"
              explanation="Great reflection! Thinking about how existing presentations could be restructured using the 3-layer approach helps solidify your understanding of Blocks, Loops, and Slides."
              minLength={50}
              question="Describe one presentation you could improve using the 3-layer structure. What Blocks might you create?"
              type="reflection"
            />
          </section>
        </div>
      </div>
    </div>
  );
}
