"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useGamificationStore } from "@/stores/gamificationStore";

export default function LuckMeter() {
  const luckMeter = useGamificationStore((s) => s.luckMeter);

  const getColor = () => {
    if (luckMeter >= 80) return "from-amber-400 to-yellow-300";
    if (luckMeter >= 60) return "from-red-500 to-orange-400";
    if (luckMeter >= 40) return "from-orange-400 to-yellow-400";
    if (luckMeter >= 20) return "from-yellow-400 to-green-400";
    return "from-green-400 to-emerald-400";
  };

  const getMessage = () => {
    if (luckMeter >= 80) return "Your luck is COOKING. Open something NOW.";
    if (luckMeter >= 60) return "It's building. Don't waste this momentum.";
    if (luckMeter >= 40) return "Getting there. Keep cracking.";
    if (luckMeter >= 20) return "Warming up...";
    return "Crack some trunks to build your luck.";
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-semibold text-white">Luck Meter</h3>
        </div>
        <span className="text-sm font-bold text-white">{luckMeter}%</span>
      </div>

      {/* Progress bar */}
      <div className="relative h-4 rounded-full bg-white/10 overflow-hidden mb-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${luckMeter}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${getColor()}`}
        />
        {luckMeter >= 80 && (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
          />
        )}
      </div>

      <p className="text-xs text-white/50">{getMessage()}</p>

      {luckMeter >= 80 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20"
        >
          <p className="text-xs text-amber-400 font-medium">
            ⚡ Your next box has boosted rarity odds!
          </p>
        </motion.div>
      )}
    </div>
  );
}
