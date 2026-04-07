"use client";

import { motion } from "framer-motion";
import { Eye, Sparkles } from "lucide-react";
import { useState } from "react";
import { ChapterNavigation } from "@/features/method/components";
import { BRAND } from "@/features/method/constants";
import { ChartPreview } from "@/features/method/framework/step8/ChartPreview";
import { InkSlider } from "@/features/method/framework/step8/InkSlider";

export default function Step8_2Page() {
  const [inkRatio, setInkRatio] = useState(100);

  return (
    <div className="relative min-h-screen bg-slate-50">
      <ChapterNavigation />

      {/* Background pattern */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(${BRAND.tealDark} 1.5px, transparent 1.5px)`,
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
          style={{ backgroundColor: BRAND.tealDark }}
        >
          8
        </div>
        <div className="text-left">
          <p
            className="font-bold text-xs uppercase tracking-wider"
            style={{ color: BRAND.tealDark }}
          >
            Slide Level
          </p>
          <p className="flex items-center gap-1 text-slate-500 text-xs">
            Led by the{" "}
            <Eye className="h-3 w-3" style={{ color: BRAND.tealDark }} />
            <span style={{ color: BRAND.tealDark, fontWeight: 600 }}>
              Designer
            </span>
          </p>
        </div>
      </motion.div>

      <div className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <motion.h1
            animate={{ y: 0, opacity: 1 }}
            className="mb-2 text-center font-bold text-4xl md:text-5xl"
            initial={{ y: 20, opacity: 0 }}
            style={{ color: BRAND.navy }}
          >
            Data-Ink Ratio
          </motion.h1>

          <motion.p
            animate={{ y: 0, opacity: 1 }}
            className="mb-4 text-center text-slate-500 text-xl"
            initial={{ y: 20, opacity: 0 }}
            transition={{ delay: 0.1 }}
          >
            Maximize the share of ink devoted to data
          </motion.p>

          {/* Banner */}
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            className="mx-auto mb-8 flex max-w-2xl items-center justify-center gap-3 rounded-2xl px-6 py-4"
            initial={{ y: -10, opacity: 0 }}
            style={{ backgroundColor: `${BRAND.tealDark}12` }}
            transition={{ delay: 0.15 }}
          >
            <Sparkles
              className="h-6 w-6 flex-shrink-0"
              style={{ color: BRAND.tealDark }}
            />
            <p
              className="text-center font-bold text-lg"
              style={{ color: BRAND.navy }}
            >
              Tufte's Rule:{" "}
              <span style={{ color: BRAND.tealDark }}>
                Every pixel should convey information
              </span>
            </p>
          </motion.div>

          {/* Main Content */}
          <motion.div
            animate={{ scale: 1, opacity: 1 }}
            className="overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-100"
            initial={{ scale: 0.95, opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Chart Preview */}
            <ChartPreview inkRatio={inkRatio} />

            {/* Ink Slider with dynamic tooltips */}
            <div className="pt-6">
              <InkSlider onChange={setInkRatio} value={inkRatio} />
            </div>

            {/* Status Indicator */}
            <motion.div className="mt-4 flex justify-center" layout>
              <div
                className="rounded-full px-6 py-2 font-semibold text-sm transition-colors"
                style={{
                  backgroundColor:
                    inkRatio < 30
                      ? `${BRAND.teal}15`
                      : inkRatio < 60
                        ? `${BRAND.coral}15`
                        : `${BRAND.coral}25`,
                  color: inkRatio < 30 ? BRAND.tealDark : BRAND.coral,
                }}
              >
                {inkRatio < 15
                  ? "Excellent - Maximum clarity"
                  : inkRatio < 30
                    ? "Good - Clean and focused"
                    : inkRatio < 50
                      ? "Fair - Some clutter remains"
                      : inkRatio < 70
                        ? "Poor - Too much non-data ink"
                        : "Bad - Chart junk overload"}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
