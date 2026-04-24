"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, Play, ArrowRight } from "lucide-react";
import Link from "next/link";
import { mysteryBoxes } from "@/data/boxes";
import { formatPrice, cn } from "@/lib/utils";
import type { BoxTier } from "@/types";
import GlassCard from "@/components/ui/GlassCard";
import GlowButton from "@/components/ui/GlowButton";
import VirtualBoxOpening from "@/components/virtual/VirtualBoxOpening";

// Show 3 tiers on homepage: Gold, Diamond, Elite
const FEATURED_TIERS: BoxTier[] = ["gold", "diamond", "elite"];

export default function VirtualTrySection() {
  const [selectedTier, setSelectedTier] = useState<BoxTier | null>(null);
  const [opensCount, setOpensCount] = useState(0);

  const featuredBoxes = mysteryBoxes.filter((b) =>
    FEATURED_TIERS.includes(b.id)
  );

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
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[120px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 mb-6">
            <Gift className="w-4 h-4 text-pink-400" />
            Free. No signup. No cap.
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Try Before You{" "}
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Buy
            </span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Crack a virtual trunk for free. See what drops. Get hooked.
            You&apos;ve been warned.
          </p>
        </motion.div>

        {/* Box Opening Inline (when active) */}
        <AnimatePresence mode="wait">
          {selectedTier && (
            <motion.div
              key="opening"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-12 overflow-hidden"
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

        {/* Box Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredBoxes.map((box, index) => (
            <motion.div
              key={box.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard
                className="relative group h-full flex flex-col items-center text-center"
                glow={
                  selectedTier === box.id
                    ? "rgba(236, 72, 153, 0.3)"
                    : undefined
                }
              >
                {/* Box Info */}
                <h3 className="text-lg font-bold text-white mb-1">
                  {box.name}
                </h3>
                <p className="text-sm text-white/40 mb-1">{box.tagline}</p>
                <p className="text-xs text-white/30 mb-5">
                  {formatPrice(box.price)} trunk
                </p>

                {/* Try Button */}
                <div className="mt-auto w-full">
                  <GlowButton
                    variant="primary"
                    size="md"
                    onClick={() => handleTryBox(box.id)}
                    className="w-full"
                  >
                    <Play className="w-4 h-4" />
                    Try Now — Free
                  </GlowButton>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            href="/virtual"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
          >
            Try all 6 trunks for free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
