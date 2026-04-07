"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Compass, Layers, XCircle } from "lucide-react";
import { useState } from "react";
import { ChapterNavigation } from "@/features/method/components";
import { BRAND } from "@/features/method/constants";

type ViewMode = "correct" | "overlap" | "gap";

interface Segment {
  id: string;
  label: string;
  description: string;
  overlaps?: boolean;
}

const segments: Record<ViewMode, Segment[]> = {
  correct: [
    {
      id: "b2b-ent",
      label: "B2B Enterprise",
      description: "Large corporations (500+ employees)",
    },
    {
      id: "b2b-smb",
      label: "B2B SMB",
      description: "Small & medium businesses (1-499 employees)",
    },
    {
      id: "b2c",
      label: "B2C Consumer",
      description: "Individual end consumers",
    },
  ],
  overlap: [
    { id: "enterprise", label: "Enterprise", description: "Large companies" },
    {
      id: "large-co",
      label: "Large Companies",
      description: "Big corporations",
      overlaps: true,
    },
    { id: "b2c", label: "B2C", description: "Consumers" },
  ],
  gap: [
    {
      id: "enterprise",
      label: "Enterprise",
      description: "Large corporations only",
    },
    { id: "b2c", label: "Consumer", description: "Individual end users" },
  ],
};

