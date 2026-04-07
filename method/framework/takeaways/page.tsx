"use client";

import { BookOpen } from "lucide-react";
import { FRAMEWORK_TAKEAWAYS, KeyTakeaways } from "@/features/learning";
import { ChapterNavigation } from "@/features/method/components";

export default function FrameworkTakeawaysPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <ChapterNavigation />

      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-dark to-brand-mid">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-2 font-bold text-3xl text-brand-dark">
            Framework Chapter - Key Takeaways
          </h1>
          <p className="text-muted-foreground">
            Review the essential lessons from the 10-Step Storymakers Framework
          </p>
        </div>

        {/* Takeaways by Section */}
        <div className="space-y-8">
          {/* SCQA */}
          <div>
            <h2 className="mb-4 font-semibold text-brand-dark text-xl">
              SCQA Framework
            </h2>
            <KeyTakeaways
              chapterId="FRAMEWORK"
              color="#3b82f6"
              sectionId="scqa"
              takeaways={FRAMEWORK_TAKEAWAYS.scqa}
              title="SCQA Takeaways"
            />
          </div>

          {/* Pyramid */}
          <div>
            <h2 className="mb-4 font-semibold text-brand-dark text-xl">
              Pyramid Principle
            </h2>
            <KeyTakeaways
              chapterId="FRAMEWORK"
              color="#8b5cf6"
              sectionId="pyramid"
              takeaways={FRAMEWORK_TAKEAWAYS.pyramid}
              title="Pyramid Takeaways"
            />
          </div>

          {/* Evidence */}
          <div>
            <h2 className="mb-4 font-semibold text-brand-dark text-xl">
              Evidence & Proof
            </h2>
            <KeyTakeaways
              chapterId="FRAMEWORK"
              color="#10b981"
              sectionId="evidence"
              takeaways={FRAMEWORK_TAKEAWAYS.evidence}
              title="Evidence Takeaways"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
