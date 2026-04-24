"use client";

import { motion } from "framer-motion";
import type { Rarity } from "@/types";
import { cn } from "@/lib/utils";

interface BadgeProps {
  rarity: Rarity;
}

const rarityConfig = {
  common: {
    bg: "bg-gray-600/50",
    text: "text-gray-200",
    border: "border-gray-500/30",
    glow: undefined,
    label: "Common",
  },
  rare: {
    bg: "bg-blue-600/30",
    text: "text-blue-300",
    border: "border-blue-500/40",
    glow: "0 0 10px rgba(59, 130, 246, 0.4)",
    label: "Rare",
  },
  epic: {
    bg: "bg-purple-600/30",
    text: "text-purple-300",
    border: "border-purple-500/40",
    glow: "0 0 10px rgba(139, 92, 246, 0.4)",
    label: "Epic",
  },
  legendary: {
    bg: "bg-yellow-600/30",
    text: "text-yellow-300",
    border: "border-yellow-500/40",
    glow: "0 0 15px rgba(245, 158, 11, 0.5)",
    label: "Legendary",
  },
};

export default function Badge({ rarity }: BadgeProps) {
  const config = rarityConfig[rarity];

  const badge = (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        config.bg,
        config.text,
        config.border
      )}
      style={{ boxShadow: config.glow }}
    >
      {config.label}
    </span>
  );

  if (rarity === "legendary") {
    return (
      <motion.span
        animate={{
          boxShadow: [
            "0 0 10px rgba(245, 158, 11, 0.3)",
            "0 0 20px rgba(245, 158, 11, 0.6)",
            "0 0 10px rgba(245, 158, 11, 0.3)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="inline-flex rounded-full"
      >
        {badge}
      </motion.span>
    );
  }

  return badge;
}
