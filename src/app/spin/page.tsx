"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  Clock,
  Gift,
  Zap,
  Trophy,
  Hand,
  CircleDot,
} from "lucide-react";
import Link from "next/link";
import { useGamificationStore } from "@/stores/gamificationStore";
import { useUserStore } from "@/stores/userStore";
import { SPIN_SEGMENTS } from "@/lib/constants";

// --- Speed curve helpers ---
// The light follows a bell-curve speed profile over the total duration:
//   slow → fast → slow.  The position is computed via an easing function
//   so the "total laps" feel consistent regardless of frame rate.
//
// We parameterise by "total revolutions" and "duration".

const TOTAL_DURATION_MS = 7000; // ~7 seconds of action
const TOTAL_REVOLUTIONS = 6; // how many full laps the light does
const SEGMENT_COUNT = SPIN_SEGMENTS.length;

/**
 * Easing: slow-fast-slow  (a smooth S-curve).
 * Maps t ∈ [0,1] → progress ∈ [0,1] with ease-in-out-sine.
 */
function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

/**
 * Given elapsed ms, return which segment index the light is currently on.
 */
function getActiveSegment(elapsedMs: number): number {
  const t = Math.min(elapsedMs / TOTAL_DURATION_MS, 1);
  const progress = easeInOutSine(t);
  const totalSegments = TOTAL_REVOLUTIONS * SEGMENT_COUNT;
  const pos = progress * totalSegments;
  return Math.floor(pos) % SEGMENT_COUNT;
}

