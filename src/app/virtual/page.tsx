"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gift,
  ArrowLeft,
  Zap,
  TrendingUp,
  Trophy,
  Gem,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { onlineBoxes } from "@/data/onlineBoxes";
import { openOnlineBox } from "@/lib/onlineLootEngine";
import { cn } from "@/lib/utils";
import type { OnlineBoxTier, DigitalReward } from "@/types";
import GlowButton from "@/components/ui/GlowButton";
import OnlineBoxOpening from "@/components/online/OnlineBoxOpening";
import { useUserStore } from "@/stores/userStore";
import { useOnlineGameStore } from "@/stores/onlineGameStore";

export default function VirtualPage() {
  const [selectedOnlineTier, setSelectedOnlineTier] =
    useState<OnlineBoxTier | null>(null);
  const [onlineResult, setOnlineResult] = useState<DigitalReward | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  const gems = useUserStore((s) => s.profile.gems);
  const spendGems = useUserStore((s) => s.spendGems);
  const addGems = useUserStore((s) => s.addGems);
  const totalPlays = useOnlineGameStore((s) => s.totalPlays);
  const biggestWin = useOnlineGameStore((s) => s.biggestWin);
  const recordPlay = useOnlineGameStore((s) => s.recordPlay);

  const handlePlay = (tier: OnlineBoxTier) => {
    const box = onlineBoxes.find((b) => b.id === tier);
    if (!box) return;
    if (gems < box.gemCost) return;

    const success = spendGems(box.gemCost);
    if (!success) return;

    setSelectedOnlineTier(tier);
    setIsRevealing(true);
    setOnlineResult(null);

    setTimeout(() => {
      const reward = openOnlineBox(tier);
      setOnlineResult(reward);
      setIsRevealing(false);
      recordPlay(reward);

      if (reward.type === "gems") {
        addGems(reward.value);
      }
    }, 2500);
  };

  const handleClose = () => {
    setSelectedOnlineTier(null);
    setOnlineResult(null);
    setIsRevealing(false);
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* ── Hero ── */}
      <section className="relative pt-24 pb-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-pink-500/5 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-purple-500/5 blur-[150px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Centered hero content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            {/* Hero image */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-6 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(236,72,153,0.3),0_0_80px_rgba(139,92,246,0.2)]"
            >
              <Image
                src="/images/cyberpunk-panda-meditation-futuristic-ai-generated-digital-art-illustration-meditating-glowing-neon-armor-suit-surrounded-414892934.webp"
                alt="Cyberpunk Panda"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-transparent to-transparent" />
            </motion.div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 mb-6">
              <Gift className="w-4 h-4 text-pink-400" />
              Gem-Powered Digital Rewards
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Virtual{" "}
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Mystery Box
              </span>
            </h1>
            <p className="text-lg text-white/50 max-w-2xl mx-auto mb-6">
              Spend gems, win instant digital rewards — no shipping needed!
            </p>

            {/* Win Big Banner — centered */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500/10 via-pink-500/10 to-purple-500/10 border border-amber-500/20"
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-2xl"
              >
                🏆
              </motion.span>
              <div className="text-left">
                <p className="text-sm font-bold text-white">
                  WIN BIG!{" "}
                  <span className="text-amber-400">Up to 45% Legendary odds</span>
                </p>
                <p className="text-xs text-white/40">
                  Higher tier = Better rewards. Mythic box has the best odds!
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats — centered */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-3 mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <Gem className="w-4 h-4 text-purple-400" />
              <span className="text-white/70 text-sm">
                Gems: <span className="font-bold text-purple-400">{gems}</span>
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span className="text-white/70 text-sm">
                Plays: <span className="font-bold text-white">{totalPlays}</span>
              </span>
            </div>
            {biggestWin && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="text-white/70 text-sm">
                  Best: <span className="font-bold text-white">{biggestWin.name}</span>
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ════════ VIRTUAL MYSTERY BOX SECTION ════════ */}

      {/* Opening Area */}
      <AnimatePresence mode="wait">
        {(selectedOnlineTier || isRevealing) && (
          <section className="relative pb-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-12"
              >
                <OnlineBoxOpening
                  tier={selectedOnlineTier!}
                  result={onlineResult}
                  isRevealing={isRevealing}
                  onClose={handleClose}
                  onPlayAgain={() => handleClose()}
                />
              </motion.div>
            </div>
          </section>
        )}
      </AnimatePresence>

      {/* Box Grid */}
      <section className="relative pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-white/60 mb-6 text-center">
            Choose a mystery box
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {onlineBoxes.map((box, index) => {
              const canAfford = gems >= box.gemCost;
              const isSelected = selectedOnlineTier === box.id;

              return (
                <motion.div
                  key={box.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={canAfford ? { scale: 1.03, y: -4 } : {}}
                >
                  <div
                    className={cn(
                      "relative group rounded-2xl border p-5 flex flex-col items-center text-center transition-all duration-300 bg-white/5 backdrop-blur-xl",
                      isSelected
                        ? "border-pink-500/50 ring-1 ring-pink-500/20"
                        : canAfford
                          ? "border-white/10 hover:border-white/20 cursor-pointer"
                          : "border-white/5 opacity-60"
                    )}
                    style={{
                      boxShadow: isSelected
                        ? "0 0 30px rgba(236, 72, 153, 0.2)"
                        : undefined,
                    }}
                  >
                    <h3 className="text-sm font-bold text-white mb-0.5">
                      {box.name}
                    </h3>
                    <p className="text-[10px] text-white/40 mb-3">{box.tagline}</p>

                    <div className="flex items-center gap-1.5 mb-1">
                      <Gem className="w-3.5 h-3.5 text-purple-400" />
                      <span className="text-lg font-bold text-purple-400">
                        {box.gemCost.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[10px] text-white/30 mb-3">
                      {box.itemRange[0]}–{box.itemRange[1]} items
                    </p>

                    <button
                      onClick={() => canAfford && handlePlay(box.id)}
                      disabled={!canAfford || isRevealing}
                      className={cn(
                        "w-full py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1.5",
                        canAfford
                          ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] active:scale-95"
                          : "bg-white/5 text-white/30 cursor-not-allowed"
                      )}
                    >
                      <Zap className="w-3 h-3" />
                      {canAfford ? "Play" : "Need Gems"}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Not enough gems */}
          {gems < 50 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 text-center"
            >
              <div className="inline-block bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                <p className="text-lg font-bold text-white mb-2">
                  Need more gems?
                </p>
                <p className="text-sm text-white/50 mb-5">
                  Buy gems from the store or earn from daily spins!
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <GlowButton href="/store" variant="primary" size="md">
                    Gem Store
                  </GlowButton>
                  <GlowButton href="/spin" variant="secondary" size="md">
                    Daily Spin
                  </GlowButton>
                </div>
              </div>
            </motion.div>
          )}

          {/* Win Big CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-amber-500/5 p-8 sm:p-10">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-amber-500/10 blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-purple-500/10 blur-[80px]" />

              <div className="relative flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
                {/* Logo on left */}
                <motion.div
                  animate={{ y: [0, -8, 0], scale: [1, 1.03, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.3),0_0_60px_rgba(236,72,153,0.2)]"
                >
                  <Image
                    src="/images/logo.png"
                    alt="MysteryX Logo"
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Content on right */}
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                    Play More,{" "}
                    <span className="bg-gradient-to-r from-amber-400 to-pink-400 bg-clip-text text-transparent">
                      Win Bigger!
                    </span>
                  </h3>
                  <p className="text-sm text-white/50 mb-4 max-w-md">
                    Higher tier boxes unlock better odds for legendary rewards.
                    The Mythic Box has 45% legendary drop rate!
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
                      <span>🎯</span> Better Odds
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
                      <span>💎</span> Gem Jackpots
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
                      <span>🔥</span> Exclusive Rewards
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
