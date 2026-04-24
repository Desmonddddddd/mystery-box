"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, Zap, ArrowLeft, TrendingUp, Trophy } from "lucide-react";
import Link from "next/link";
import { onlineBoxes } from "@/data/onlineBoxes";
import { openOnlineBox } from "@/lib/onlineLootEngine";
import { useUserStore } from "@/stores/userStore";
import { useOnlineGameStore } from "@/stores/onlineGameStore";
import { cn, formatPrice } from "@/lib/utils";
import type { OnlineBoxTier, DigitalReward } from "@/types";
import GlowButton from "@/components/ui/GlowButton";
import OnlineBoxOpening from "@/components/online/OnlineBoxOpening";

export default function OnlinePage() {
  const [selectedTier, setSelectedTier] = useState<OnlineBoxTier | null>(null);
  const [result, setResult] = useState<DigitalReward | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  const credits = useUserStore((s) => s.profile.credits);
  const spendCredits = useUserStore((s) => s.spendCredits);
  const addCredits = useUserStore((s) => s.addCredits);
  const totalPlays = useOnlineGameStore((s) => s.totalPlays);
  const biggestWin = useOnlineGameStore((s) => s.biggestWin);
  const recentWins = useOnlineGameStore((s) => s.recentWins);
  const recordPlay = useOnlineGameStore((s) => s.recordPlay);

  const handlePlay = (tier: OnlineBoxTier) => {
    const box = onlineBoxes.find((b) => b.id === tier);
    if (!box) return;

    if (credits < box.creditCost) return;

    const success = spendCredits(box.creditCost);
    if (!success) return;

    setSelectedTier(tier);
    setIsRevealing(true);
    setResult(null);

    // Simulate reveal delay
    setTimeout(() => {
      const reward = openOnlineBox(tier);
      setResult(reward);
      setIsRevealing(false);
      recordPlay(reward);

      // Apply credit rewards immediately
      if (reward.type === "credits") {
        addCredits(reward.value);
      }
    }, 2500);
  };

  const handleClose = () => {
    setSelectedTier(null);
    setResult(null);
    setIsRevealing(false);
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 mb-6">
              <Zap className="w-4 h-4" />
              Credit-Based Digital Game
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Online{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Mystery Boxes
              </span>
            </h1>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Spend credits, win instant digital rewards — no shipping needed!
            </p>
          </motion.div>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10">
              <Coins className="w-4 h-4 text-amber-400" />
              <span className="text-white/70 text-sm">
                Your Credits:{" "}
                <span className="font-bold text-amber-400">{credits}</span>
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span className="text-white/70 text-sm">
                Plays:{" "}
                <span className="font-bold text-white">{totalPlays}</span>
              </span>
            </div>
            {biggestWin && (
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="text-white/70 text-sm">
                  Best:{" "}
                  <span className="font-bold text-white">
                    {biggestWin.name}
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Opening Area */}
      <AnimatePresence mode="wait">
        {(selectedTier || isRevealing) && (
          <section className="relative pb-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-12"
              >
                <OnlineBoxOpening
                  tier={selectedTier!}
                  result={result}
                  isRevealing={isRevealing}
                  onClose={handleClose}
                  onPlayAgain={() => {
                    handleClose();
                  }}
                />
              </motion.div>
            </div>
          </section>
        )}
      </AnimatePresence>

      {/* Box Grid */}
      <section className="relative pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-white/60 mb-6 text-center sm:text-left">
            Choose a box to play
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {onlineBoxes.map((box, index) => {
              const canAfford = credits >= box.creditCost;
              const isSelected = selectedTier === box.id;

              return (
                <motion.div
                  key={box.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={canAfford ? { scale: 1.03, y: -4 } : {}}
                >
                  <div
                    className={cn(
                      "relative group rounded-2xl border p-6 flex flex-col items-center text-center transition-all duration-300 bg-white/5 backdrop-blur-xl",
                      isSelected
                        ? "border-emerald-500/50 ring-1 ring-emerald-500/20"
                        : canAfford
                        ? "border-white/10 hover:border-white/20 cursor-pointer"
                        : "border-white/5 opacity-60"
                    )}
                    style={{
                      boxShadow: isSelected
                        ? "0 0 30px rgba(16, 185, 129, 0.2)"
                        : undefined,
                    }}
                  >
                    {/* Emoji */}
                    <motion.div
                      className="text-5xl mb-3 select-none"
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3,
                      }}
                    >
                      {box.emoji}
                    </motion.div>

                    <h3 className="text-lg font-bold text-white mb-1">
                      {box.name}
                    </h3>
                    <p className="text-xs text-white/40 mb-4">
                      {box.tagline}
                    </p>

                    {/* Credit cost */}
                    <div className="flex items-center gap-1.5 mb-4">
                      <Coins className="w-4 h-4 text-amber-400" />
                      <span className="text-lg font-bold text-amber-400">
                        {box.creditCost}
                      </span>
                      <span className="text-xs text-white/40">credits</span>
                    </div>

                    {/* Play button */}
                    <button
                      onClick={() => canAfford && handlePlay(box.id)}
                      disabled={!canAfford || isRevealing}
                      className={cn(
                        "w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2",
                        canAfford
                          ? "bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95"
                          : "bg-white/5 text-white/30 cursor-not-allowed"
                      )}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      {canAfford ? "Play Now" : "Not Enough Credits"}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Not enough credits message */}
          {credits < 50 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 text-center"
            >
              <div className="inline-block bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                <p className="text-lg font-bold text-white mb-2">
                  Need more credits? 🪙
                </p>
                <p className="text-sm text-white/50 mb-5">
                  Earn credits from daily spins, login streaks, opening physical boxes, or the welcome bonus!
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <GlowButton href="/spin" variant="primary" size="md">
                    Daily Spin
                  </GlowButton>
                  <GlowButton href="/boxes" variant="secondary" size="md">
                    Buy Mystery Boxes
                  </GlowButton>
                </div>
              </div>
            </motion.div>
          )}

          {/* Recent Wins */}
          {recentWins.length > 0 && (
            <div className="mt-16">
              <h3 className="text-lg font-semibold text-white/60 mb-4 text-center sm:text-left">
                Your Recent Wins
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {recentWins.slice(0, 5).map((win, i) => (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-xl p-3 text-center"
                  >
                    <span className="text-2xl block mb-1">{win.emoji}</span>
                    <p className="text-xs font-medium text-white truncate">
                      {win.name}
                    </p>
                    <p className="text-[10px] text-white/40 capitalize">
                      {win.rarity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
