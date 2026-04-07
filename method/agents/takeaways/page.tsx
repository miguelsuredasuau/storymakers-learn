"use client";

import { BookOpen } from "lucide-react";
import { AGENTS_TAKEAWAYS, KeyTakeaways } from "@/features/learning";
import { ChapterNavigation } from "@/features/method/components";

export default function AgentsTakeawaysPage() {
  // Flatten all takeaways for display
  const _allTakeaways = [
    ...AGENTS_TAKEAWAYS.architect,
    ...AGENTS_TAKEAWAYS.storyteller,
    ...AGENTS_TAKEAWAYS.designer,
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <ChapterNavigation />

      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-accent to-brand-dark">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-2 font-bold text-3xl text-brand-dark">
            Agents Chapter - Key Takeaways
          </h1>
          <p className="text-muted-foreground">
            Review the essential lessons from the Three Agents: Architect,
            Storyteller, and Designer
          </p>
        </div>

        {/* Takeaways by Section */}
        <div className="space-y-8">
          {/* Architect */}
          <div>
            <h2 className="mb-4 font-semibold text-brand-dark text-xl">
              The Architect
            </h2>
            <KeyTakeaways
              chapterId="AGENTS"
              color="#3b82f6"
              sectionId="architect"
              takeaways={AGENTS_TAKEAWAYS.architect}
              title="Architect Takeaways"
            />
          </div>

          {/* Storyteller */}
          <div>
            <h2 className="mb-4 font-semibold text-brand-dark text-xl">
              The Storyteller
            </h2>
            <KeyTakeaways
              chapterId="AGENTS"
              color="#8b5cf6"
              sectionId="storyteller"
              takeaways={AGENTS_TAKEAWAYS.storyteller}
              title="Storyteller Takeaways"
            />
          </div>

          {/* Designer */}
          <div>
            <h2 className="mb-4 font-semibold text-brand-dark text-xl">
              The Designer
            </h2>
            <KeyTakeaways
              chapterId="AGENTS"
              color="#f59e0b"
              sectionId="designer"
              takeaways={AGENTS_TAKEAWAYS.designer}
              title="Designer Takeaways"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
