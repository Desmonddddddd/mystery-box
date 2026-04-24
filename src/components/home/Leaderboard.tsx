"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { recentWinners } from "@/data/winners";
import { formatPrice } from "@/lib/utils";
import GlassCard from "@/components/ui/GlassCard";

const rankStyles: Record<number, { bg: string; text: string; badge: string }> = {
  0: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
    badge: "bg-gradient-to-r from-yellow-500 to-amber-400",
  },
  1: {
    bg: "bg-gray-400/10",
    text: "text-gray-300",
    badge: "bg-gradient-to-r from-gray-400 to-gray-300",
  },
  2: {
    bg: "bg-amber-700/10",
    text: "text-amber-600",
    badge: "bg-gradient-to-r from-amber-700 to-amber-500",
  },
};

export default function Leaderboard() {
  const top5 = useMemo(() => {
    return [...recentWinners]
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Today&apos;s Biggest Pulls <span className="inline-block">🏆</span>
          </h2>
        </motion.div>

        <GlassCard glow="rgba(245, 158, 11, 0.1)" hover={false}>
          <div className="space-y-2">
            {/* Header row */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-medium text-white/30 uppercase tracking-wider">
              <div className="col-span-1">#</div>
              <div className="col-span-4">Player</div>
              <div className="col-span-4">Item Won</div>
              <div className="col-span-3 text-right">Value</div>
            </div>

            {top5.map((winner, index) => {
              const style = rankStyles[index];
              return (
                <motion.div
                  key={`${winner.username}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`grid grid-cols-12 gap-4 items-center px-4 py-3 rounded-xl ${
                    style?.bg ?? ""
                  } transition-colors`}
                >
                  {/* Rank */}
                  <div className="col-span-1">
                    {index < 3 ? (
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-black ${style.badge}`}
                      >
                        {index + 1}
                      </span>
                    ) : (
                      <span className="text-white/40 text-sm font-medium ml-1">
                        {index + 1}
                      </span>
                    )}
                  </div>

                  {/* Username */}
                  <div className="col-span-4">
                    <span
                      className={`text-sm font-semibold ${
                        style?.text ?? "text-white/70"
                      }`}
                    >
                      {winner.username}
                    </span>
                  </div>

                  {/* Item */}
                  <div className="col-span-4">
                    <span className="text-sm text-white/60 truncate block">
                      {winner.item}
                    </span>
                  </div>

                  {/* Value */}
                  <div className="col-span-3 text-right">
                    <span
                      className={`text-sm font-bold ${
                        style?.text ?? "text-white/70"
                      }`}
                    >
                      {formatPrice(winner.value)}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
