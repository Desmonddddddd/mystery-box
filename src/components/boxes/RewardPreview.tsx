"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { BoxTier, Rarity } from "@/types";
import { allRewards } from "@/data/rewards";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

interface RewardPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  boxTier: BoxTier;
}

const rarityOrder: Rarity[] = ["legendary", "epic", "rare", "common"];

const tierRewardFilter: Record<BoxTier, Rarity[]> = {
  silver: ["common", "rare"],
  gold: ["common", "rare", "epic"],
  diamond: ["common", "rare", "epic", "legendary"],
  elite: ["rare", "epic", "legendary"],
  mega: ["rare", "epic", "legendary"],
  ultra: ["rare", "epic", "legendary"],
};

export default function RewardPreview({
  isOpen,
  onClose,
  boxTier,
}: RewardPreviewProps) {
  const grouped = useMemo(() => {
    const allowedRarities = tierRewardFilter[boxTier];
    const filtered = allRewards.filter((r) =>
      allowedRarities.includes(r.rarity)
    );

    const groups: Record<Rarity, typeof filtered> = {
      legendary: [],
      epic: [],
      rare: [],
      common: [],
    };

    filtered.forEach((r) => {
      groups[r.rarity].push(r);
    });

    return groups;
  }, [boxTier]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[85vh] bg-[#0d0d15] border border-white/10 rounded-2xl overflow-hidden"
            style={{
              boxShadow:
                "0 0 60px rgba(139, 92, 246, 0.15), 0 0 120px rgba(236, 72, 153, 0.08)",
            }}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <h3 className="text-lg font-bold text-white">
                Possible Rewards
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto p-6 max-h-[calc(85vh-64px)] space-y-8">
              {rarityOrder.map((rarity) => {
                const items = grouped[rarity];
                if (items.length === 0) return null;
                return (
                  <div key={rarity}>
                    <div className="flex items-center gap-3 mb-4">
                      <Badge rarity={rarity} />
                      <span className="text-xs text-white/30 uppercase tracking-wider">
                        {items.length} items
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                        >
                          <span className="text-2xl">{item.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-white/40">
                              {formatPrice(item.value)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
