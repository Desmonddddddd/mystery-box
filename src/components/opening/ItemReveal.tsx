"use client";

import { motion } from "framer-motion";
import type { RewardItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

interface ItemRevealProps {
  item: RewardItem;
  index: number;
  isRevealed: boolean;
  onReveal: () => void;
}

const rarityEffects = {
  common: {
    borderColor: "border-gray-500/30",
    glow: "none",
    floatingText: null,
  },
  rare: {
    borderColor: "border-blue-500/50",
    glow: "0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2)",
    floatingText: "Nice!",
  },
  epic: {
    borderColor: "border-purple-500/50",
    glow: "0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)",
    floatingText: "EPIC!",
  },
  legendary: {
    borderColor: "border-yellow-500/50",
    glow: "0 0 40px rgba(245, 158, 11, 0.6), 0 0 80px rgba(245, 158, 11, 0.3), 0 0 120px rgba(245, 158, 11, 0.2)",
    floatingText: "LEGENDARY!",
  },
};

export default function ItemReveal({
  item,
  index,
  isRevealed,
  onReveal,
}: ItemRevealProps) {
  const effects = rarityEffects[item.rarity];

  return (
    <div
      className="relative"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative w-full cursor-pointer"
        onClick={onReveal}
        initial={{ rotateY: 180 }}
        animate={{ rotateY: isRevealed ? 0 : 180 }}
        transition={{
          duration: 0.6,
          delay: isRevealed ? index * 0.15 : 0,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front face (revealed) */}
        <motion.div
          className={`rounded-xl border p-4 text-center ${effects.borderColor} bg-white/5 backdrop-blur-sm`}
          style={{
            backfaceVisibility: "hidden",
            boxShadow: isRevealed ? effects.glow : "none",
          }}
        >
          {/* Emoji */}
          <div className="text-4xl mb-3">{item.emoji}</div>

          {/* Name */}
          <p className="text-sm font-semibold text-white mb-1 line-clamp-2 min-h-[2.5rem]">
            {item.name}
          </p>

          {/* Value */}
          <p className="text-xs text-white/50 mb-2">{formatPrice(item.value)}</p>

          {/* Badge */}
          <Badge rarity={item.rarity} />

          {/* Floating text for rare+ */}
          {isRevealed && effects.floatingText && (
            <motion.span
              className={`absolute -top-3 left-1/2 -translate-x-1/2 font-black text-sm ${
                item.rarity === "legendary"
                  ? "text-yellow-400"
                  : item.rarity === "epic"
                  ? "text-purple-400"
                  : "text-blue-400"
              }`}
              initial={{ opacity: 0, y: 10, scale: 0.5 }}
              animate={{ opacity: [0, 1, 1, 0], y: [10, -10, -20, -30], scale: [0.5, 1.2, 1, 0.8] }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {effects.floatingText}
            </motion.span>
          )}
        </motion.div>

        {/* Back face (unrevealed) */}
        <div
          className="absolute inset-0 rounded-xl border border-white/10 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow:
              "0 0 20px rgba(139, 92, 246, 0.2), inset 0 0 30px rgba(139, 92, 246, 0.1)",
          }}
        >
          <motion.span
            className="text-4xl font-black text-white/20"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ?
          </motion.span>
        </div>
      </motion.div>

      {/* Screen flash for epic */}
      {isRevealed && item.rarity === "epic" && (
        <motion.div
          className="fixed inset-0 bg-purple-500/10 pointer-events-none z-[300]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Gold explosion for legendary */}
      {isRevealed && item.rarity === "legendary" && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-[300]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, rgba(245, 158, 11, 0.3) 0%, transparent 60%)",
            }}
          />
        </motion.div>
      )}
    </div>
  );
}