export default function Step2_2Page() {
  const [viewMode, setViewMode] = useState<ViewMode>("correct");

  const currentSegments = segments[viewMode];
  const isCorrect = viewMode === "correct";
  const isOverlap = viewMode === "overlap";
  const isGap = viewMode === "gap";

  return (
    <div className="relative min-h-screen bg-slate-50">
      <ChapterNavigation />

      {/* Background pattern */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(${BRAND.navy} 1.5px, transparent 1.5px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Step Badge */}
      <motion.div
        animate={{ x: 0, opacity: 1 }}
        className="absolute top-20 left-6 z-10 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-md ring-1 ring-slate-100"
        initial={{ x: -20, opacity: 0 }}
      >
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg font-bold text-lg text-white"
          style={{ backgroundColor: BRAND.navy }}
        >
          2
        </div>
        <div className="text-left">
          <p
            className="font-bold text-xs uppercase tracking-wider"
            style={{ color: BRAND.navy }}
          >
            Block Level
          </p>
          <p className="flex items-center gap-1 text-slate-500 text-xs">
            Led by the{" "}
            <Compass className="h-3 w-3" style={{ color: BRAND.navy }} />
            <span style={{ color: BRAND.navy, fontWeight: 600 }}>
              Architect
            </span>
          </p>
        </div>
      </motion.div>

      <div className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <motion.h1
            animate={{ y: 0, opacity: 1 }}
            className="mb-2 text-center font-bold text-4xl md:text-5xl"
            initial={{ y: 20, opacity: 0 }}
            style={{ color: BRAND.navy }}
          >
            The MECE Principle
          </motion.h1>

          <motion.p
            animate={{ y: 0, opacity: 1 }}
            className="mb-8 text-center text-slate-500 text-xl"
            initial={{ y: 20, opacity: 0 }}
            transition={{ delay: 0.1 }}
          >
            The quality check for your horizontal logic
          </motion.p>

          {/* Banner */}
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            className="mx-auto mb-8 flex max-w-3xl items-center justify-center gap-3 rounded-2xl px-6 py-4"
            initial={{ y: -10, opacity: 0 }}
            style={{ backgroundColor: `${BRAND.coral}12` }}
            transition={{ delay: 0.15 }}
          >
            <Layers
              className="h-6 w-6 flex-shrink-0"
              style={{ color: BRAND.coral }}
            />
            <p
              className="text-center font-bold text-lg"
              style={{ color: BRAND.navy }}
            >
              Why it matters:{" "}
              <span style={{ color: BRAND.coral }}>
                MECE ensures nothing is counted twice and nothing is forgotten
              </span>
            </p>
          </motion.div>

          {/* Main Content Area */}
          <motion.div
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-3xl bg-white p-8 shadow-xl"
            initial={{ scale: 0.95, opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Example Title */}
            <div className="mb-6 text-center">
              <span
                className="inline-block rounded-full px-4 py-1.5 font-bold text-sm"
                style={{
                  backgroundColor: `${BRAND.teal}15`,
                  color: BRAND.tealDark,
                }}
              >
                Example: Market Segmentation
              </span>
            </div>

            {/* Mode Selector */}
            <div className="mb-8 flex justify-center gap-2">
              <button
                className={`rounded-full px-5 py-2.5 font-semibold text-sm transition-all ${
                  isCorrect
                    ? "text-white shadow-md"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
                onClick={() => setViewMode("correct")}
                style={{ backgroundColor: isCorrect ? BRAND.teal : undefined }}
                type="button"
              >
                MECE ✓
              </button>
              <button
                className={`rounded-full px-5 py-2.5 font-semibold text-sm transition-all ${
                  isOverlap
                    ? "text-white shadow-md"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
                onClick={() => setViewMode("overlap")}
                style={{ backgroundColor: isOverlap ? BRAND.coral : undefined }}
                type="button"
              >
                Has Overlap
              </button>
              <button
                className={`rounded-full px-5 py-2.5 font-semibold text-sm transition-all ${
                  isGap
                    ? "text-white shadow-md"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
                onClick={() => setViewMode("gap")}
                style={{ backgroundColor: isGap ? BRAND.coral : undefined }}
                type="button"
              >
                Has Gap
              </button>
            </div>

            {/* Universe Container */}
            <div
              className="relative mx-auto max-w-3xl rounded-2xl border-2 p-6 transition-all duration-300"
              style={{
                borderColor: isCorrect ? BRAND.teal : BRAND.coral,
                backgroundColor: isCorrect
                  ? `${BRAND.teal}08`
                  : `${BRAND.coral}08`,
              }}
            >
              <p className="mb-6 text-center font-bold text-slate-400 text-xs uppercase tracking-wider">
                Total Addressable Market
              </p>

              {/* Segments */}
              <div className="flex flex-wrap items-stretch justify-center gap-4">
                <AnimatePresence mode="wait">
                  {currentSegments.map((segment, i) => (
                    <motion.div
                      animate={{
                        scale: 1,
                        opacity: 1,
                        x: isOverlap && segment.overlaps ? -24 : 0,
                      }}
                      className={`relative flex w-44 flex-col items-center justify-center rounded-xl p-4 text-center shadow-lg ${
                        isOverlap && segment.overlaps
                          ? "z-10 ring-4 ring-red-300"
                          : ""
                      }`}
                      exit={{ scale: 0, opacity: 0 }}
                      initial={{ scale: 0, opacity: 0 }}
                      key={`${viewMode}-${segment.id}`}
                      style={{
                        backgroundColor: isCorrect
                          ? BRAND.navy
                          : isOverlap && segment.overlaps
                            ? BRAND.coral
                            : BRAND.navy,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                        delay: i * 0.1,
                      }}
                    >
                      <span className="font-bold text-sm text-white">
                        {segment.label}
                      </span>
                      <span className="mt-1 text-white/70 text-xs">
                        {segment.description}
                      </span>
                    </motion.div>
                  ))}

                  {/* Gap indicator */}
                  {isGap && (
                    <motion.div
                      animate={{ scale: 1 }}
                      className="flex w-44 flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 text-center"
                      initial={{ scale: 0 }}
                      style={{
                        borderColor: BRAND.coral,
                        backgroundColor: `${BRAND.coral}15`,
                      }}
                      transition={{ delay: 0.3 }}
                    >
                      <span
                        className="font-bold text-2xl"
                        style={{ color: BRAND.coral }}
                      >
                        ?
                      </span>
                      <span
                        className="mt-1 font-medium text-xs"
                        style={{ color: BRAND.coral }}
                      >
                        SMBs are missing!
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Status Message */}
              <AnimatePresence>
                {!isCorrect && (
                  <motion.div
                    animate={{ y: 0, opacity: 1 }}
                    className="mt-6 flex items-center justify-center gap-2 rounded-full px-4 py-2"
                    exit={{ y: 10, opacity: 0 }}
                    initial={{ y: 10, opacity: 0 }}
                    style={{ backgroundColor: `${BRAND.coral}15` }}
                  >
                    <XCircle
                      className="h-4 w-4"
                      style={{ color: BRAND.coral }}
                    />
                    <span
                      className="font-bold text-sm"
                      style={{ color: BRAND.coral }}
                    >
                      {isOverlap
                        ? '"Enterprise" and "Large Companies" overlap — double counting!'
                        : '"SMB" segment is missing — incomplete analysis!'}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Status Badge with Tooltip */}
            <div className="mt-6 flex justify-center">
              <div className="group relative">
                <motion.div
                  className="flex cursor-help items-center gap-2 rounded-full px-6 py-3 shadow-md"
                  layout
                  style={{
                    backgroundColor: isCorrect ? BRAND.teal : BRAND.coral,
                  }}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  ) : (
                    <XCircle className="h-5 w-5 text-white" />
                  )}
                  <span className="font-bold text-white">
                    {isCorrect
                      ? "MECE ✓"
                      : isOverlap
                        ? "Not Mutually Exclusive"
                        : "Not Collectively Exhaustive"}
                  </span>
                </motion.div>

                {/* Tooltip */}
                <div
                  className="pointer-events-none absolute -top-20 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-xl px-4 py-3 text-sm text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100"
                  style={{ backgroundColor: BRAND.navy }}
                >
                  {isCorrect ? (
                    <div className="text-center">
                      <p className="font-bold">Perfect MECE structure</p>
                      <p className="mt-1 text-white/80">
                        No overlaps, no gaps — complete coverage
                      </p>
                    </div>
                  ) : isOverlap ? (
                    <div className="text-center">
                      <p className="font-bold">Mutually Exclusive</p>
                      <p className="mt-1 text-white/80">
                        Each item should fit in exactly one category
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="font-bold">Collectively Exhaustive</p>
                      <p className="mt-1 text-white/80">
                        All possibilities must be covered — no gaps
                      </p>
                    </div>
                  )}
                  <div
                    className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45"
                    style={{ backgroundColor: BRAND.navy }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
