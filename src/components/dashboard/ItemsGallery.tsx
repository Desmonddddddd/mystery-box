"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { useUserStore } from "@/stores/userStore";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import GlowButton from "@/components/ui/GlowButton";

export default function ItemsGallery() {
  const [mounted, setMounted] = useState(false);
  const itemsWon = useUserStore((s) => s.profile.itemsWon);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-48 animate-pulse" />
    );
  }

  if (itemsWon.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 text-center">
        <Package className="w-12 h-12 text-white/20 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white/60 mb-2">
          No items yet
        </h3>
        <p className="text-white/30 text-sm mb-6">
          Open a box to start your collection!
        </p>
        <GlowButton href="/boxes" variant="primary" size="md">
          Open a Box
        </GlowButton>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-4">
        Your Collection ({itemsWon.length})
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {itemsWon.map((item, i) => (
          <motion.div
            key={item.id + i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:border-white/20 transition-colors"
          >
            <div className="text-3xl mb-2">{item.emoji}</div>
            <p className="text-sm font-medium text-white truncate mb-1">
              {item.name}
            </p>
            <p className="text-xs text-white/40 mb-2">
              {formatPrice(item.value)}
            </p>
            <Badge rarity={item.rarity} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
