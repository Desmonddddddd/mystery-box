"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import { motion } from "framer-motion";
import Link from "next/link";
import type { RewardItem, BoxTier } from "@/types";
import { formatPrice } from "@/lib/utils";
import { getBoxByTier } from "@/data/boxes";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import Badge from "@/components/ui/Badge";
import GlowButton from "@/components/ui/GlowButton";

interface RevealSummaryProps {
  items: RewardItem[];
  boxTier: BoxTier;
}

export default function RevealSummary({ items, boxTier }: RevealSummaryProps) {
  const box = getBoxByTier(boxTier);
  const totalValue = items.reduce((sum, item) => sum + item.value, 0);
  const [displayedValue, setDisplayedValue] = useState(0);
  const [converted, setConverted] = useState(false);
  const isProfit = box ? totalValue > box.price : false;
  const gemValue = Math.round(totalValue * 0.6);

  // Animated value counter
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = totalValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), totalValue);
      setDisplayedValue(current);
      if (step >= steps) clearInterval(timer);
    }, stepDuration);

    return () => clearInterval(timer);
  }, [totalValue]);

  const shareMessage = encodeURIComponent(
    `I just opened a ${box?.name ?? "Mystery Trunk"} on MYSTERYX and won items worth ${formatPrice(totalValue)}! 🔥 Check it out: https://mysteryx.in`
  );

  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* Celebration text */}
      {isProfit && (
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 10 }}
        >
          <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            YOU WON BIG!
          </span>
        </motion.div>
      )}

      {/* Total value */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-white/50 text-sm mb-1">Total Value</p>
        <p className="text-4xl sm:text-5xl font-black text-white">
          {formatPrice(displayedValue)}
        </p>
        {box && (
          <p className={`text-sm mt-1 ${isProfit ? "text-green-400" : "text-white/40"}`}>
            {isProfit ? `+${formatPrice(totalValue - box.price)} profit!` : `Paid ${formatPrice(box.price)}`}
          </p>
        )}
      </motion.div>

      {/* Items grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {items.map((item, i) => (
          <motion.div
            key={item.id + i}
            className="bg-white/5 rounded-xl border border-white/10 p-3 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="text-2xl mb-1">{item.emoji}</div>
            <p className="text-xs font-medium text-white truncate mb-1">
              {item.name}
            </p>
            <p className="text-xs text-white/40 mb-1">{formatPrice(item.value)}</p>
            <Badge rarity={item.rarity} />
          </motion.div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${shareMessage}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GlowButton variant="secondary" size="md">
            Share on WhatsApp
          </GlowButton>
        </a>
        <GlowButton href="/boxes" variant="primary" size="md">
          Open Another Box
        </GlowButton>
        <Link href="/dashboard">
          <GlowButton variant="secondary" size="sm">
            View Dashboard
          </GlowButton>
        </Link>
        <GlowButton
          variant="secondary"
          size="md"
          onClick={() => {
            if (!converted) {
              useUserStore.getState().addGems(gemValue);
              setConverted(true);
            }
          }}
          disabled={converted}
        >
          {converted ? "Converted! ✓" : `Convert to Gems (${gemValue})`}
        </GlowButton>
      </div>
    </div>
  );
}
