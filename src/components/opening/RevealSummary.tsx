"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import { motion } from "framer-motion";
import Link from "next/link";
import { Gem, Check } from "lucide-react";
import type { RewardItem, BoxTier } from "@/types";
import { formatPrice } from "@/lib/utils";
import { getBoxByTier } from "@/data/boxes";
import Badge from "@/components/ui/Badge";
import GlowButton from "@/components/ui/GlowButton";

interface RevealSummaryProps {
  items: RewardItem[];
  boxTier: BoxTier;
  /** Reports the indices of items the user sold back for gems, so the
   *  caller can exclude them from the kept haul. */
  onSoldChange?: (soldIndices: number[]) => void;
}

/** Sell-back rate: 60% of retail value, in gems. */
function sellValue(item: RewardItem): number {
  return Math.round(item.value * 0.6);
}

export default function RevealSummary({
  items,
  boxTier,
  onSoldChange,
}: RevealSummaryProps) {
  const box = getBoxByTier(boxTier);
  const totalValue = items.reduce((sum, item) => sum + item.value, 0);
  const [displayedValue, setDisplayedValue] = useState(0);
  const [soldIndices, setSoldIndices] = useState<number[]>([]);
  const isProfit = box ? totalValue > box.price : false;

  const unsoldIndices = items
    .map((_, i) => i)
    .filter((i) => !soldIndices.includes(i));
  const sellAllGems = unsoldIndices.reduce(
    (sum, i) => sum + sellValue(items[i]),
    0
  );
  const gemsEarned = soldIndices.reduce(
    (sum, i) => sum + sellValue(items[i]),
    0
  );

  const sellItem = (index: number) => {
    if (soldIndices.includes(index)) return;
    useUserStore.getState().addGems(sellValue(items[index]));
    const next = [...soldIndices, index];
    setSoldIndices(next);
    onSoldChange?.(next);
  };

  const sellAll = () => {
    if (unsoldIndices.length === 0) return;
    useUserStore.getState().addGems(sellAllGems);
    const next = [...soldIndices, ...unsoldIndices];
    setSoldIndices(next);
    onSoldChange?.(next);
  };

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
        {gemsEarned > 0 && (
          <p className="text-sm mt-1 text-purple-300 inline-flex items-center gap-1">
            <Gem className="w-3.5 h-3.5" />+{gemsEarned.toLocaleString()} gems
            from sell-backs
          </p>
        )}
      </motion.div>

      {/* Items grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {items.map((item, i) => {
          const isSold = soldIndices.includes(i);
          return (
            <motion.div
              key={item.id + i}
              className={`bg-white/5 rounded-xl border p-3 text-center transition-opacity ${
                isSold ? "border-purple-500/20 opacity-60" : "border-white/10"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isSold ? 0.6 : 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-2xl mb-1">{item.emoji}</div>
              <p className="text-xs font-medium text-white truncate mb-1">
                {item.name}
              </p>
              <p className="text-xs text-white/40 mb-1">{formatPrice(item.value)}</p>
              <Badge rarity={item.rarity} />
              {isSold ? (
                <p className="mt-2 text-[10px] font-semibold text-purple-300 inline-flex items-center gap-1">
                  <Check className="w-3 h-3" /> Sold for {sellValue(item)} gems
                </p>
              ) : (
                <button
                  onClick={() => sellItem(i)}
                  className="mt-2 w-full py-1.5 rounded-lg text-[10px] font-semibold bg-purple-500/10 border border-purple-500/25 text-purple-300 hover:bg-purple-500/20 active:scale-95 transition-all inline-flex items-center justify-center gap-1"
                >
                  <Gem className="w-3 h-3" /> Sell +{sellValue(item)}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
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
          onClick={sellAll}
          disabled={unsoldIndices.length === 0}
        >
          {unsoldIndices.length === 0
            ? "All Sold ✓"
            : `Sell All for ${sellAllGems.toLocaleString()} Gems`}
        </GlowButton>
      </div>
      <p className="text-center text-[11px] text-white/30 mt-4">
        Selling an item exchanges it for gems instantly — you keep the gems,
        we keep the item. Sell-backs are final and gems have no cash value.
      </p>
    </div>
  );
}