export default function SpinPage() {
  // --- Store hooks ---
  const canSpinToday = useGamificationStore((s) => s.canSpinToday);
  const spinResult = useGamificationStore((s) => s.spinResult);
  const streak = useGamificationStore((s) => s.dailyStreak);
  const recordSpin = useGamificationStore((s) => s.recordSpin);
  const incrementStreak = useGamificationStore((s) => s.incrementStreak);
  const resetSpinIfNewDay = useGamificationStore((s) => s.resetSpinIfNewDay);

  const addCredits = useUserStore((s) => s.addCredits);
  const isLoggedIn = useUserStore((s) => s.profile.isLoggedIn);

  const hasSpunToday = !canSpinToday();

  // --- Local state ---
  const [mounted, setMounted] = useState(false);

  // Game phases: "idle" | "running" | "stopped"
  const [phase, setPhase] = useState<"idle" | "running" | "stopped">("idle");
  const [activeIndex, setActiveIndex] = useState<number>(-1); // lit segment
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Refs for the animation loop
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // --- Effects ---
  useEffect(() => {
    setMounted(true);
    resetSpinIfNewDay();
  }, [resetSpinIfNewDay]);

  // Show persisted spin result from today
  useEffect(() => {
    if (mounted && hasSpunToday && spinResult) {
      setResult(spinResult);
      setShowResult(true);
      setPhase("stopped");
    }
  }, [mounted, hasSpunToday, spinResult]);

  // Clean up rAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // --- Animation loop ---
  const tick = useCallback(
    (timestamp: number) => {
      const elapsed = timestamp - startTimeRef.current;

      if (elapsed >= TOTAL_DURATION_MS) {
        // Time ran out – auto-stop on whatever segment we're on
        const finalIdx = getActiveSegment(TOTAL_DURATION_MS - 16); // last frame
        setActiveIndex(finalIdx);
        setPhase("stopped");
        finalize(finalIdx);
        return;
      }

      const idx = getActiveSegment(elapsed);
      setActiveIndex(idx);
      rafRef.current = requestAnimationFrame(tick);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // --- Handlers ---

  /** Start the light */
  const handleStart = useCallback(() => {
    if (phase !== "idle" || hasSpunToday) return;
    setShowResult(false);
    setResult(null);
    setPhase("running");
    startTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
  }, [phase, hasSpunToday, tick]);

  /** Stop the light – player clicks */
  const handleStop = useCallback(() => {
    if (phase !== "running") return;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    setPhase("stopped");
    finalize(activeIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, activeIndex]);

  /** Finalize: record the result, give credits, etc. */
  const finalize = useCallback(
    (segmentIdx: number) => {
      const winner = SPIN_SEGMENTS[segmentIdx];
      if (!winner) return;
      setResult(winner.label);
      setShowResult(true);
      recordSpin(winner.label);
      incrementStreak();
      if (winner.value > 0 && isLoggedIn) {
        addCredits(winner.value);
      }
    },
    [recordSpin, incrementStreak, addCredits, isLoggedIn],
  );

  // --- Derived ---
  const segmentAngle = 360 / SEGMENT_COUNT;

  if (!mounted) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-neon-pink/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-neon-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold neon-text mb-4">
            Daily Spin
          </h1>
          <p className="text-lg text-gray-400 max-w-lg mx-auto">
            Stop the light at the perfect moment to win big! Build your streak
            for bonus multipliers.
          </p>
        </motion.div>

        {/* Streak Display */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-6 mb-12"
        >
          <div className="glass rounded-xl px-6 py-3 flex items-center gap-3">
            <Flame className="w-5 h-5 text-neon-red" />
            <div>
              <p className="text-xs text-gray-400">Daily Streak</p>
              <p className="text-lg font-bold text-white">{streak} days</p>
            </div>
          </div>
          <div className="glass rounded-xl px-6 py-3 flex items-center gap-3">
            <Trophy className="w-5 h-5 text-neon-yellow" />
            <div>
              <p className="text-xs text-gray-400">Best Streak</p>
              <p className="text-lg font-bold text-white">{streak} days</p>
            </div>
          </div>
        </motion.div>

        {/* ============= SKILL WHEEL ============= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          {/* Wheel container */}
          <div className="relative mb-8">
            {/* Outer glow ring */}
            <div className="absolute -inset-3 rounded-full animate-pulse-glow opacity-60" />

            {/* Stationary wheel */}
            <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full relative overflow-hidden border-4 border-white/10">
              {SPIN_SEGMENTS.map((segment, i) => {
                const startAngle = i * segmentAngle;
                const midAngle = startAngle + segmentAngle / 2;
                const isLit = activeIndex === i;

                return (
                  <div
                    key={i}
                    className="absolute w-full h-full top-0 left-0 transition-[filter] duration-100"
                    style={{
                      clipPath: `polygon(50% 50%, ${50 + 50 * Math.sin((startAngle * Math.PI) / 180)}% ${50 - 50 * Math.cos((startAngle * Math.PI) / 180)}%, ${50 + 50 * Math.sin(((startAngle + segmentAngle) * Math.PI) / 180)}% ${50 - 50 * Math.cos(((startAngle + segmentAngle) * Math.PI) / 180)}%)`,
                      backgroundColor: segment.color,
                      opacity: phase === "idle" ? 1 : isLit ? 1 : 0.3,
                      filter: isLit
                        ? `brightness(1.4) drop-shadow(0 0 18px ${segment.color})`
                        : "brightness(0.6)",
                    }}
                  >
                    {/* Segment label */}
                    <div
                      className="absolute text-[10px] sm:text-xs font-bold text-white whitespace-nowrap drop-shadow-md"
                      style={{
                        top: "20%",
                        left: "50%",
                        transformOrigin: "0 calc(50% / 0.3)",
                        transform: `rotate(${midAngle}deg) translateX(-50%)`,
                      }}
                    >
                      {segment.label}
                    </div>
                  </div>
                );
              })}

              {/* Center circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-dark-950 border-4 border-white/20 flex items-center justify-center z-10">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-neon-yellow" />
              </div>
            </div>

            {/* ---- Rotating indicator dot on the OUTSIDE of the wheel ---- */}
            {phase === "running" && activeIndex >= 0 && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Position the dot around the rim */}
                <motion.div
                  className="absolute"
                  style={{
                    // Centre of wheel
                    top: "50%",
                    left: "50%",
                    // Move dot to rim position for activeIndex
                    transform: (() => {
                      const angle =
                        activeIndex * segmentAngle + segmentAngle / 2;
                      const rad = (angle * Math.PI) / 180;
                      // radius slightly larger than half-wheel to sit outside
                      const r = 54; // % of half the container
                      const x = Math.sin(rad) * r;
                      const y = -Math.cos(rad) * r;
                      return `translate(calc(-50% + ${x}%), calc(-50% + ${y}%))`;
                    })(),
                  }}
                  key={activeIndex}
                  initial={{ scale: 0.6, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.06 }}
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white shadow-[0_0_20px_6px_rgba(236,72,153,0.9),0_0_60px_20px_rgba(139,92,246,0.5)]" />
                </motion.div>
              </div>
            )}

            {/* Winning indicator – stays visible after stop */}
            {phase === "stopped" && activeIndex >= 0 && !hasSpunToday && (
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  className="absolute"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: (() => {
                      const angle =
                        activeIndex * segmentAngle + segmentAngle / 2;
                      const rad = (angle * Math.PI) / 180;
                      const r = 54;
                      const x = Math.sin(rad) * r;
                      const y = -Math.cos(rad) * r;
                      return `translate(calc(-50% + ${x}%), calc(-50% + ${y}%))`;
                    })(),
                  }}
                  initial={{ scale: 1.5 }}
                  animate={{ scale: [1.5, 1, 1.2, 1] }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white shadow-[0_0_24px_8px_rgba(16,185,129,0.9),0_0_80px_30px_rgba(16,185,129,0.4)]" />
                </motion.div>
              </div>
            )}
          </div>

          {/* Instruction text */}
          <AnimatePresence mode="wait">
            {phase === "running" && (
              <motion.p
                key="inst-running"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-sm text-neon-pink font-medium mb-4 tracking-wide"
              >
                <CircleDot className="w-4 h-4 inline mr-1 animate-pulse" />
                Watch the light — tap STOP at the right moment!
              </motion.p>
            )}
            {phase === "idle" && !hasSpunToday && (
              <motion.p
                key="inst-idle"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-sm text-gray-500 mb-4"
              >
                Press START to begin — then stop the light on your prize!
              </motion.p>
            )}
          </AnimatePresence>

          {/* ---- Action Button ---- */}
          {phase === "running" ? (
            /* STOP button — pulsing red */
            <motion.button
              key="stop-btn"
              onClick={handleStop}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="px-12 py-5 rounded-2xl font-extrabold text-xl text-white
                         flex items-center gap-3
                         hover:scale-105 active:scale-90 transition-transform"
              style={{
                background: "linear-gradient(135deg, #EF4444, #DC2626)",
                boxShadow:
                  "0 0 30px 8px rgba(239,68,68,0.5), 0 0 80px 20px rgba(239,68,68,0.2)",
                animation: "pulse-stop 0.8s ease-in-out infinite",
              }}
            >
              <Hand className="w-6 h-6" />
              STOP!
            </motion.button>
          ) : (
            <button
              onClick={handleStart}
              disabled={hasSpunToday}
              className={`px-10 py-4 rounded-2xl font-bold text-lg text-white transition-all duration-200 flex items-center gap-2 ${
                hasSpunToday
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105 active:scale-95 animate-pulse-glow"
              }`}
              style={{
                background: hasSpunToday
                  ? "#4B5563"
                  : "linear-gradient(135deg, #EC4899, #8B5CF6, #3B82F6)",
              }}
            >
              {hasSpunToday ? (
                <>
                  <Clock className="w-5 h-5" />
                  Come Back Tomorrow!
                </>
              ) : phase === "stopped" ? (
                <>
                  <Gift className="w-5 h-5" />
                  Done!
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  SPIN NOW
                </>
              )}
            </button>
          )}
        </motion.div>

        {/* Result */}
        <AnimatePresence>
          {showResult && result && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-12 text-center"
            >
              <div className="glass rounded-2xl p-8 max-w-md mx-auto border border-neon-purple/20">
                <div className="w-16 h-16 rounded-full bg-neon-green/10 flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-neon-green" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  You Won!
                </h3>
                <p className="text-3xl font-bold neon-text mb-4">{result}</p>
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

        {/* Info / Milestones */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gray-500 mb-6">
            Come back every day for another spin! Build your streak for extra
            rewards.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {[
              { days: "3 days", reward: "2x Credits", emoji: "🔥" },
              { days: "7 days", reward: "Free Basic Box", emoji: "📦" },
              { days: "14 days", reward: "Free Silver Box", emoji: "🥈" },
              { days: "30 days", reward: "Free Gold Box", emoji: "🥇" },
            ].map((milestone) => (
              <div
                key={milestone.days}
                className="glass rounded-xl p-4 text-center"
              >
                <span className="text-2xl block mb-2">{milestone.emoji}</span>
                <p className="text-xs text-gray-400">{milestone.days}</p>
                <p className="text-sm font-semibold text-white">
                  {milestone.reward}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Pulse animation for the STOP button */}
      <style jsx>{`
        @keyframes pulse-stop {
          0%,
          100% {
            box-shadow:
              0 0 30px 8px rgba(239, 68, 68, 0.5),
              0 0 80px 20px rgba(239, 68, 68, 0.2);
          }
          50% {
            box-shadow:
              0 0 50px 14px rgba(239, 68, 68, 0.7),
              0 0 120px 40px rgba(239, 68, 68, 0.35);
          }
        }
      `}</style>
    </div>
  );
}
