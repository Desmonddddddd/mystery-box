"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Crown, Star } from "lucide-react";
import type { FeaturedWinner } from "@/types";
import { formatPrice } from "@/lib/utils";

const featuredWinners: FeaturedWinner[] = [
  {
    username: "Arjun_M",
    item: "MacBook Air M2",
    value: 99999,
    boxTier: "ultra",
    avatar: "🦍",
    period: "daily",
  },
  {
    username: "MeghaS",
    item: "iPhone 16",
    value: 79999,
    boxTier: "ultra",
    avatar: "🐒",
    period: "weekly",
  },
  {
    username: "AkashDev",
    item: "Signed Virat Kohli Bat",
    value: 75000,
    boxTier: "ultra",
    avatar: "🦧",
    period: "daily",
  },
  {
    username: "IshaSaxena",
    item: "Callaway Golf Club Set",
    value: 45000,
    boxTier: "ultra",
    avatar: "🐵",
    period: "weekly",
  },
];

export default function WinnerHighlight() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredWinners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const winner = featuredWinners[activeIndex];
  const isDaily = winner.period === "daily";

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-amber-500/5 blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">
              Hall of Fame
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Winner Spotlight
          </h2>
        </div>

        {/* Winner Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="relative bg-gradient-to-r from-amber-500/10 via-white/5 to-amber-500/10 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-8 text-center"
            style={{
              boxShadow: "0 0 40px rgba(245, 158, 11, 0.15)",
            }}
          >
            {/* Period badge */}
            <div className="absolute top-4 right-4">
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                  isDaily
                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                }`}
              >
                {isDaily ? (
                  <Star className="w-3 h-3" />
                ) : (
                  <Crown className="w-3 h-3" />
                )}
                {isDaily ? "Winner of the Day" : "Winner of the Week"}
              </span>
            </div>

            {/* Avatar */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-6xl mb-4"
            >
              {winner.avatar}
            </motion.div>

            {/* Username */}
            <h3 className="text-xl font-bold text-white mb-1">
              {winner.username}
            </h3>
            <p className="text-white/40 text-sm mb-4">
              from {winner.boxTier.charAt(0).toUpperCase() + winner.boxTier.slice(1)} Box
            </p>

            {/* Item won */}
            <div className="inline-block bg-white/5 rounded-xl px-6 py-3 mb-4">
              <p className="text-white/60 text-xs mb-1">Won</p>
              <p className="text-lg font-bold text-white">{winner.item}</p>
              <p className="text-amber-400 font-bold text-xl mt-1">
                {formatPrice(winner.value)}
              </p>
            </div>

            {/* Decorative particles */}
            <div className="absolute top-6 left-6 text-amber-500/30 text-2xl">
              ✦
            </div>
            <div className="absolute bottom-6 right-6 text-amber-500/30 text-2xl">
              ✦
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {featuredWinners.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === activeIndex
                  ? "bg-amber-400 w-6"
                  : "bg-white/20 hover:bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
