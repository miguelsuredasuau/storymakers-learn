"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Compass,
  Equal,
  Layers,
  Lightbulb,
  Play,
  Plus,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AssetImage } from "@/components/deck/AssetImage";
import { ChapterNavigation } from "@/features/method/components";
import { BRAND } from "@/features/method/constants";

type ViewMode = "compare" | "deductive" | "inductive";

export default function Step2_3Page() {
  const [viewMode, setViewMode] = useState<ViewMode>("compare");

  // Deductive state
  const [deductiveStep, setDeductiveStep] = useState(0);
  const [deductivePlaying, setDeductivePlaying] = useState(false);

  // Inductive state
  const [swanCount, setSwanCount] = useState(0);
  const [showInductiveConclusion, setShowInductiveConclusion] = useState(false);
  const [inductivePlaying, setInductivePlaying] = useState(false);

  const comparisons = [
    {
      label: "Direction",
      deductive: "Top-down: Rule → Case → Conclusion",
      inductive: "Bottom-up: Cases → Pattern → Conclusion",
    },
    {
      label: "Certainty",
      deductive: "Guaranteed (if premises true)",
      inductive: "Probable (never 100%)",
    },
    {
      label: "Best for",
      deductive: "Audience accepts your premise",
      inductive: "Skeptical audience needs evidence",
    },
  ];

  const deductiveData = {
    major: {
      label: "Rule (Major Premise)",
      text: "All products with <10% margin get discontinued",
    },
    minor: { label: "Case (Minor Premise)", text: "Product X has 6% margin" },
    conclusion: {
      label: "Conclusion",
      text: "Therefore, Product X should be discontinued",
    },
  };

  const swans = [
    { id: 1, label: "#1" },
    { id: 2, label: "#2" },
    { id: 3, label: "#3" },
    { id: 4, label: "#100" },
    { id: 5, label: "#1,000" },
  ];

  // Deductive animation - slower for drama
  useEffect(() => {
    if (deductivePlaying && deductiveStep < 3) {
      const timer = setTimeout(() => setDeductiveStep((s) => s + 1), 1200);
      return () => clearTimeout(timer);
    }
    if (deductiveStep >= 3) {
      setDeductivePlaying(false);
    }
  }, [deductivePlaying, deductiveStep]);

  // Inductive animation
  useEffect(() => {
    if (inductivePlaying && swanCount < swans.length) {
      const timer = setTimeout(() => setSwanCount((c) => c + 1), 700);
      return () => clearTimeout(timer);
    }
    if (
      inductivePlaying &&
      swanCount >= swans.length &&
      !showInductiveConclusion
    ) {
      const timer = setTimeout(() => {
        setShowInductiveConclusion(true);
        setInductivePlaying(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [inductivePlaying, swanCount, showInductiveConclusion]);

  const resetDeductive = () => {
    setDeductiveStep(0);
    setDeductivePlaying(false);
  };

  const resetInductive = () => {
    setSwanCount(0);
    setShowInductiveConclusion(false);
    setInductivePlaying(false);
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
        <div className="w-full max-w-5xl">
          <motion.h1
            animate={{ y: 0, opacity: 1 }}
            className="mb-2 text-center font-bold text-4xl md:text-5xl"
            initial={{ y: 20, opacity: 0 }}
            style={{ color: BRAND.navy }}
          >
            Logical Flows
          </motion.h1>

          <motion.p
            animate={{ y: 0, opacity: 1 }}
            className="mb-6 text-center text-slate-500 text-xl"
            initial={{ y: 20, opacity: 0 }}
            transition={{ delay: 0.1 }}
          >
            Two ways to connect your arguments
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
              Vertical logic test:{" "}
              <span style={{ color: BRAND.coral }}>
                How do you prove each level supports the one above?
              </span>
            </p>
          </motion.div>

          {/* View Mode Selector */}
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            className="mb-8 flex justify-center gap-2"
            initial={{ y: 20, opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button
              className={`rounded-full px-5 py-2.5 font-semibold text-sm transition-all ${
                viewMode === "compare"
                  ? "bg-slate-800 text-white shadow-md"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
              onClick={() => setViewMode("compare")}
              type="button"
            >
              Compare
            </button>
            <button
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold text-sm transition-all ${
                viewMode === "deductive"
                  ? "text-white shadow-md"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
              onClick={() => {
                setViewMode("deductive");
                resetDeductive();
              }}
              style={{
                backgroundColor:
                  viewMode === "deductive" ? BRAND.coral : undefined,
              }}
              type="button"
            >
              <ArrowDown className="h-4 w-4" />
              Deductive
            </button>
            <button
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold text-sm transition-all ${
                viewMode === "inductive"
                  ? "text-white shadow-md"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
              onClick={() => {
                setViewMode("inductive");
                resetInductive();
              }}
              style={{
                backgroundColor:
                  viewMode === "inductive" ? BRAND.tealDark : undefined,
              }}
              type="button"
            >
              <ArrowUp className="h-4 w-4" />
              Inductive
            </button>
          </motion.div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            {viewMode === "compare" && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl bg-white p-8 shadow-xl"
                exit={{ opacity: 0, y: -20 }}
                initial={{ opacity: 0, y: 20 }}
                key="compare"
              >
                {/* Comparison Headers */}
                <div className="mb-6 grid grid-cols-[140px_1fr_1fr] gap-4">
                  <div />
                  <div
                    className="flex items-center justify-center gap-2 rounded-xl p-3"
                    style={{ backgroundColor: `${BRAND.coral}10` }}
                  >
                    <ArrowDown
                      className="h-5 w-5"
                      style={{ color: BRAND.coral }}
                    />
                    <span className="font-bold" style={{ color: BRAND.coral }}>
                      Deductive
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-center gap-2 rounded-xl p-3"
                    style={{ backgroundColor: `${BRAND.teal}10` }}
                  >
                    <ArrowUp
                      className="h-5 w-5"
                      style={{ color: BRAND.tealDark }}
                    />
                    <span
                      className="font-bold"
                      style={{ color: BRAND.tealDark }}
                    >
                      Inductive
                    </span>
                  </div>
                </div>

                {/* Comparison Rows */}
                {comparisons.map((row, i) => (
                  <motion.div
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-3 grid grid-cols-[140px_1fr_1fr] gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    key={row.label}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <div className="flex items-center">
                      <span className="font-semibold text-slate-500 text-sm">
                        {row.label}
                      </span>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-slate-700 text-sm">{row.deductive}</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-slate-700 text-sm">{row.inductive}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {viewMode === "deductive" && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl bg-white p-8 shadow-xl"
                exit={{ opacity: 0, y: -20 }}
                initial={{ opacity: 0, y: 20 }}
                key="deductive"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ backgroundColor: BRAND.coral }}
                    >
                      <ArrowDown className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold" style={{ color: BRAND.coral }}>
                        Deductive Logic
                      </h3>
                      <p className="text-slate-500 text-sm">
                        If premises are true, conclusion must be true
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="flex items-center gap-2 rounded-full bg-green-500 px-5 py-2.5 font-semibold text-sm text-white transition-all hover:bg-green-600 disabled:opacity-50"
                      disabled={deductivePlaying}
                      onClick={() => {
                        resetDeductive();
                        setTimeout(() => setDeductivePlaying(true), 100);
                      }}
                      type="button"
                    >
                      <Play className="h-4 w-4" />
                      Play
                    </button>
                    <button
                      className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2.5 font-semibold text-slate-600 text-sm transition-all hover:bg-slate-200"
                      onClick={resetDeductive}
                      type="button"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Deductive Flow - Improved Visual */}
                <div className="mx-auto max-w-2xl space-y-2">
                  {/* Major Premise */}
                  <motion.div
                    animate={{
                      scale: deductiveStep >= 1 ? 1 : 0.95,
                      opacity: deductiveStep >= 1 ? 1 : 0.4,
                    }}
                    className="relative overflow-hidden rounded-2xl p-6 transition-all"
                    style={{
                      backgroundColor:
                        deductiveStep >= 1 ? BRAND.coral : "#e2e8f0",
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <AnimatePresence>
                      {deductiveStep >= 1 && (
                        <motion.div
                          animate={{ x: 0 }}
                          className="absolute inset-y-0 left-0 w-2 bg-white/30"
                          initial={{ x: "-100%" }}
                        />
                      )}
                    </AnimatePresence>
                    <p
                      className={`font-bold text-xs uppercase tracking-wider ${deductiveStep >= 1 ? "text-white/70" : "text-slate-400"}`}
                    >
                      {deductiveData.major.label}
                    </p>
                    <p
                      className={`mt-2 font-bold text-lg ${deductiveStep >= 1 ? "text-white" : "text-slate-400"}`}
                    >
                      {deductiveData.major.text}
                    </p>
                  </motion.div>

                  {/* Connector 1 */}
                  <div className="flex items-center justify-center py-1">
                    <motion.div
                      animate={{
                        opacity: deductiveStep >= 1 ? 1 : 0.3,
                        scale: deductiveStep === 1 ? [1, 1.2, 1] : 1,
                      }}
                      className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2"
                      transition={{ duration: 0.5 }}
                    >
                      <ArrowDown className="h-4 w-4 text-slate-500" />
                      <Plus className="h-4 w-4 text-slate-500" />
                    </motion.div>
                  </div>

                  {/* Minor Premise */}
                  <motion.div
                    animate={{
                      scale: deductiveStep >= 2 ? 1 : 0.95,
                      opacity: deductiveStep >= 2 ? 1 : 0.4,
                    }}
                    className="relative overflow-hidden rounded-2xl p-6 transition-all"
                    style={{
                      backgroundColor:
                        deductiveStep >= 2 ? BRAND.navy : "#e2e8f0",
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <AnimatePresence>
                      {deductiveStep >= 2 && (
                        <motion.div
                          animate={{ x: 0 }}
                          className="absolute inset-y-0 left-0 w-2 bg-white/30"
                          initial={{ x: "-100%" }}
                        />
                      )}
                    </AnimatePresence>
                    <p
                      className={`font-bold text-xs uppercase tracking-wider ${deductiveStep >= 2 ? "text-white/70" : "text-slate-400"}`}
                    >
                      {deductiveData.minor.label}
                    </p>
                    <p
                      className={`mt-2 font-bold text-lg ${deductiveStep >= 2 ? "text-white" : "text-slate-400"}`}
                    >
                      {deductiveData.minor.text}
                    </p>
                  </motion.div>

                  {/* Connector 2 */}
                  <div className="flex items-center justify-center py-1">
                    <motion.div
                      animate={{
                        opacity: deductiveStep >= 2 ? 1 : 0.3,
                        scale: deductiveStep === 2 ? [1, 1.2, 1] : 1,
                        backgroundColor:
                          deductiveStep >= 3 ? "#dcfce7" : "#f1f5f9",
                      }}
                      className="flex items-center gap-2 rounded-full px-4 py-2"
                      transition={{ duration: 0.5 }}
                    >
                      <ArrowDown
                        className={`h-4 w-4 ${deductiveStep >= 3 ? "text-green-600" : "text-slate-500"}`}
                      />
                      <Equal
                        className={`h-4 w-4 ${deductiveStep >= 3 ? "text-green-600" : "text-slate-500"}`}
                      />
                    </motion.div>
                  </div>

                  {/* Conclusion */}
                  <motion.div
                    animate={{
                      scale: deductiveStep >= 3 ? 1.02 : 0.95,
                      opacity: deductiveStep >= 3 ? 1 : 0.4,
                    }}
                    className="relative overflow-hidden rounded-2xl p-6 transition-all"
                    style={{
                      backgroundColor:
                        deductiveStep >= 3 ? BRAND.tealDark : "#e2e8f0",
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <AnimatePresence>
                      {deductiveStep >= 3 && (
                        <>
                          <motion.div
                            animate={{ x: 0 }}
                            className="absolute inset-y-0 left-0 w-2 bg-white/40"
                            initial={{ x: "-100%" }}
                          />
                          <motion.div
                            animate={{ scale: 1, rotate: 0 }}
                            className="absolute top-4 right-4"
                            initial={{ scale: 0, rotate: -180 }}
                            transition={{ delay: 0.2, type: "spring" }}
                          >
                            <Sparkles className="h-6 w-6 text-yellow-300" />
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                    <p
                      className={`font-bold text-xs uppercase tracking-wider ${deductiveStep >= 3 ? "text-white/70" : "text-slate-400"}`}
                    >
                      {deductiveData.conclusion.label}
                    </p>
                    <p
                      className={`mt-2 font-bold text-xl ${deductiveStep >= 3 ? "text-white" : "text-slate-400"}`}
                    >
                      {deductiveData.conclusion.text}
                    </p>
                  </motion.div>
                </div>

                {/* Success message */}
                <AnimatePresence>
                  {deductiveStep >= 3 && (
                    <motion.div
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      className="mx-auto mt-6 flex max-w-2xl items-start gap-3 rounded-xl bg-green-50 p-4"
                      initial={{ y: 20, opacity: 0, scale: 0.9 }}
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                      <p className="text-green-700 text-sm">
                        <strong>Guaranteed:</strong> If both premises are true,
                        the conclusion is inevitable. Use when your audience
                        already accepts the rule.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {viewMode === "inductive" && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl bg-white p-8 shadow-xl"
                exit={{ opacity: 0, y: -20 }}
                initial={{ opacity: 0, y: 20 }}
                key="inductive"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ backgroundColor: BRAND.tealDark }}
                    >
                      <ArrowUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3
                        className="font-bold"
                        style={{ color: BRAND.tealDark }}
                      >
                        Inductive Logic
                      </h3>
                      <p className="text-slate-500 text-sm">
                        Observe patterns, infer conclusions
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 font-semibold text-sm text-white transition-all hover:bg-amber-600 disabled:opacity-50"
                      disabled={inductivePlaying}
                      onClick={() => {
                        resetInductive();
                        setTimeout(() => setInductivePlaying(true), 100);
                      }}
                      type="button"
                    >
                      <Play className="h-4 w-4" />
                      Play
                    </button>
                    <button
                      className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2.5 font-semibold text-slate-600 text-sm transition-all hover:bg-slate-200"
                      onClick={resetInductive}
                      type="button"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Swan Visual + Observations */}
                <div className="grid gap-6 md:grid-cols-[180px_1fr]">
                  {/* Swan Image */}
                  <div className="relative overflow-hidden rounded-2xl">
                    <AssetImage
                      alt="White swan"
                      assetId="90ded7c6-c859-48d7-8a0d-3cd4ef4bb6c5"
                      className="h-full min-h-[180px] w-full object-cover"
                      imgWidth={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <p className="absolute bottom-3 left-3 font-bold text-sm text-white">
                      The Swan Problem
                    </p>
                  </div>

                  {/* Swan Observations */}
                  <div
                    className="rounded-2xl border-2 border-dashed p-5"
                    style={{
                      borderColor: BRAND.teal,
                      backgroundColor: `${BRAND.teal}08`,
                    }}
                  >
                    <p
                      className="mb-4 text-center font-bold text-xs uppercase tracking-wider"
                      style={{ color: BRAND.tealDark }}
                    >
                      Observations ({swanCount} of {swans.length})
                    </p>

                    {/* Swan Grid */}
                    <div className="flex min-h-[100px] flex-wrap justify-center gap-3">
                      <AnimatePresence>
                        {swans.slice(0, swanCount).map((swan, _i) => (
                          <motion.div
                            animate={{ scale: 1, rotate: 0, y: 0 }}
                            className="flex flex-col items-center gap-1 rounded-xl bg-white p-3 shadow-md"
                            initial={{ scale: 0, rotate: -20, y: 30 }}
                            key={swan.id}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 15,
                            }}
                          >
                            <span className="text-3xl">🦢</span>
                            <span className="font-bold text-slate-500 text-xs">
                              Swan {swan.label}
                            </span>
                            <span className="font-medium text-[10px] text-slate-400">
                              is white
                            </span>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      {swanCount === 0 && (
                        <div className="flex items-center justify-center">
                          <p className="text-slate-400 text-sm">
                            Click Play to observe swans
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center py-4">
                  <motion.div
                    animate={{
                      opacity: swanCount > 0 ? 1 : 0.3,
                      scale: showInductiveConclusion ? 1.1 : 1,
                      y: showInductiveConclusion ? -5 : 0,
                    }}
                    className="flex items-center gap-2 rounded-full px-5 py-2.5"
                    style={{
                      backgroundColor: showInductiveConclusion
                        ? `${BRAND.teal}25`
                        : `${BRAND.teal}15`,
                    }}
                  >
                    <ArrowUp
                      className="h-5 w-5"
                      style={{ color: BRAND.tealDark }}
                    />
                    <span
                      className="font-bold text-sm"
                      style={{ color: BRAND.tealDark }}
                    >
                      {swanCount >= swans.length
                        ? "Pattern recognized!"
                        : "Pattern emerging..."}
                    </span>
                  </motion.div>
                </div>

                {/* Conclusion */}
                <AnimatePresence>
                  {showInductiveConclusion ? (
                    <motion.div
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      className="space-y-4"
                      initial={{ scale: 0.8, opacity: 0, y: 20 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                    >
                      <div
                        className="relative overflow-hidden rounded-2xl p-6 text-center shadow-lg ring-4 ring-amber-300"
                        style={{ backgroundColor: BRAND.coral }}
                      >
                        <motion.div
                          animate={{ scale: 1 }}
                          className="absolute top-4 right-4"
                          initial={{ scale: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Lightbulb className="h-6 w-6 text-yellow-300" />
                        </motion.div>
                        <p className="font-bold text-white/70 text-xs uppercase tracking-wider">
                          Conclusion
                        </p>
                        <p className="mt-2 font-bold text-white text-xl">
                          Therefore, all swans are white
                        </p>
                      </div>

                      <motion.div
                        animate={{ y: 0, opacity: 1 }}
                        className="flex items-start gap-3 rounded-xl bg-orange-50 p-4"
                        initial={{ y: 10, opacity: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600" />
                        <div>
                          <p className="font-bold text-orange-700">
                            But wait...
                          </p>
                          <p className="text-orange-600 text-sm">
                            Until you discover a black swan in Australia!
                            Inductive conclusions are <strong>probable</strong>,
                            not certain.
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <div className="rounded-2xl border-2 border-slate-200 border-dashed bg-slate-50 p-6 text-center">
                      <p className="text-slate-400 text-sm">
                        Conclusion appears after observing the pattern...
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
