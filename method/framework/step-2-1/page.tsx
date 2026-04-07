"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUp, CheckCircle2, Compass } from "lucide-react";
import { useState } from "react";
import { ChapterNavigation } from "@/features/method/components";
import { BRAND } from "@/features/method/constants";

type LogicMode = "vertical" | "horizontal";

export default function Step2_1Page() {
  const [logicMode, setLogicMode] = useState<LogicMode>("vertical");
  const [hoveredArg, setHoveredArg] = useState<number | null>(null);

  const pyramidData = {
    answer: {
      content: "We should expand into Europe",
    },
    arguments: [
      {
        id: 1,
        content: "Market opportunity is massive",
        why: "Because the market is $50B and growing",
        mece: "Market size (external factor)",
      },
      {
        id: 2,
        content: "Competition is weak",
        why: "Because no major player has entered yet",
        mece: "Competitive landscape (external factor)",
      },
      {
        id: 3,
        content: "We have local support",
        why: "Because partners are ready to distribute",
        mece: "Execution capability (internal factor)",
      },
    ],
    evidence: [
      { id: 1, content: "Market research", supports: 1 },
      { id: 2, content: "Growth analysis", supports: 1 },
      { id: 3, content: "Competitor audit", supports: 2 },
      { id: 4, content: "Partner MOUs", supports: 3 },
      { id: 5, content: "Pilot results", supports: 3 },
    ],
  };

  return (
    <div className="relative min-h-screen bg-slate-50">
      <ChapterNavigation />

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
        <div className="w-full max-w-6xl">
          {/* Title */}
          <motion.h1
            animate={{ y: 0, opacity: 1 }}
            className="mb-2 text-center font-bold text-4xl md:text-5xl"
            initial={{ y: 20, opacity: 0 }}
            style={{ color: BRAND.navy }}
          >
            Testing Your Pyramid
          </motion.h1>

          <motion.p
            animate={{ y: 0, opacity: 1 }}
            className="mb-12 text-center text-slate-500 text-xl"
            initial={{ y: 20, opacity: 0 }}
            transition={{ delay: 0.1 }}
          >
            Two logic tests every argument must pass
          </motion.p>

          {/* Main Content: Pyramid + Side Panel */}
          <div className="flex gap-10">
            {/* Pyramid Visualization */}
            <motion.div
              animate={{ scale: 1, opacity: 1 }}
              className="flex-1"
              initial={{ scale: 0.95, opacity: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative flex flex-col items-center">
                {/* Level 0: Main Point */}
                <div className="relative z-10 w-full max-w-md">
                  <motion.div
                    className="relative rounded-2xl p-6 text-center shadow-lg"
                    style={{ backgroundColor: BRAND.coral }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="font-bold text-white/70 text-xs uppercase tracking-wider">
                      Main Point
                    </p>
                    <h3 className="mt-2 font-bold text-white text-xl">
                      {pyramidData.answer.content}
                    </h3>
                  </motion.div>
                </div>

                {/* Spacer + Vertical Arrow */}
                <div className="relative flex h-16 w-full max-w-3xl items-center justify-center">
                  {/* Connection lines */}
                  <svg
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="none"
                  >
                    <line
                      stroke={
                        logicMode === "vertical" ? BRAND.tealDark : "#cbd5e1"
                      }
                      strokeOpacity={logicMode === "vertical" ? 1 : 0.5}
                      strokeWidth="2"
                      x1="50%"
                      x2="16.67%"
                      y1="0"
                      y2="100%"
                    />
                    <line
                      stroke={
                        logicMode === "vertical" ? BRAND.tealDark : "#cbd5e1"
                      }
                      strokeOpacity={logicMode === "vertical" ? 1 : 0.5}
                      strokeWidth="2"
                      x1="50%"
                      x2="50%"
                      y1="0"
                      y2="100%"
                    />
                    <line
                      stroke={
                        logicMode === "vertical" ? BRAND.tealDark : "#cbd5e1"
                      }
                      strokeOpacity={logicMode === "vertical" ? 1 : 0.5}
                      strokeWidth="2"
                      x1="50%"
                      x2="83.33%"
                      y1="0"
                      y2="100%"
                    />
                  </svg>

                  {/* Single "Why?" indicator for vertical mode */}
                  <AnimatePresence>
                    {logicMode === "vertical" && (
                      <motion.div
                        animate={{ opacity: 1, scale: 1 }}
                        className="group relative z-10"
                        exit={{ opacity: 0, scale: 0.8 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                      >
                        <motion.div
                          animate={{ y: [3, -3, 3] }}
                          className="flex h-8 w-8 cursor-default items-center justify-center rounded-full shadow-lg"
                          style={{ backgroundColor: BRAND.tealDark }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 1.5,
                            ease: "easeInOut",
                          }}
                        >
                          <ArrowUp className="h-4 w-4 text-white" />
                        </motion.div>
                        {/* Tooltip */}
                        <div
                          className="pointer-events-none absolute -top-10 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-lg px-3 py-1.5 font-semibold text-white text-xs opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
                          style={{ backgroundColor: BRAND.tealDark }}
                        >
                          Read bottom-up: "Why/How?"
                          <div
                            className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45"
                            style={{ backgroundColor: BRAND.tealDark }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Level 1: Arguments */}
                <div className="relative z-10 flex w-full max-w-3xl gap-4">
                  {pyramidData.arguments.map((arg, i) => (
                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      className="group relative flex-1 cursor-pointer rounded-xl p-5 text-center shadow-md transition-all hover:shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      key={arg.id}
                      onMouseEnter={() => setHoveredArg(arg.id)}
                      onMouseLeave={() => setHoveredArg(null)}
                      style={{ backgroundColor: BRAND.navy }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <p className="font-semibold text-sm text-white">
                        {arg.content}
                      </p>

                      {/* Tooltip showing "Why?" answer for vertical mode */}
                      <AnimatePresence>
                        {logicMode === "vertical" && hoveredArg === arg.id && (
                          <motion.div
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -top-12 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-lg px-3 py-2 font-medium text-white text-xs shadow-lg"
                            exit={{ opacity: 0, y: 5 }}
                            initial={{ opacity: 0, y: 5 }}
                            style={{ backgroundColor: BRAND.tealDark }}
                          >
                            {arg.why}
                            <div
                              className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45"
                              style={{ backgroundColor: BRAND.tealDark }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Tooltip showing MECE check for horizontal mode */}
                      <AnimatePresence>
                        {logicMode === "horizontal" &&
                          hoveredArg === arg.id && (
                            <motion.div
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute -top-14 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-lg px-3 py-2 font-medium text-white text-xs shadow-lg"
                              exit={{ opacity: 0, y: 5 }}
                              initial={{ opacity: 0, y: 5 }}
                              style={{ backgroundColor: BRAND.coral }}
                            >
                              <div className="flex items-center gap-1.5">
                                <CheckCircle2 className="h-3 w-3" />
                                <span>{arg.mece}</span>
                              </div>
                              <div
                                className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45"
                                style={{ backgroundColor: BRAND.coral }}
                              />
                            </motion.div>
                          )}
                      </AnimatePresence>

                      {/* Horizontal arrows between arguments */}
                      <AnimatePresence>
                        {logicMode === "horizontal" &&
                          i < pyramidData.arguments.length - 1 && (
                            <motion.div
                              animate={{ opacity: 1, scale: 1 }}
                              className="absolute top-1/2 -right-3 z-20 translate-x-1/2 -translate-y-1/2"
                              exit={{ opacity: 0, scale: 0 }}
                              initial={{ opacity: 0, scale: 0 }}
                            >
                              <motion.div
                                animate={{ x: [0, 3, 0] }}
                                className="flex h-6 w-6 items-center justify-center rounded-full shadow-md"
                                style={{ backgroundColor: BRAND.coral }}
                                transition={{
                                  repeat: Number.POSITIVE_INFINITY,
                                  duration: 1,
                                  delay: i * 0.15,
                                }}
                              >
                                <ArrowRight className="h-3.5 w-3.5 text-white" />
                              </motion.div>
                            </motion.div>
                          )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                {/* Spacer */}
                <div className="h-8" />

                {/* Level 2: Evidence */}
                <div className="relative z-10 flex w-full justify-center gap-3">
                  {pyramidData.evidence.map((ev, i) => (
                    <motion.div
                      animate={{ opacity: 1, scale: 1 }}
                      className={`rounded-lg px-4 py-2.5 font-medium text-sm shadow-sm transition-all ${
                        hoveredArg === ev.supports && logicMode === "vertical"
                          ? "ring-2 ring-offset-1"
                          : ""
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      key={ev.id}
                      style={{
                        backgroundColor:
                          hoveredArg === ev.supports && logicMode === "vertical"
                            ? `${BRAND.teal}35`
                            : `${BRAND.teal}18`,
                        color: BRAND.tealDark,
                        ...(hoveredArg === ev.supports &&
                        logicMode === "vertical"
                          ? { boxShadow: `0 0 0 2px ${BRAND.tealDark}` }
                          : {}),
                      }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                    >
                      {ev.content}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Side Panel: Logic Mode Selector */}
            <motion.div
              animate={{ x: 0, opacity: 1 }}
              className="w-72 flex-shrink-0"
              initial={{ x: 20, opacity: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Mode Toggle Cards */}
              <div className="space-y-3">
                <button
                  className={`w-full rounded-2xl p-4 text-left transition-all ${
                    logicMode === "vertical"
                      ? "shadow-lg ring-2"
                      : "bg-white shadow-sm hover:shadow-md"
                  }`}
                  onClick={() => setLogicMode("vertical")}
                  style={{
                    backgroundColor:
                      logicMode === "vertical" ? `${BRAND.teal}10` : undefined,
                    ...(logicMode === "vertical"
                      ? ({
                          "--tw-ring-color": BRAND.tealDark,
                        } as React.CSSProperties)
                      : {}),
                  }}
                  type="button"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor:
                          logicMode === "vertical" ? BRAND.tealDark : "#e2e8f0",
                      }}
                    >
                      <ArrowUp
                        className="h-4 w-4"
                        style={{
                          color: logicMode === "vertical" ? "white" : "#64748b",
                        }}
                      />
                    </div>
                    <div>
                      <span
                        className="block font-bold"
                        style={{
                          color:
                            logicMode === "vertical"
                              ? BRAND.tealDark
                              : "#64748b",
                        }}
                      >
                        Vertical Logic
                      </span>
                      <span
                        className="text-xs"
                        style={{
                          color:
                            logicMode === "vertical"
                              ? BRAND.tealDark
                              : "#94a3b8",
                        }}
                      >
                        Bottom-up "Why/How?"
                      </span>
                    </div>
                  </div>
                  {/* Expanded explanation when selected */}
                  <AnimatePresence>
                    {logicMode === "vertical" && (
                      <motion.div
                        animate={{ height: "auto", opacity: 1 }}
                        className="overflow-hidden"
                        exit={{ height: 0, opacity: 0 }}
                        initial={{ height: 0, opacity: 0 }}
                      >
                        <div className="mt-3 space-y-2 border-slate-200 border-t pt-3">
                          <p className="text-slate-600 text-xs leading-relaxed">
                            <strong className="text-slate-700">Test:</strong>{" "}
                            Each level answers "Why?" or "How?" for the level
                            above. Your audience can follow the logic chain.
                          </p>
                          <p className="text-slate-500 text-xs leading-relaxed">
                            <strong className="text-red-400">Avoid:</strong>{" "}
                            Top-down assertions without supporting evidence.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

                <button
                  className={`w-full rounded-2xl p-4 text-left transition-all ${
                    logicMode === "horizontal"
                      ? "shadow-lg ring-2"
                      : "bg-white shadow-sm hover:shadow-md"
                  }`}
                  onClick={() => setLogicMode("horizontal")}
                  style={{
                    backgroundColor:
                      logicMode === "horizontal"
                        ? `${BRAND.coral}10`
                        : undefined,
                    ...(logicMode === "horizontal"
                      ? ({
                          "--tw-ring-color": BRAND.coral,
                        } as React.CSSProperties)
                      : {}),
                  }}
                  type="button"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor:
                          logicMode === "horizontal" ? BRAND.coral : "#e2e8f0",
                      }}
                    >
                      <ArrowRight
                        className="h-4 w-4"
                        style={{
                          color:
                            logicMode === "horizontal" ? "white" : "#64748b",
                        }}
                      />
                    </div>
                    <div>
                      <span
                        className="block font-bold"
                        style={{
                          color:
                            logicMode === "horizontal"
                              ? BRAND.coral
                              : "#64748b",
                        }}
                      >
                        Horizontal Logic
                      </span>
                      <span
                        className="text-xs"
                        style={{
                          color:
                            logicMode === "horizontal"
                              ? BRAND.coral
                              : "#94a3b8",
                        }}
                      >
                        Same-level grouping
                      </span>
                    </div>
                  </div>
                  {/* Expanded explanation when selected */}
                  <AnimatePresence>
                    {logicMode === "horizontal" && (
                      <motion.div
                        animate={{ height: "auto", opacity: 1 }}
                        className="overflow-hidden"
                        exit={{ height: 0, opacity: 0 }}
                        initial={{ height: 0, opacity: 0 }}
                      >
                        <div className="mt-3 space-y-2 border-slate-200 border-t pt-3">
                          <p className="text-slate-600 text-xs leading-relaxed">
                            <strong className="text-slate-700">Why:</strong>{" "}
                            Arguments must be distinct and together cover all
                            bases. No redundancy, no gaps.
                          </p>
                          <p className="text-slate-500 text-xs leading-relaxed">
                            <strong className="text-red-400">Avoid:</strong>{" "}
                            Overlapping points that say the same thing, or
                            missing obvious counterarguments.
                          </p>
                          <div className="mt-2 flex justify-start">
                            <span
                              className="inline-flex items-center gap-1 rounded-full px-2 py-1 font-semibold text-xs"
                              style={{
                                backgroundColor: `${BRAND.coral}15`,
                                color: BRAND.coral,
                              }}
                            >
                              <CheckCircle2 className="h-3 w-3" />
                              MECE
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
