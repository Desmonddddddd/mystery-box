"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Gift, ArrowRight, RotateCcw, X } from "lucide-react";
import type { BoxTier, RewardItem, Rarity } from "@/types";
import { openBox, calculateLootValue } from "@/lib/lootEngine";
import { getBoxByTier } from "@/data/boxes";
import { formatPrice, cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import GlowButton from "@/components/ui/GlowButton";

type Phase = "idle" | "shaking" | "flash" | "revealing" | "summary";

interface VirtualBoxOpeningProps {
  tier: BoxTier;
  onClose: () => void;
  onOpenAnother: () => void;
  opensCount: number;
}

const rarityStyles: Record<
  Rarity,
  { border: string; glow: string; bg: string }
> = {
  common: {
    border: "border-gray-500/40",
    glow: "",
    bg: "bg-gray-500/10",
  },
  rare: {
    border: "border-blue-500/60",
    glow: "0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.15)",
    bg: "bg-blue-500/10",
  },
  epic: {
    border: "border-purple-500/60",
    glow: "0 0 20px rgba(139, 92, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.15)",
    bg: "bg-purple-500/10",
  },
  legendary: {
    border: "border-yellow-500/60",
    glow: "0 0 25px rgba(245, 158, 11, 0.5), 0 0 50px rgba(245, 158, 11, 0.2)",
    bg: "bg-yellow-500/10",
  },
};

export default function VirtualBoxOpening({
  tier,
  onClose,
  onOpenAnother,
  opensCount,
}: VirtualBoxOpeningProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [items, setItems] = useState<RewardItem[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);

  const box = getBoxByTier(tier);

  const startOpening = useCallback(() => {
    const loot = openBox(tier);
    setItems(loot);
    setRevealedCount(0);
    setPhase("shaking");

    // Shake → Flash → Reveal
    setTimeout(() => setPhase("flash"), 1000);
    setTimeout(() => setPhase("revealing"), 1300);
  }, [tier]);

  // Auto-start on mount
  useEffect(() => {
    startOpening();
  }, [startOpening]);

  // Reveal items one at a time
  useEffect(() => {
    if (phase !== "revealing" || items.length === 0) return;

    if (revealedCount < items.length) {
      const timer = setTimeout(() => {
        setRevealedCount((c) => c + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      // All revealed → summary
      const timer = setTimeout(() => setPhase("summary"), 600);
      return () => clearTimeout(timer);
    }
  }, [phase, revealedCount, items.length]);

  if (!box) return null;

  const totalValue = calculateLootValue(items);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative w-full max-w-2xl mx-auto"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute -top-2 -right-2 z-10 p-2 rounded-full bg-white/10 border border-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 overflow-hidden">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-sm text-white/40 uppercase tracking-widest mb-1">
            Virtual Opening
          </p>
          <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
            <span className="text-2xl">{box.emoji}</span>
            {box.name}
          </h3>
        </div>

        {/* Shaking Phase */}
        <AnimatePresence mode="wait">
          {(phase === "shaking" || phase === "idle") && (
            <motion.div
              key="shaking"
              className="flex items-center justify-center py-12"
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <motion.div
                className="text-8xl select-none"
                animate={{
                  rotate: [0, -5, 5, -5, 5, -3, 3, 0],
                  scale: [1, 1.05, 1.05, 1.05, 1.05, 1.02, 1.02, 1],
                }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  repeat: 0,
                }}
              >
                {box.emoji}
              </motion.div>
            </motion.div>
          )}

          {/* Flash Phase */}
          {phase === "flash" && (
            <motion.div
              key="flash"
              className="flex items-center justify-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(236, 72, 153, 0.4), rgba(139, 92, 246, 0.2), transparent)",
                }}
              />
              <Sparkles className="w-16 h-16 text-yellow-400" />
            </motion.div>
          )}

          {/* Revealing Phase */}
          {(phase === "revealing" || phase === "summary") && (
            <motion.div
              key="items"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {items.map((item, index) => {
                  const isRevealed = index < revealedCount;
                  const style = rarityStyles[item.rarity];

                  return (
                    <motion.div
                      key={`${item.id}-${index}`}
                      initial={{ rotateY: 180, opacity: 0 }}
                      animate={
                        isRevealed
                          ? { rotateY: 0, opacity: 1 }
                          : { rotateY: 180, opacity: 0.3 }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="perspective-1000"
                    >
                      <div
                        className={cn(
                          "relative rounded-xl border-2 p-4 transition-all duration-300",
                          style.bg,
                          isRevealed ? style.border : "border-white/5"
                        )}
                        style={{
                          boxShadow: isRevealed ? style.glow : undefined,
                        }}
                      >
                        {isRevealed ? (
                          <div className="flex items-center gap-3">
                            <span className="text-2xl flex-shrink-0">
                              {item.emoji}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold text-white truncate">
                                {item.name}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge rarity={item.rarity} />
                                <span className="text-xs text-white/50">
                                  {formatPrice(item.value)}
                                </span>
                              </div>
                            </div>

                            {/* Legendary sparkle */}
                            {item.rarity === "legendary" && (
                              <motion.div
                                animate={{
                                  rotate: [0, 360],
                                  scale: [1, 1.2, 1],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              >
                                <Sparkles className="w-5 h-5 text-yellow-400" />
                              </motion.div>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/5 animate-pulse" />
                            <div className="flex-1 space-y-2">
                              <div className="h-3 w-24 rounded bg-white/5 animate-pulse" />
                              <div className="h-2 w-16 rounded bg-white/5 animate-pulse" />
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Summary */}
              <AnimatePresence>
                {phase === "summary" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="mt-6 pt-6 border-t border-white/10"
                  >
                    <div className="text-center space-y-4">
                      <div>
                        <p className="text-sm text-white/50 mb-1">
                          You could have won items worth
                        </p>
                        <motion.p
                          className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                          initial={{ scale: 0.5 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                          }}
                        >
                          {formatPrice(totalValue)}
                        </motion.p>
                        <p className="text-xs text-white/30 mt-1">
                          From a {formatPrice(box.price)} box
                        </p>
                      </div>

                      {/* Hook message after 3 opens */}
                      {opensCount >= 3 && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm font-medium text-amber-400"
                        >
                          Ready for the real thing? Your luck is hot! 🔥
                        </motion.p>
                      )}

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <GlowButton
                          href={`/boxes/${tier}`}
                          variant="primary"
                          size="md"
                        >
                          Buy This Box For Real
                          <ArrowRight className="w-4 h-4" />
                        </GlowButton>

                        <GlowButton
                          variant="secondary"
                          size="md"
                          onClick={onOpenAnother}
                        >
                          <RotateCcw className="w-4 h-4" />
                          Try Another
                        </GlowButton>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
