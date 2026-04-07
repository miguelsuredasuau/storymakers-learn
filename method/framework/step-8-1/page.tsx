"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Check,
  Eye,
  MessageSquare,
  PieChart,
  Table,
} from "lucide-react";
import { useState } from "react";
import { ChapterNavigation } from "@/features/method/components";
import { BRAND } from "@/features/method/constants";

// Step types
type StepId = 1 | 2 | 3;

// Raw data for the example
const RAW_DATA = [
  { channel: "Direct", hotel1: 50, hotel2: 25 },
  { channel: "OTAs", hotel1: 40, hotel2: 65 },
  { channel: "Other", hotel1: 10, hotel2: 10 },
];

// Large chart visualizations for step 3
function LargePieChart() {
  return (
    <div className="flex items-center gap-6">
      <svg className="h-32 w-32" viewBox="0 0 100 100">
        {/* Hotel 1 Pie */}
        <circle cx="50" cy="50" fill="#f1f5f9" r="45" />
        <path d="M50 5 A45 45 0 0 1 95 50 L50 50 Z" fill={BRAND.tealDark} />
        <path d="M95 50 A45 45 0 0 1 14.6 77 L50 50 Z" fill={BRAND.coral} />
        <path d="M14.6 77 A45 45 0 0 1 50 5 L50 50 Z" fill="#94a3b8" />
        <text
          className="fill-white font-bold text-[8px]"
          textAnchor="middle"
          x="50"
          y="55"
        >
          50%
        </text>
      </svg>
      <div className="text-left">
        <p className="font-bold text-sm" style={{ color: BRAND.navy }}>
          Hotel 1 Channel Mix
        </p>
        <div className="mt-2 space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: BRAND.tealDark }}
            />
            <span>Direct: 50%</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: BRAND.coral }}
            />
            <span>OTAs: 40%</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="h-2 w-2 rounded-full bg-slate-400" />
            <span>Other: 10%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LargeBarChart() {
  return (
    <div className="w-full">
      <p className="mb-3 font-bold text-sm" style={{ color: BRAND.navy }}>
        Direct Sales Comparison
      </p>
      <div className="space-y-3">
        <div>
          <div className="mb-1 flex justify-between text-xs">
            <span>Hotel 1</span>
            <span className="font-bold" style={{ color: BRAND.tealDark }}>
              50%
            </span>
          </div>
          <div className="h-6 rounded-full bg-slate-100">
            <motion.div
              animate={{ width: "50%" }}
              className="h-full rounded-full"
              initial={{ width: 0 }}
              style={{ backgroundColor: BRAND.tealDark }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>
        </div>
        <div>
          <div className="mb-1 flex justify-between text-xs">
            <span>Hotel 2</span>
            <span className="font-bold" style={{ color: BRAND.coral }}>
              25%
            </span>
          </div>
          <div className="h-6 rounded-full bg-slate-100">
            <motion.div
              animate={{ width: "25%" }}
              className="h-full rounded-full"
              initial={{ width: 0 }}
              style={{ backgroundColor: BRAND.coral }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          </div>
        </div>
      </div>
      <p
        className="mt-3 text-center font-semibold text-sm"
        style={{ color: BRAND.tealDark }}
      >
        Hotel 1 has 2x more direct sales
      </p>
    </div>
  );
}

function LargeLineChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const _values = [30, 35, 32, 40, 45, 50];
  return (
    <div className="w-full">
      <p className="mb-3 font-bold text-sm" style={{ color: BRAND.navy }}>
        Direct Sales Over Time
      </p>
      <div className="relative h-28">
        <svg className="h-full w-full" viewBox="0 0 200 80">
          {/* Grid lines */}
          <line
            stroke="#e2e8f0"
            strokeWidth="1"
            x1="20"
            x2="190"
            y1="70"
            y2="70"
          />
          <line
            stroke="#e2e8f0"
            strokeDasharray="4"
            strokeWidth="1"
            x1="20"
            x2="190"
            y1="40"
            y2="40"
          />
          <line
            stroke="#e2e8f0"
            strokeDasharray="4"
            strokeWidth="1"
            x1="20"
            x2="190"
            y1="10"
            y2="10"
          />

          {/* Line */}
          <polyline
            fill="none"
            points="30,58 60,50 90,54 120,40 150,30 180,20"
            stroke={BRAND.tealDark}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />

          {/* Points */}
          {[30, 60, 90, 120, 150, 180].map((x, i) => (
            <circle
              cx={x}
              cy={[58, 50, 54, 40, 30, 20][i]}
              fill={BRAND.coral}
              // biome-ignore lint/suspicious/noArrayIndexKey: Static display list
              key={i}
              r="4"
            />
          ))}

          {/* X-axis labels */}
          {months.map((m, i) => (
            <text
              className="fill-slate-500 text-[8px]"
              key={m}
              textAnchor="middle"
              x={30 + i * 30}
              y="78"
            >
              {m}
            </text>
          ))}
        </svg>
      </div>
      <p
        className="mt-2 text-center font-semibold text-sm"
        style={{ color: BRAND.tealDark }}
      >
        Revenue grew 67% from Jan to Jun
      </p>
    </div>
  );
}

function LargeColumnChart() {
  const buckets = ["0-20%", "20-40%", "40-60%", "60-80%", "80-100%"];
  const counts = [2, 8, 5, 3, 1];
  const maxCount = Math.max(...counts);
  return (
    <div className="w-full">
      <p className="mb-3 font-bold text-sm" style={{ color: BRAND.navy }}>
        Distribution of Direct Sales
      </p>
      <div className="flex h-24 items-end justify-center gap-2">
        {buckets.map((b, i) => (
          <div className="flex flex-col items-center" key={b}>
            <motion.div
              animate={{ height: `${(counts[i] / maxCount) * 80}px` }}
              className="w-10 rounded-t"
              initial={{ height: 0 }}
              style={{
                backgroundColor: i === 1 ? BRAND.coral : BRAND.tealDark,
              }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            />
            <span className="mt-1 text-[9px] text-slate-500">{b}</span>
          </div>
        ))}
      </div>
      <p
        className="mt-3 text-center font-semibold text-sm"
        style={{ color: BRAND.tealDark }}
      >
        Most hotels have 20-40% direct sales
      </p>
    </div>
  );
}

function LargeScatterChart() {
  const points = [
    { x: 20, y: 70, marketing: 10, sales: 15 },
    { x: 40, y: 55, marketing: 20, sales: 25 },
    { x: 55, y: 45, marketing: 30, sales: 35 },
    { x: 70, y: 35, marketing: 40, sales: 45 },
    { x: 85, y: 30, marketing: 50, sales: 50 },
    { x: 100, y: 22, marketing: 60, sales: 58 },
    { x: 120, y: 18, marketing: 70, sales: 62 },
  ];
  return (
    <div className="w-full">
      <p className="mb-3 font-bold text-sm" style={{ color: BRAND.navy }}>
        Marketing vs Sales
      </p>
      <div className="relative h-28">
        <svg className="h-full w-full" viewBox="0 0 150 90">
          {/* Axes */}
          <line
            stroke="#e2e8f0"
            strokeWidth="1"
            x1="25"
            x2="140"
            y1="80"
            y2="80"
          />
          <line
            stroke="#e2e8f0"
            strokeWidth="1"
            x1="25"
            x2="25"
            y1="10"
            y2="80"
          />

          {/* Trend line */}
          <line
            opacity="0.5"
            stroke={BRAND.coral}
            strokeDasharray="4"
            strokeWidth="2"
            x1="28"
            x2="130"
            y1="75"
            y2="15"
          />

          {/* Points */}
          {points.map((p, i) => (
            <circle
              cx={p.x}
              cy={p.y}
              fill={BRAND.tealDark}
              // biome-ignore lint/suspicious/noArrayIndexKey: Static display list
              key={i}
              opacity="0.8"
              r="5"
            />
          ))}

          {/* Labels */}
          <text
            className="fill-slate-500 text-[8px]"
            textAnchor="middle"
            x="85"
            y="90"
          >
            Marketing Spend ($K)
          </text>
          <text
            className="fill-slate-500 text-[8px]"
            textAnchor="middle"
            transform="rotate(-90, 8, 45)"
            x="8"
            y="45"
          >
            Sales ($K)
          </text>
        </svg>
      </div>
      <p
        className="mt-2 text-center font-semibold text-sm"
        style={{ color: BRAND.tealDark }}
      >
        Higher marketing correlates with higher sales
      </p>
    </div>
  );
}

// Chart visualizations for each message type
const MESSAGE_CHARTS: Record<string, React.ReactNode> = {
  composition: <LargePieChart />,
  ranking: <LargeBarChart />,
  trend: <LargeLineChart />,
  distribution: <LargeColumnChart />,
  relationship: <LargeScatterChart />,
};

// Messages (objectives)
const MESSAGES = [
  {
    id: "composition",
    text: "Show what % of total something represents",
    example: "Direct sales represent 50% of revenue",
    comparison: "component",
  },
  {
    id: "ranking",
    text: "Compare items to show which is bigger",
    example: "Hotel 1 has 2x more direct bookings",
    comparison: "item",
  },
  {
    id: "trend",
    text: "Show how something changed over time",
    example: "Revenue grew 67% from Jan to Jun",
    comparison: "time",
  },
  {
    id: "distribution",
    text: "Show how data is distributed",
    example: "Most hotels have 20-40% direct sales",
    comparison: "frequency",
  },
  {
    id: "relationship",
    text: "Show if two things are related",
    example: "Higher marketing spend correlates with sales",
    comparison: "correlation",
  },
];

// Comparison types
const COMPARISONS = [
  {
    id: "component",
    label: "Component",
    question: "What % of total?",
    charts: ["Pie", "Bar"],
    color: BRAND.coral,
  },
  {
    id: "item",
    label: "Item",
    question: "Which is bigger?",
    charts: ["Bar", "Column"],
    color: BRAND.tealDark,
  },
  {
    id: "time",
    label: "Time Series",
    question: "How did it change?",
    charts: ["Line", "Column"],
    color: BRAND.navy,
  },
  {
    id: "frequency",
    label: "Frequency",
    question: "How is it distributed?",
    charts: ["Column", "Line"],
    color: BRAND.teal,
  },
  {
    id: "correlation",
    label: "Correlation",
    question: "Are they related?",
    charts: ["Scatter"],
    color: BRAND.coral,
  },
];

// Steps configuration
const STEPS = [
  {
    id: 1,
    label: "Message",
    subtitle: "What's your objective?",
    icon: MessageSquare,
    color: BRAND.coral,
  },
  {
    id: 2,
    label: "Comparison",
    subtitle: "What type of data?",
    icon: BarChart3,
    color: BRAND.tealDark,
  },
  {
    id: 3,
    label: "Chart",
    subtitle: "Best visualization",
    icon: PieChart,
    color: BRAND.navy,
  },
];

export default function Step8_1Page() {
  const [currentStep, setCurrentStep] = useState<StepId>(1);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  // Derive comparison from selected message
  const derivedComparison = MESSAGES.find(
    (m) => m.id === selectedMessage
  )?.comparison;
  const activeComparison = COMPARISONS.find((c) => c.id === derivedComparison);

  const handleMessageSelect = (messageId: string) => {
    setSelectedMessage(messageId);
    setTimeout(() => setCurrentStep(2), 400);
  };

  const handleStep2Continue = () => {
    setCurrentStep(3);
  };

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
            Choose the Right Visual
          </motion.h1>

          <motion.p
            animate={{ y: 0, opacity: 1 }}
            className="mb-8 text-center text-slate-500 text-xl"
            initial={{ y: 20, opacity: 0 }}
            transition={{ delay: 0.1 }}
          >
            Message → Comparison → Chart
          </motion.p>

          {/* Main Content Card */}
          <motion.div
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100"
            initial={{ scale: 0.95, opacity: 0 }}
            transition={{ delay: 0.15 }}
          >
            {/* Step Pills */}
            <div className="mb-8 flex justify-center gap-3">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isPast = currentStep > step.id;
                const isClickable =
                  step.id === 1 ||
                  (step.id === 2 && selectedMessage) ||
                  (step.id === 3 && selectedMessage);

                return (
                  <div className="flex items-center gap-3" key={step.id}>
                    <button
                      className={`flex items-center gap-3 rounded-full px-5 py-3 transition-all ${
                        isActive
                          ? "shadow-lg"
                          : isPast
                            ? "bg-slate-100"
                            : "bg-slate-50 opacity-50"
                      } ${isClickable && !isActive ? "cursor-pointer hover:bg-slate-100" : ""}`}
                      disabled={!isClickable}
                      onClick={() =>
                        isClickable && setCurrentStep(step.id as StepId)
                      }
                      style={{
                        backgroundColor: isActive ? step.color : undefined,
                      }}
                      type="button"
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          isActive ? "bg-white/20" : isPast ? "bg-white" : ""
                        }`}
                        style={{
                          backgroundColor: isPast ? step.color : undefined,
                        }}
                      >
                        {isPast ? (
                          <Check className="h-4 w-4 text-white" />
                        ) : (
                          <Icon
                            className="h-4 w-4"
                            style={{ color: isActive ? "white" : "#94a3b8" }}
                          />
                        )}
                      </div>
                      <div className="text-left">
                        <p
                          className="font-bold text-sm leading-tight"
                          style={{
                            color: isActive
                              ? "white"
                              : isPast
                                ? step.color
                                : "#64748b",
                          }}
                        >
                          {step.label}
                        </p>
                        <p
                          className="text-xs leading-tight"
                          style={{
                            color: isActive
                              ? "rgba(255,255,255,0.8)"
                              : "#94a3b8",
                          }}
                        >
                          {step.subtitle}
                        </p>
                      </div>
                    </button>

                    {i < STEPS.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-slate-300" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              {/* Step 1: Message with Raw Data */}
              {currentStep === 1 && (
                <motion.div
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  initial={{ opacity: 0, x: 20 }}
                  key="step1"
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid gap-6 md:grid-cols-[200px_1fr]">
                    {/* Raw Data Table */}
                    <div className="rounded-xl bg-slate-50 p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <Table className="h-4 w-4 text-slate-400" />
                        <p className="font-bold text-slate-400 text-xs uppercase tracking-wider">
                          Raw Data
                        </p>
                      </div>
                      <table className="w-full text-xs">
                        <thead>
                          <tr>
                            <th className="pb-2 text-left text-slate-500">
                              Channel
                            </th>
                            <th className="pb-2 text-center text-slate-600">
                              H1
                            </th>
                            <th className="pb-2 text-center text-slate-600">
                              H2
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {RAW_DATA.map((row) => (
                            <tr key={row.channel}>
                              <td
                                className="py-1.5 font-medium"
                                style={{
                                  color:
                                    row.channel === "Direct"
                                      ? BRAND.tealDark
                                      : row.channel === "OTAs"
                                        ? BRAND.coral
                                        : "#94a3b8",
                                }}
                              >
                                {row.channel}
                              </td>
                              <td className="py-1.5 text-center">
                                {row.hotel1}%
                              </td>
                              <td className="py-1.5 text-center">
                                {row.hotel2}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="mt-3 text-center text-[10px] text-slate-400">
                        Same data, different stories
                      </p>
                    </div>

                    {/* Message Options */}
                    <div>
                      <p className="mb-4 font-medium text-slate-500 text-sm">
                        What story do you want to tell?
                      </p>
                      <div className="space-y-2">
                        {MESSAGES.map((message) => (
                          <button
                            className={`w-full rounded-xl p-3 text-left transition-all ${
                              selectedMessage === message.id
                                ? "shadow-lg ring-2"
                                : "bg-slate-50 hover:bg-slate-100"
                            }`}
                            key={message.id}
                            onClick={() => handleMessageSelect(message.id)}
                            style={{
                              backgroundColor:
                                selectedMessage === message.id
                                  ? `${BRAND.coral}10`
                                  : undefined,
                              boxShadow:
                                selectedMessage === message.id
                                  ? `0 0 0 2px ${BRAND.coral}`
                                  : undefined,
                            }}
                            type="button"
                          >
                            <p
                              className="font-semibold text-sm"
                              style={{ color: BRAND.navy }}
                            >
                              {message.text}
                            </p>
                            <p className="mt-0.5 text-slate-500 text-xs">
                              → "{message.example}"
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Comparison */}
              {currentStep === 2 && (
                <motion.div
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  initial={{ opacity: 0, x: 20 }}
                  key="step2"
                  transition={{ duration: 0.3 }}
                >
                  <p className="mb-4 text-center font-medium text-slate-500 text-sm">
                    Based on your message, this is your comparison type:
                  </p>

                  {/* Selected message reminder */}
                  {selectedMessage && (
                    <div
                      className="mb-6 rounded-xl p-4 text-center"
                      style={{ backgroundColor: `${BRAND.coral}10` }}
                    >
                      <p className="text-slate-500 text-xs">Your message:</p>
                      <p
                        className="font-semibold"
                        style={{ color: BRAND.coral }}
                      >
                        "
                        {
                          MESSAGES.find((m) => m.id === selectedMessage)
                            ?.example
                        }
                        "
                      </p>
                    </div>
                  )}

                  {/* Comparison types grid */}
                  <div className="mb-6 grid grid-cols-5 gap-3">
                    {COMPARISONS.map((comp) => {
                      const isActive = comp.id === derivedComparison;
                      return (
                        <div
                          className={`rounded-xl p-4 text-center transition-all ${
                            isActive
                              ? "shadow-lg ring-2"
                              : "bg-slate-50 opacity-50"
                          }`}
                          key={comp.id}
                          style={{
                            backgroundColor: isActive
                              ? `${comp.color}15`
                              : undefined,
                            boxShadow: isActive
                              ? `0 0 0 2px ${comp.color}`
                              : undefined,
                          }}
                        >
                          <p
                            className="font-bold text-sm"
                            style={{ color: isActive ? comp.color : "#94a3b8" }}
                          >
                            {comp.label}
                          </p>
                          <p className="mt-1 text-slate-500 text-xs">
                            {comp.question}
                          </p>
                          {isActive && (
                            <motion.div
                              animate={{ scale: 1 }}
                              className="mx-auto mt-2 flex h-6 w-6 items-center justify-center rounded-full"
                              initial={{ scale: 0 }}
                              style={{ backgroundColor: comp.color }}
                            >
                              <Check className="h-4 w-4 text-white" />
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-center">
                    <button
                      className="flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white transition-all hover:opacity-90"
                      onClick={handleStep2Continue}
                      style={{ backgroundColor: BRAND.tealDark }}
                      type="button"
                    >
                      See the Chart
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Chart Visualization */}
              {currentStep === 3 && selectedMessage && (
                <motion.div
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  initial={{ opacity: 0, x: 20 }}
                  key="step3"
                  transition={{ duration: 0.3 }}
                >
                  <p className="mb-6 text-center font-medium text-slate-500 text-sm">
                    Best chart for{" "}
                    <span
                      className="font-bold"
                      style={{ color: activeComparison?.color }}
                    >
                      {activeComparison?.label}
                    </span>{" "}
                    comparison:
                  </p>

                  {/* Large Chart Visualization */}
                  <div
                    className="mb-6 flex justify-center rounded-2xl p-6"
                    style={{ backgroundColor: `${activeComparison?.color}08` }}
                  >
                    {MESSAGE_CHARTS[selectedMessage]}
                  </div>

                  {/* Message displayed */}
                  <div
                    className="mb-6 rounded-xl p-4 text-center"
                    style={{ backgroundColor: `${BRAND.tealDark}10` }}
                  >
                    <p className="text-slate-500 text-xs">Your insight:</p>
                    <p
                      className="font-bold text-lg"
                      style={{ color: BRAND.tealDark }}
                    >
                      "{MESSAGES.find((m) => m.id === selectedMessage)?.example}
                      "
                    </p>
                  </div>

                  {/* Final insight */}
                  <div
                    className="rounded-xl p-5 text-center"
                    style={{ backgroundColor: `${BRAND.navy}08` }}
                  >
                    <p
                      className="font-bold text-lg"
                      style={{ color: BRAND.navy }}
                    >
                      The chart doesn't determine the message.
                    </p>
                    <p className="text-lg" style={{ color: BRAND.coral }}>
                      The message determines the chart.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
