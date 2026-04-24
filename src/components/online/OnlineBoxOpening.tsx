"use client";

import { motion } from "framer-motion";
import { Sparkles, X, RotateCcw } from "lucide-react";
import type { OnlineBoxTier, DigitalReward } from "@/types";
import { onlineBoxes } from "@/data/onlineBoxes";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import { useEffect } from "react";

interface OnlineBoxOpeningProps {
  tier: OnlineBoxTier;
  result: DigitalReward | null;
  isRevealing: boolean;
  onClose: () => void;
  onPlayAgain: () => void;
}

const rarityColors: Record<string, string> = {
  common: "from-gray-400 to-gray-500",
  rare: "from-blue-400 to-cyan-400",
  epic: "from-purple-400 to-pink-400",
  legendary: "from-amber-400 to-yellow-300",
};

const rarityBorders: Record<string, string> = {
  common: "border-gray-500/30",
  rare: "border-blue-500/30",
  epic: "border-purple-500/30",
  legendary: "border-amber-500/30",
};

const rarityGlows: Record<string, string> = {
  common: "",
  rare: "0 0 20px rgba(59, 130, 246, 0.3)",
  epic: "0 0 30px rgba(168, 85, 247, 0.4)",
  legendary: "0 0 40px rgba(245, 158, 11, 0.5)",
};

export default function OnlineBoxOpening({
  tier,
  result,
  isRevealing,
  onClose,
  onPlayAgain,
}: OnlineBoxOpeningProps) {
  const box = onlineBoxes.find((b) => b.id === tier);

  useEffect(() => {
    if (result && (result.rarity === "legendary" || result.rarity === "epic")) {
      confetti({
        particleCount: result.rarity === "legendary" ? 150 : 60,
        spread: result.rarity === "legendary" ? 100 : 60,
        origin: { y: 0.5 },
        colors:
          result.rarity === "legendary"
            ? ["#F59E0B", "#FBBF24", "#FDE68A", "#D97706"]
            : ["#8B5CF6", "#A78BFA", "#EC4899", "#C084FC"],
      });
    }
  }, [result]);

  return (
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/40 hover:text-white/70 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {isRevealing ? (
        // Reveal animation
        <div className="py-12">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-6xl mb-6 inline-block"
          >
            {box?.emoji || "🎰"}
          </motion.div>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-white/60 text-lg font-medium"
          >
            Opening {box?.name}...
          </motion.p>
          <div className="flex justify-center gap-1 mt-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
              />
            ))}
          </div>
        </div>
      ) : result ? (
        // Result display
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="py-8"
        >
          {/* Rarity label */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${
              result.rarity === "legendary"
                ? "bg-amber-500/20 text-amber-400"
                : result.rarity === "epic"
                ? "bg-purple-500/20 text-purple-400"
                : result.rarity === "rare"
                ? "bg-blue-500/20 text-blue-400"
                : "bg-white/10 text-white/60"
            }`}
          >
            <Sparkles className="w-3 h-3" />
            {result.rarity}
          </motion.div>

          {/* Reward card */}
          <motion.div
            initial={{ rotateY: 180, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={cn(
              "inline-block rounded-2xl border p-8 mb-6",
              rarityBorders[result.rarity]
            )}
            style={{
              boxShadow: rarityGlows[result.rarity],
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <span className="text-6xl block mb-4">{result.emoji}</span>
            <h3 className="text-xl font-bold text-white mb-2">
              {result.name}
            </h3>
            <p className="text-sm text-white/50 mb-3">{result.description}</p>
            <div
              className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${
                rarityColors[result.rarity]
              } text-black text-sm font-bold`}
            >
              {result.type === "gems"
                ? `+${result.value} Gems`
                : result.type === "discount"
                ? `${result.value}% Off`
                : result.type === "cashback"
                ? `₹${result.value} Cashback`
                : result.name}
            </div>
          </motion.div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={onPlayAgain}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Play Again
            </button>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 transition-all"
            >
              Close
            </button>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}
