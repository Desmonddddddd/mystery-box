"use client";

import { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BoxTier, RewardItem } from "@/types";
import { useOpeningStore } from "@/stores/openingStore";
import { getBoxByTier } from "@/data/boxes";
import ItemReveal from "./ItemReveal";
import RevealSummary from "./RevealSummary";
import Confetti from "./Confetti";

interface BoxAnimationProps {
  boxTier: BoxTier;
  items: RewardItem[];
  /** Called with the items the user kept (sold-back items excluded). */
  onComplete: (keptItems: RewardItem[]) => void;
}

export default function BoxAnimation({
  boxTier,
  items,
  onComplete,
}: BoxAnimationProps) {
  const phase = useOpeningStore((s) => s.phase);
  const nextPhase = useOpeningStore((s) => s.nextPhase);
  const currentRevealIndex = useOpeningStore((s) => s.currentItemIndex);
  const revealNextItem = useOpeningStore((s) => s.revealNextItem);
  const reset = useOpeningStore((s) => s.reset);
  const startOpening = useOpeningStore((s) => s.startOpening);

  const box = getBoxByTier(boxTier);
  const hasLegendary = items.some((item) => item.rarity === "legendary");
  const soldIndicesRef = useRef<number[]>([]);

  // Honest rarity tease: the shake glow is tinted by the best rarity
  // actually inside this haul (gold shake = legendary incoming).
  const bestRarity = hasLegendary
    ? "legendary"
    : items.some((i) => i.rarity === "epic")
      ? "epic"
      : items.some((i) => i.rarity === "rare")
        ? "rare"
        : "common";
  const shakeGlow: Record<string, string> = {
    legendary: "rgba(245, 158, 11, 0.85)",
    epic: "rgba(139, 92, 246, 0.85)",
    rare: "rgba(59, 130, 246, 0.8)",
    common: "rgba(236, 72, 153, 0.8)",
  };
  const shakePulse: Record<string, [string, string]> = {
    legendary: ["rgba(245,158,11,0.12)", "rgba(245,158,11,0.25)"],
    epic: ["rgba(139,92,246,0.12)", "rgba(139,92,246,0.22)"],
    rare: ["rgba(59,130,246,0.1)", "rgba(59,130,246,0.2)"],
    common: ["rgba(139,92,246,0.1)", "rgba(236,72,153,0.2)"],
  };
  const [pulseA, pulseB] = shakePulse[bestRarity];

  // Start opening on mount
  useEffect(() => {
    if (phase === "idle") {
      startOpening(boxTier, items);
    }
  }, [phase, startOpening, boxTier, items]);

  // Phase auto-advance
  useEffect(() => {
    const timers: Record<string, number> = {
      anticipation: 2000,
      shake: 1500,
      burst: 800,
    };

    const duration = timers[phase];

    if (duration) {
      const timer = setTimeout(() => nextPhase(), duration);
      return () => clearTimeout(timer);
    }
  }, [phase, nextPhase]);

  // Auto-reveal items in sequence
  useEffect(() => {
    if (phase !== "reveal") return;
    if (currentRevealIndex >= items.length) return; // summary will be triggered by store

    const timer = setTimeout(() => revealNextItem(), 1500);
    return () => clearTimeout(timer);
  }, [phase, currentRevealIndex, items.length, revealNextItem]);

  const handleRevealItem = useCallback(() => {
    if (currentRevealIndex < items.length - 1) {
      revealNextItem();
    }
  }, [currentRevealIndex, items.length, revealNextItem]);

  const handleComplete = useCallback(() => {
    const kept = items.filter(
      (_, index) => !soldIndicesRef.current.includes(index)
    );
    reset();
    onComplete(kept);
  }, [reset, onComplete, items]);

  return (
    <div className="fixed inset-0 z-[200] bg-[#0a0a0f]/95 backdrop-blur-xl flex items-center justify-center">
      <Confetti trigger={hasLegendary && phase === "reveal" && currentRevealIndex === items.length - 1} />

      <AnimatePresence mode="wait">
        {/* Phase 1: Anticipation */}
        {phase === "anticipation" && (
          <motion.div
            key="anticipation"
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
          >
            <motion.div
              className="text-8xl sm:text-9xl mb-8"
              animate={{
                scale: [1, 1.1, 1],
                filter: [
                  `drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))`,
                  `drop-shadow(0 0 40px rgba(236, 72, 153, 0.7))`,
                  `drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))`,
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {box?.emoji ?? "📦"}
            </motion.div>
            <p className="text-xl text-white/60 font-medium">
              Opening your box...
            </p>
            {/* Floating particles */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-purple-400/50"
                style={{
                  left: `${30 + Math.random() * 40}%`,
                  bottom: `${10 + Math.random() * 20}%`,
                }}
                animate={{
                  y: [-20, -200],
                  opacity: [1, 0],
                  x: [0, (Math.random() - 0.5) * 60],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Phase 2: Shake */}
        {phase === "shake" && (
          <motion.div
            key="shake"
            className="flex flex-col items-center text-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-8xl sm:text-9xl mb-8"
              animate={{
                x: [0, -8, 8, -12, 12, -6, 6, 0],
                rotate: [0, -3, 3, -5, 5, -2, 2, 0],
              }}
              transition={{ duration: 0.4, repeat: Infinity }}
              style={{
                filter: `drop-shadow(0 0 60px ${shakeGlow[bestRarity]})`,
              }}
            >
              {box?.emoji ?? "📦"}
            </motion.div>
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  `radial-gradient(circle at center, ${pulseA} 0%, transparent 70%)`,
                  `radial-gradient(circle at center, ${pulseB} 0%, transparent 70%)`,
                  `radial-gradient(circle at center, ${pulseA} 0%, transparent 70%)`,
                ],
              }}
              transition={{ duration: 0.3, repeat: Infinity }}
            />
          </motion.div>
        )}

        {/* Phase 3: Burst */}
        {phase === "burst" && (
          <motion.div
            key="burst"
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8 }}
          />
        )}

        {/* Phase 4: Reveal */}
        {phase === "reveal" && (
          <motion.div
            key="reveal"
            className="w-full max-w-4xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Your Rewards
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {items.map((item, index) => (
                <ItemReveal
                  key={item.id + index}
                  item={item}
                  index={index}
                  isRevealed={index <= currentRevealIndex}
                  isNext={index === currentRevealIndex + 1}
                  onReveal={handleRevealItem}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Phase 5: Summary */}
        {phase === "summary" && (
          <motion.div
            key="summary"
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <RevealSummary
              items={items}
              boxTier={boxTier}
              onSoldChange={(sold) => {
                soldIndicesRef.current = sold;
              }}
            />
            <div className="text-center mt-6">
              <button
                onClick={handleComplete}
                className="text-white/40 text-sm hover:text-white/60 transition-colors underline"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
