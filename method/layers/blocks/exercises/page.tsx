"use client";

import { ArrowRight, Dumbbell } from "lucide-react";
import Link from "next/link";
import { Exercise, LAYERS_EXERCISES } from "@/features/learning";
import { ChapterNavigation } from "@/features/method/components";
import { BRAND } from "@/features/method/constants";

const BLOCKS_EXERCISES = [
  LAYERS_EXERCISES.blocksGoalsCheck,
  LAYERS_EXERCISES.blocksArcSelection,
  LAYERS_EXERCISES.blocksReflection,
];

export default function BlocksExercisesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <ChapterNavigation />

      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            }}
          >
            <Dumbbell className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-2 font-bold text-3xl" style={{ color: BRAND.navy }}>
            Blocks - Exercises
          </h1>
          <p className="text-slate-600">
            Practice exercises to test your understanding of Blocks
          </p>
        </div>

        {/* Exercises */}
        <div className="space-y-8">
          {BLOCKS_EXERCISES.map((exercise, index) => (
            <div key={exercise.exerciseId}>
              <div className="mb-2 font-medium text-slate-500 text-sm">
                Exercise {index + 1} of {BLOCKS_EXERCISES.length}
              </div>
              <Exercise {...exercise} />
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6">
          <div>
            <p className="text-slate-500 text-sm">Ready to review?</p>
            <p className="font-semibold" style={{ color: BRAND.navy }}>
              View Blocks Key Takeaways
            </p>
          </div>
          <Link
            className="flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-all hover:opacity-90"
            href="/method/layers/takeaways"
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            }}
          >
            Takeaways
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
