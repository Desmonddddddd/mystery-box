"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import type { BoxTier, RewardItem } from "@/types";
import { openBox, openBoxWithProtection, calculateLootValue } from "@/lib/lootEngine";
import { getBoxByTier } from "@/data/boxes";
import { useUserStore } from "@/stores/userStore";
import { useGamificationStore } from "@/stores/gamificationStore";
import { formatPrice } from "@/lib/utils";
import BoxAnimation from "@/components/opening/BoxAnimation";

const validTiers: BoxTier[] = ["basic", "silver", "gold", "elite", "ultra"];

export default function OpenBoxPage() {
  const params = useParams();
  const router = useRouter();
  const tier = params.id as string;

  const addWonItems = useUserStore((s) => s.addWonItems);
  const incrementBoxesOpened = useUserStore((s) => s.incrementBoxesOpened);

  const consecutiveLowWins = useGamificationStore((s) => s.consecutiveLowWins);
  const luckMeter = useGamificationStore((s) => s.luckMeter);
  const incrementLuckMeter = useGamificationStore((s) => s.incrementLuckMeter);
  const resetLuckMeter = useGamificationStore((s) => s.resetLuckMeter);

  const [lootItems, setLootItems] = useState<RewardItem[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!validTiers.includes(tier as BoxTier)) {
      router.replace("/boxes");
    }
  }, [tier, router]);

  const box = getBoxByTier(tier);

  const handleStartOpening = useCallback(() => {
    if (!box) return;
    // Use loss protection if player has been unlucky
    const items = (consecutiveLowWins >= 3 || luckMeter >= 50)
      ? openBoxWithProtection(tier as BoxTier, consecutiveLowWins, luckMeter)
      : openBox(tier as BoxTier);
    setLootItems(items);
    setHasStarted(true);
  }, [box, tier, consecutiveLowWins, luckMeter]);

  const handleComplete = useCallback(() => {
    setIsComplete(true);
    incrementBoxesOpened();
    addWonItems(lootItems);

    // Update luck meter based on result quality
    const totalValue = calculateLootValue(lootItems);
    const hasEpicOrBetter = lootItems.some(
      (item) => item.rarity === "epic" || item.rarity === "legendary"
    );

    if (hasEpicOrBetter) {
      // Good win — reset luck meter
      resetLuckMeter();
    } else if (totalValue < (box?.price ?? 0) * 1.5) {
      // Low value win — boost luck meter
      incrementLuckMeter(20);
    } else {
      // Decent win — small boost
      incrementLuckMeter(5);
    }
  }, [lootItems, incrementBoxesOpened, addWonItems, box, resetLuckMeter, incrementLuckMeter]);

  const handleOpenAnother = useCallback(() => {
    setHasStarted(false);
    setIsComplete(false);
    setLootItems([]);
  }, []);

  if (!box) return null;

  return (
    <div className="min-h-screen bg-dark-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-24 pb-6">
        <Link href="/boxes" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Boxes
        </Link>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-24">
        <AnimatePresence mode="wait">
          {!hasStarted && (
            <motion.div key="pre" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center">
              <span className="text-7xl sm:text-8xl block mb-4">{box.emoji}</span>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{box.name}</h1>
              <p className="text-gray-400 text-lg mb-3">{box.tagline}</p>
              <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">{box.description}</p>
              <button onClick={handleStartOpening} className="px-10 py-4 text-lg font-bold text-white rounded-2xl hover:scale-105 active:scale-95 transition-transform animate-pulse-glow" style={{ background: "linear-gradient(135deg, #EC4899, #8B5CF6, #3B82F6)" }}>
                <ShoppingBag className="w-5 h-5 inline mr-2" /> Open This Box
              </button>
            </motion.div>
          )}

          {hasStarted && !isComplete && (
            <BoxAnimation boxTier={tier as BoxTier} items={lootItems} onComplete={handleComplete} />
          )}

          {isComplete && (
            <motion.div key="done" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Unboxing Complete!</h2>
              <p className="text-gray-400 mb-8">You won {lootItems.length} items worth {formatPrice(lootItems.reduce((s, i) => s + i.value, 0))}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
                {lootItems.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-4 text-center">
                    <span className="text-3xl block mb-2">{item.emoji}</span>
                    <p className="text-sm font-bold text-white truncate">{item.name}</p>
                    <p className="text-xs text-gray-400 capitalize">{item.rarity}</p>
                    <p className="text-sm font-bold neon-text mt-1">{formatPrice(item.value)}</p>
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button onClick={handleOpenAnother} className="px-8 py-3 rounded-xl font-semibold text-white hover:scale-105 transition-transform" style={{ background: "linear-gradient(135deg, #EC4899, #8B5CF6)" }}>
                  Open Another
                </button>
                <Link href="/boxes" className="px-8 py-3 rounded-xl font-semibold text-gray-300 border border-white/10 hover:bg-white/5 transition-colors">
                  Browse Boxes
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
