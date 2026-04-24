"use client";

import { motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import type { CartItem as CartItemType } from "@/types";
import { getBoxByTier } from "@/data/boxes";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateEngraving = useCartStore((s) => s.updateEngraving);

  const box = getBoxByTier(item.boxId);
  if (!box) return null;

  const isUltra = item.boxId === "ultra";
  const lineTotal = box.price * item.quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5"
    >
      <div className="flex items-start gap-4">
        {/* Box emoji */}
        <div className="text-4xl flex-shrink-0">{box.emoji}</div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-white font-semibold text-sm sm:text-base">
                {box.name}
              </h3>
              <p className="text-white/40 text-xs mt-0.5">{box.tagline}</p>
            </div>
            {/* Remove button */}
            <button
              onClick={() => removeItem(item.boxId)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/30 hover:text-red-400 transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Price per box */}
          <p className="text-white/60 text-sm mt-2">
            {formatPrice(box.price)} each
          </p>

          {/* Ultra engraving input */}
          {isUltra && (
            <div className="mt-3">
              <label className="block text-xs text-white/40 mb-1">
                Engraving Name
              </label>
              <input
                type="text"
                value={item.engravingName ?? ""}
                onChange={(e) => updateEngraving(item.boxId, e.target.value)}
                placeholder="Your name for engraving"
                maxLength={20}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-all"
              />
            </div>
          )}

          {/* Quantity & total */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.boxId, item.quantity - 1)}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-white font-semibold text-sm">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.boxId, item.quantity + 1)}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-white font-bold">
              {formatPrice(lineTotal)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
