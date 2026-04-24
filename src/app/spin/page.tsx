"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Gift, Zap, Trophy, Coins } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { useGamificationStore } from "@/stores/gamificationStore";
import { useUserStore } from "@/stores/userStore";
import { SPIN_SEGMENTS } from "@/lib/constants";

// ─── Constants ────────────────────────────────────────────
const SPIN_COST = 21; // gems per spin
const SEGMENT_COUNT = SPIN_SEGMENTS.length;
const SEGMENT_ANGLE = 360 / SEGMENT_COUNT;
const SPIN_DURATION_MS = 5000;
const MIN_FULL_SPINS = 5;
const WHEEL_RADIUS = 180; // SVG coordinate radius
const CENTER = 200; // SVG viewBox center
const LABEL_RADIUS = WHEEL_RADIUS * 0.62;
const LED_COUNT = 24;

// Neon colors for LED ring
const LED_COLORS = [
  "#EC4899",
  "#8B5CF6",
  "#3B82F6",
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#EC4899",
];

// ─── SVG Helpers ──────────────────────────────────────────
function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
}

function lightenColor(hex: string, amount: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lighten = (c: number) =>
    Math.min(255, Math.round(c + (255 - c) * amount));
  return `rgb(${lighten(r)}, ${lighten(g)}, ${lighten(b)})`;
}

