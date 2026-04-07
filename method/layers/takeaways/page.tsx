"use client";

import { BookOpen } from "lucide-react";
import { KeyTakeaways, LAYERS_TAKEAWAYS } from "@/features/learning";
import { ChapterNavigation } from "@/features/method/components";

export default function LayersTakeawaysPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <ChapterNavigation />

      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-coral to-rose-500">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-2 font-bold text-3xl text-brand-dark">
            Layers Chapter - Key Takeaways
          </h1>
          <p className="text-muted-foreground">
            Review the essential lessons from the Three Layers: Blocks, Loops,
            and Slides
          </p>
        </div>

        {/* Takeaways by Section */}
        <div className="space-y-8">
          {/* Blocks */}
          <div>
            <h2 className="mb-4 font-semibold text-brand-dark text-xl">
              Blocks Layer
            </h2>
            <KeyTakeaways
              chapterId="LAYERS"
              color="#3b82f6"
              sectionId="blocks"
              takeaways={LAYERS_TAKEAWAYS.blocks}
              title="Blocks Takeaways"
            />
          </div>

          {/* Loops */}
          <div>
            <h2 className="mb-4 font-semibold text-brand-dark text-xl">
              Loops Layer
            </h2>
            <KeyTakeaways
              chapterId="LAYERS"
              color="#8b5cf6"
              sectionId="loops"
              takeaways={LAYERS_TAKEAWAYS.loops}
              title="Loops Takeaways"
            />
          </div>

          {/* Slides */}
          <div>
            <h2 className="mb-4 font-semibold text-brand-dark text-xl">
              Slides Layer
            </h2>
            <KeyTakeaways
              chapterId="LAYERS"
              color="#10b981"
              sectionId="slides"
              takeaways={LAYERS_TAKEAWAYS.slides}
              title="Slides Takeaways"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
