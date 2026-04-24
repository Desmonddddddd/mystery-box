"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Eye } from "lucide-react";
import type { MysteryBox } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import GlowButton from "@/components/ui/GlowButton";
import RewardPreview from "./RewardPreview";

interface BoxCardProps {
  box: MysteryBox;
}

export default function BoxCard({ box }: BoxCardProps) {
  const [showRewards, setShowRewards] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const isSoldOut = box.stock === 0;
  const isLowStock = box.stock > 0 && box.stock < 10;

  return (
    <>
      <motion.div
        className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col h-full overflow-hidden"
        style={{ boxShadow: box.glowColor }}
        whileHover={
          isSoldOut
            ? {}
            : {
                scale: 1.02,
                boxShadow: box.glowColor
                  .replace(/0\.5/g, "0.7")
                  .replace(/0\.2/g, "0.4")
                  .replace(/0\.3/g, "0.5")
                  .replace(/0\.4/g, "0.6"),
              }
        }
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Gradient accent stripe */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 ${box.gradient}`}
        />

        {/* SOLD OUT overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
            <span className="text-2xl font-black text-white/80 rotate-[-12deg] border-2 border-white/30 px-6 py-2 rounded-lg">
              SOLD OUT
            </span>
          </div>
        )}

        {/* Emoji */}
        <div className="text-6xl mb-4 text-center">{box.emoji}</div>

        {/* Name & Tagline */}
        <h3 className="text-xl font-bold text-white mb-1 text-center">
          {box.name}
        </h3>
        <p className="text-white/40 text-xs text-center mb-4 italic">
          {box.tagline}
        </p>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed mb-5 line-clamp-3">
          {box.description}
        </p>

        {/* Price */}
        <div className="flex items-baseline justify-center gap-2 mb-3">
          <span className="text-3xl font-bold text-white">
            {formatPrice(box.price)}
          </span>
          {box.originalPrice && (
            <span className="text-sm text-white/30 line-through">
              {formatPrice(box.originalPrice)}
            </span>
          )}
        </div>

        {/* Info row */}
        <div className="flex items-center justify-center gap-4 text-sm text-white/50 mb-2">
          <span>
            {box.itemCount[0]}–{box.itemCount[1]} items
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          {isLowStock ? (
            <span className="text-orange-400 font-semibold animate-pulse">
              Only {box.stock} left!
            </span>
          ) : (
            <span>{box.stock} in stock</span>
          )}
        </div>

        {/* Stock bar */}
        <div className="w-full h-1.5 bg-white/5 rounded-full mb-6 overflow-hidden">
          <div
            className={`h-full rounded-full ${box.gradient} transition-all duration-500`}
            style={{
              width: `${(box.stock / box.totalStock) * 100}%`,
            }}
          />
        </div>

        {/* Buttons */}
        <div className="mt-auto flex flex-col gap-2">
          <GlowButton
            variant="secondary"
            size="sm"
            onClick={() => setShowRewards(true)}
            className="w-full"
          >
            <Eye className="w-4 h-4" />
            View Rewards
          </GlowButton>
          <GlowButton
            variant="primary"
            size="sm"
            onClick={() => addItem(box.id)}
            disabled={isSoldOut}
            className="w-full"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </GlowButton>
        </div>
      </motion.div>

      {/* Reward preview modal */}
      <RewardPreview
        isOpen={showRewards}
        onClose={() => setShowRewards(false)}
        boxTier={box.id}
      />
    </>
  );
}
