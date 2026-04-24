"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gift,
  Sparkles,
  Play,
  ArrowRight,
  ArrowLeft,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { mysteryBoxes } from "@/data/boxes";
import { formatPrice, cn } from "@/lib/utils";
import type { BoxTier } from "@/types";
import GlassCard from "@/components/ui/GlassCard";
import GlowButton from "@/components/ui/GlowButton";
import VirtualBoxOpening from "@/components/virtual/VirtualBoxOpening";

export default function VirtualPage() {
  const [selectedTier, setSelectedTier] = useState<BoxTier | null>(null);
  const [opensCount, setOpensCount] = useState(0);

  const handleTryBox = (tier: BoxTier) => {
    setSelectedTier(tier);
    setOpensCount((c) => c + 1);
  };

  const handleClose = () => {
    setSelectedTier(null);
  };

  const handleOpenAnother = () => {
    setSelectedTier(null);
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Hero Banner */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-pink-500/5 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-purple-500/5 blur-[150px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 mb-6">
              <Gift className="w-4 h-4 text-pink-400" />
              Virtual Unboxing Experience
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Open a Free{" "}
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Virtual Box
              </span>
            </h1>
            <p className="text-lg text-white/50 max-w-2xl mx-auto mb-2">
              Experience the thrill of unboxing without spending a rupee. See
              what kind of items you could win from each tier.
            </p>
            <p className="text-sm text-white/30">
              No account needed • No purchase required • Unlimited tries
            </p>
          </motion.div>

          {/* Stats Bar */}
          {opensCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mb-8"
            >
              <div className="inline-flex items-center gap-4 px-5 py-2.5 rounded-full bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 text-sm">
                  <Eye className="w-4 h-4 text-purple-400" />
                  <span className="text-white/70">
                    Virtual Opens:{" "}
                    <span className="font-semibold text-white">
                      {opensCount}
                    </span>
                  </span>
                </div>
                {opensCount >= 3 && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-sm text-amber-400 font-medium"
                  >
                    🔥 You&apos;re on fire!
                  </motion.span>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Opening Area */}
      <section className="relative pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {selectedTier && (
              <motion.div
                key={`opening-${selectedTier}-${opensCount}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="mb-12"
              >
                <VirtualBoxOpening
                  tier={selectedTier}
                  onClose={handleClose}
                  onOpenAnother={handleOpenAnother}
                  opensCount={opensCount}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* All 5 Box Tiers */}
      <section className="relative pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg font-semibold text-white/60 mb-6 text-center sm:text-left"
          >
            Choose a box to open virtually
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {mysteryBoxes.map((box, index) => {
              const isSelected = selectedTier === box.id;

              return (
                <motion.div
                  key={box.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <div
                    className={cn(
                      "relative group rounded-2xl border p-5 flex flex-col items-center text-center transition-all duration-300 bg-white/5 backdrop-blur-xl cursor-pointer",
                      isSelected
                        ? "border-pink-500/50 ring-1 ring-pink-500/20"
                        : "border-white/10 hover:border-white/20"
                    )}
                    style={{
                      boxShadow: isSelected
                        ? "0 0 30px rgba(236, 72, 153, 0.2)"
                        : undefined,
                    }}
                    onClick={() => handleTryBox(box.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleTryBox(box.id);
                      }
                    }}
                  >
                    {/* Box Emoji */}
                    <motion.div
                      className="text-4xl mb-3 select-none"
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

                    {/* Box Name */}
                    <h3 className="text-sm font-bold text-white mb-0.5">
                      {box.name}
                    </h3>
                    <p className="text-xs text-white/40 mb-4">{box.tagline}</p>

                    {/* Price tag */}
                    <p className="text-xs text-white/20 mb-3">
                      Real price:{" "}
                      <span className="text-white/50">
                        {formatPrice(box.price)}
                      </span>
                    </p>

                    {/* Try Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTryBox(box.id);
                      }}
                      className={cn(
                        "w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2",
                        "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white",
                        "hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]",
                        "active:scale-95"
                      )}
                    >
                      <Play className="w-3.5 h-3.5" />
                      Try Free
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Hook message */}
          <AnimatePresence>
            {opensCount >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-12 text-center"
              >
                <div className="inline-block bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 border border-pink-500/20 rounded-2xl p-6 sm:p-8">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  </motion.div>
                  <p className="text-lg font-bold text-white mb-2">
                    Ready for the real thing? Your luck is hot! 🔥
                  </p>
                  <p className="text-sm text-white/50 mb-5">
                    You&apos;ve opened {opensCount} virtual boxes. Imagine
                    getting real items delivered to your door.
                  </p>
                  <GlowButton href="/boxes" variant="primary" size="lg">
                    Shop Real Mystery Boxes
                    <ArrowRight className="w-5 h-5" />
                  </GlowButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* How it works - footer note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                {
                  icon: "🎯",
                  title: "Pick a Box",
                  desc: "Choose any tier from Basic to Ultra",
                },
                {
                  icon: "🎁",
                  title: "Open Virtually",
                  desc: "See what items you could win",
                },
                {
                  icon: "🛒",
                  title: "Buy For Real",
                  desc: "Loved it? Get the real thing delivered",
                },
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <span className="text-2xl mb-2 block">{step.icon}</span>
                  <p className="text-sm font-semibold text-white mb-1">
                    {step.title}
                  </p>
                  <p className="text-xs text-white/40">{step.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