// ─── Lion Animation Variants ──────────────────────────────
const lionVariants = {
  idle: {
    y: [0, -8, 0],
    rotate: [0, 2, -2, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
  },
  pushing: {
    x: [0, 20, -5, 0],
    rotate: [0, 15, -5, 0],
    scale: [1, 1.15, 0.95, 1],
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
  celebrating: {
    scale: [1, 1.3, 0.9, 1.2, 1],
    y: [0, -20, 0, -12, 0],
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

// ═══════════════════════════════════════════════════════════
export default function SpinPage() {
  // ── Store hooks ──
  const streak = useGamificationStore((s) => s.dailyStreak);
  const recordSpin = useGamificationStore((s) => s.recordSpin);
  const incrementStreak = useGamificationStore((s) => s.incrementStreak);

  const addGems = useUserStore((s) => s.addGems);
  const spendGems = useUserStore((s) => s.spendGems);
  const gems = useUserStore((s) => s.profile.gems);
  const isLoggedIn = useUserStore((s) => s.profile.isLoggedIn);

  const hasEnoughGems = gems >= SPIN_COST;

  // ── Local state ──
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"idle" | "spinning" | "done">("idle");
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [lionState, setLionState] = useState<
    "idle" | "pushing" | "celebrating"
  >("idle");

  // Rotation state
  const [rotation, setRotation] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const cumulativeRotation = useRef(0);
  const pendingWinnerRef = useRef<number>(0);
  const finalizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Mount ──
  useEffect(() => {
    setMounted(true);
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (finalizeTimeoutRef.current) clearTimeout(finalizeTimeoutRef.current);
    };
  }, []);

  // ── Finalize ──
  const finalize = useCallback(
    (segmentIdx: number) => {
      const winner = SPIN_SEGMENTS[segmentIdx];
      if (!winner) return;
      setResult(winner.label);
      setShowResult(true);
      setPhase("done");
      recordSpin(winner.label);
      incrementStreak();

      // Lion celebrates
      setLionState("celebrating");
      setTimeout(() => setLionState("idle"), 1500);

      if (winner.value > 0 && isLoggedIn) {
        addGems(winner.value);
      }

      // Confetti burst
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5, x: 0.5 },
        colors: ["#EC4899", "#8B5CF6", "#3B82F6", "#06B6D4", "#10B981", "#F59E0B"],
      });
      // Second burst delayed
      setTimeout(() => {
        confetti({
          particleCount: 60,
          spread: 100,
          origin: { y: 0.4, x: 0.5 },
          colors: ["#EC4899", "#8B5CF6", "#3B82F6"],
        });
      }, 300);

      // Reset phase to "idle" after showing the result so user can spin again
      setTimeout(() => {
        setPhase("idle");
      }, 2000);
    },
    [recordSpin, incrementStreak, addGems, isLoggedIn]
  );

  // ── Spin handler ──
  const handleSpin = useCallback(() => {
    if (phase !== "idle") return;

    // Charge gems
    const success = spendGems(SPIN_COST);
    if (!success) return;

    setShowResult(false);
    setResult(null);
    setPhase("spinning");

    // Lion push animation
    setLionState("pushing");
    setTimeout(() => setLionState("idle"), 700);

    // Pre-determine winner
    const winnerIndex = Math.floor(Math.random() * SEGMENT_COUNT);
    pendingWinnerRef.current = winnerIndex;

    // Calculate target rotation:
    // The pointer is at the TOP (0 degrees / 12 o'clock).
    // Segment 0 starts at 0°. To land segment `winnerIndex` at the top,
    // the wheel needs to rotate so that segment's center is at 0°.
    const segmentCenterAngle =
      winnerIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    const fullSpins = MIN_FULL_SPINS * 360;
    const targetRotation =
      cumulativeRotation.current + fullSpins + (360 - segmentCenterAngle);

    cumulativeRotation.current = targetRotation;
    setIsTransitioning(true);
    setRotation(targetRotation);

    // Fallback timeout in case transitionEnd doesn't fire
    finalizeTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      finalize(winnerIndex);
    }, SPIN_DURATION_MS + 300);
  }, [phase, spendGems, finalize]);

  // ── Transition end handler ──
  const handleTransitionEnd = useCallback(() => {
    if (finalizeTimeoutRef.current) {
      clearTimeout(finalizeTimeoutRef.current);
      finalizeTimeoutRef.current = null;
    }
    setIsTransitioning(false);
    finalize(pendingWinnerRef.current);
  }, [finalize]);

  // ── Loading ──
  if (!mounted) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 overflow-hidden">
      {/* ── Animated Background Orbs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-neon-purple/10 blur-3xl"
          animate={{
            x: ["-10%", "5%", "-10%"],
            y: ["10%", "-5%", "10%"],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "10%", left: "20%" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-neon-pink/10 blur-3xl"
          animate={{
            x: ["5%", "-8%", "5%"],
            y: ["-5%", "10%", "-5%"],
            scale: [1.1, 0.95, 1.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: "10%", right: "15%" }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full bg-neon-cyan/8 blur-3xl"
          animate={{
            x: ["-5%", "8%", "-5%"],
            y: ["5%", "-8%", "5%"],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "40%", right: "5%" }}
        />
        {/* Dot grid texture */}
        <div className="absolute inset-0 bg-dot-grid opacity-30" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold neon-text mb-4">
            Spin & Win
          </h1>
          <p className="text-lg text-gray-400 max-w-lg mx-auto">
            Spend <span className="text-neon-yellow font-bold">{SPIN_COST} gems</span> per spin and win amazing prizes! Spin unlimited times.
          </p>
        </motion.div>

        {/* ── Streak Display ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-3 sm:gap-5 mb-10 flex-wrap"
        >
          <div className="glass rounded-xl px-5 py-3 flex items-center gap-3 border border-neon-yellow/20">
            <Coins className="w-5 h-5 text-neon-yellow" />
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                Gems
              </p>
              <p className="text-lg font-bold text-white">{gems}</p>
            </div>
          </div>
          <div className="glass rounded-xl px-5 py-3 flex items-center gap-3 border border-neon-pink/20">
            <Zap className="w-5 h-5 text-neon-pink" />
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                Cost
              </p>
              <p className="text-lg font-bold text-white">{SPIN_COST}/spin</p>
            </div>
          </div>
          <div className="glass rounded-xl px-5 py-3 flex items-center gap-3 border border-neon-red/20">
            <Flame className="w-5 h-5 text-neon-red" />
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                Streak
              </p>
              <p className="text-lg font-bold text-white">{streak}</p>
            </div>
          </div>
        </motion.div>

        {/* ════════ WHEEL + LION SECTION ════════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          {/* Wheel + Lion wrapper — wheel centered, lion is decorative accent */}
          <div className="relative flex flex-col items-center justify-center mb-8">
            {/* ──── THE WHEEL ──── */}
            <div className="relative">
              {/* Outer neon glow aura */}
              <div
                className={`absolute -inset-6 rounded-full ${
                  phase === "spinning"
                    ? "animate-wheel-spin-glow"
                    : "animate-wheel-glow"
                }`}
              />

              {/* LED Ring */}
              <div className="absolute -inset-4 pointer-events-none">
                {Array.from({ length: LED_COUNT }).map((_, i) => {
                  const angle = (i * 360) / LED_COUNT;
                  const rad = ((angle - 90) * Math.PI) / 180;
                  const r = 52;
                  const x = 50 + r * Math.cos(rad);
                  const y = 50 + r * Math.sin(rad);
                  const color = LED_COLORS[i % LED_COLORS.length];
                  return (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                        backgroundColor: color,
                        boxShadow: `0 0 8px ${color}, 0 0 16px ${color}`,
                        opacity: phase === "spinning" ? 1 : 0.5,
                        animation: `led-chase 1.5s ease-in-out infinite`,
                        animationDelay: `${(i * 1.5) / LED_COUNT}s`,
                        transition: "opacity 0.3s",
                      }}
                    />
                  );
                })}
              </div>

              {/* ── Pointer Arrow (top, fixed) ── */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
                <div
                  className="w-0 h-0"
                  style={{
                    borderLeft: "14px solid transparent",
                    borderRight: "14px solid transparent",
                    borderTop: "24px solid #EC4899",
                    filter:
                      "drop-shadow(0 0 10px rgba(236,72,153,0.8)) drop-shadow(0 0 20px rgba(236,72,153,0.4))",
                  }}
                />
              </div>

              {/* ── SVG Wheel ── */}
              <div
                className="w-72 h-72 sm:w-80 sm:h-80 md:w-[26rem] md:h-[26rem] relative"
                style={{ perspective: "800px" }}
              >
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full drop-shadow-2xl"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: isTransitioning
                      ? `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.17, 0.67, 0.12, 0.99)`
                      : "none",
                  }}
                  onTransitionEnd={handleTransitionEnd}
                >
                  <defs>
                    {SPIN_SEGMENTS.map((seg, i) => (
                      <linearGradient
                        key={`grad-${i}`}
                        id={`seg-grad-${i}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor={seg.color} />
                        <stop
                          offset="100%"
                          stopColor={lightenColor(seg.color, 0.25)}
                        />
                      </linearGradient>
                    ))}
                    {/* Inner shadow */}
                    <radialGradient id="inner-shadow" cx="50%" cy="50%" r="50%">
                      <stop offset="70%" stopColor="transparent" />
                      <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
                    </radialGradient>
                    {/* Glow filter for text */}
                    <filter id="text-glow">
                      <feDropShadow
                        dx="0"
                        dy="0"
                        stdDeviation="2"
                        floodColor="rgba(0,0,0,0.8)"
                      />
                    </filter>
                  </defs>

                  {/* Outer border ring */}
                  <circle
                    cx={CENTER}
                    cy={CENTER}
                    r={WHEEL_RADIUS + 4}
                    fill="none"
                    stroke="url(#seg-grad-0)"
                    strokeWidth="3"
                    opacity="0.5"
                  />

                  {/* Segments */}
                  {SPIN_SEGMENTS.map((seg, i) => {
                    const startAngle = i * SEGMENT_ANGLE;
                    const endAngle = startAngle + SEGMENT_ANGLE;
                    const d = describeArc(
                      CENTER,
                      CENTER,
                      WHEEL_RADIUS,
                      startAngle,
                      endAngle
                    );

                    return (
                      <path
                        key={i}
                        d={d}
                        fill={`url(#seg-grad-${i})`}
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth="1.5"
                      />
                    );
                  })}

                  {/* Inner shadow overlay */}
                  <circle
                    cx={CENTER}
                    cy={CENTER}
                    r={WHEEL_RADIUS}
                    fill="url(#inner-shadow)"
                  />

                  {/* Segment Labels */}
                  {SPIN_SEGMENTS.map((seg, i) => {
                    const midAngle =
                      i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
                    const pos = polarToCartesian(
                      CENTER,
                      CENTER,
                      LABEL_RADIUS,
                      midAngle
                    );
                    // Rotate text so it reads outward from center
                    const textRotation = midAngle;

                    return (
                      <text
                        key={`label-${i}`}
                        x={pos.x}
                        y={pos.y}
                        fill="white"
                        fontSize="11"
                        fontWeight="bold"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${textRotation}, ${pos.x}, ${pos.y})`}
                        filter="url(#text-glow)"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {seg.label}
                      </text>
                    );
                  })}

                  {/* Center hub */}
                  <circle
                    cx={CENTER}
                    cy={CENTER}
                    r="38"
                    fill="#0a0a0f"
                    stroke="url(#seg-grad-2)"
                    strokeWidth="3"
                  />
                  <circle
                    cx={CENTER}
                    cy={CENTER}
                    r="32"
                    fill="#0f0f18"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                  />
                  {/* Center text */}
                  <text
                    x={CENTER}
                    y={CENTER}
                    fill="white"
                    fontSize="28"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    ⚡
                  </text>
                </svg>
              </div>
            </div>

            {/* ──── LION MASCOT (absolute positioned, doesn't affect centering) ──── */}
            <motion.div
              className="absolute -bottom-4 -right-4 sm:-bottom-2 sm:-right-6 md:-bottom-2 md:-right-8 flex flex-col items-center gap-2 z-20"
              variants={lionVariants}
              animate={lionState}
            >
              <div className="relative">
                {/* Lion glow */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-neon-purple/40 to-neon-pink/40 blur-xl animate-pulse" />
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-neon-purple/50 shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                  <Image
                    src="/images/lion-mascot.webp"
                    alt="Lion Mascot"
                    fill
                    className="object-cover object-center"
                    sizes="96px"
                  />
                </div>
                {/* Sparkle */}
                <motion.span
                  className="absolute -top-1 -right-1 text-sm"
                  animate={{ y: [0, -3, 0], rotate: [0, 15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨
                </motion.span>
              </div>
              <AnimatePresence>
                {phase === "idle" && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs text-neon-purple font-medium"
                  >
                    Spin it! 🦁
                  </motion.p>
                )}
                {phase === "spinning" && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs text-neon-pink font-medium animate-pulse"
                  >
                    Let&apos;s goooo! 🔥
                  </motion.p>
                )}
                {phase === "done" && showResult && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs text-neon-green font-medium"
                  >
                    Nice one! 🎉
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ── Action Button ── */}
          <motion.div className="mb-6 flex justify-center" layout>
            {phase === "spinning" ? (
              <div className="px-10 py-4 rounded-2xl font-bold text-lg text-white/60 bg-dark-700 border border-white/10 flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Zap className="w-5 h-5 text-neon-yellow" />
                </motion.div>
                Spinning...
              </div>
            ) : (
              <button
                onClick={handleSpin}
                disabled={!hasEnoughGems}
                className={`px-10 py-4 rounded-2xl font-bold text-lg text-white transition-all duration-200 flex items-center gap-2 ${
                  !hasEnoughGems
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-105 active:scale-95 animate-pulse-glow"
                }`}
                style={{
                  background: !hasEnoughGems
                    ? "#4B5563"
                    : "linear-gradient(135deg, #EC4899, #8B5CF6, #3B82F6)",
                }}
              >
                {!hasEnoughGems ? (
                  <>
                    <Coins className="w-5 h-5" />
                    Not Enough Gems
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    SPIN NOW — {SPIN_COST} Gems
                  </>
                )}
              </button>
            )}
          </motion.div>
        </motion.div>

        {/* ── Result Card ── */}
        <AnimatePresence>
          {showResult && result && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 text-center"
            >
              <div className="glass-strong rounded-2xl p-8 max-w-md mx-auto border border-neon-purple/30 gradient-border">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 12,
                  }}
                  className="w-18 h-18 rounded-full bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 flex items-center justify-center mx-auto mb-4 p-4"
                >
                  <Gift className="w-10 h-10 text-neon-green" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  You Won!
                </h3>
                <p className="text-3xl font-black neon-text mb-4">{result}</p>
                {isLoggedIn ? (
                  <p className="text-sm text-gray-400">
                    Reward has been added to your account.
                  </p>
                ) : (
                  <p className="text-sm text-gray-400">
                    <Link
                      href="/dashboard"
                      className="text-neon-purple hover:underline"
                    >
                      Log in
                    </Link>{" "}
                    to save your rewards!
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Milestones ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gray-500 mb-6">
            Each spin costs {SPIN_COST} gems. Win big and keep spinning!
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {[
              { days: "3 days", reward: "2x Gems", emoji: "🔥" },
              { days: "7 days", reward: "Free Basic Box", emoji: "📦" },
              { days: "14 days", reward: "Free Silver Box", emoji: "🥈" },
              { days: "30 days", reward: "Free Gold Box", emoji: "🥇" },
            ].map((milestone) => (
              <motion.div
                key={milestone.days}
                whileHover={{ scale: 1.05, y: -2 }}
                className="glass rounded-xl p-4 text-center border border-white/5 hover:border-neon-purple/20 transition-colors"
              >
                <span className="text-2xl block mb-2">{milestone.emoji}</span>
                <p className="text-xs text-gray-400">{milestone.days}</p>
                <p className="text-sm font-semibold text-white">
                  {milestone.reward}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
