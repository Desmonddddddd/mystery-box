"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";
import { getBoxByTier } from "@/data/boxes";
import { formatPrice } from "@/lib/utils";
import GlowButton from "@/components/ui/GlowButton";
import GlassCard from "@/components/ui/GlassCard";

export default function CartSummary() {
  const items = useCartStore((s) => s.items);

  const { subtotal, totalItems } = useMemo(() => {
    let subtotal = 0;
    let totalItems = 0;
    items.forEach((item) => {
      const box = getBoxByTier(item.boxId);
      if (box) {
        subtotal += box.price * item.quantity;
        totalItems += item.quantity;
      }
    });
    return { subtotal, totalItems };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <GlassCard hover={false} glow="rgba(139, 92, 246, 0.1)">
      <h3 className="text-lg font-bold text-white mb-6">Order Summary</h3>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/50">
            Items ({totalItems})
          </span>
          <span className="text-white">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-white/50">Shipping</span>
          <span className="text-green-400 font-medium">FREE</span>
        </div>

        <div className="h-px bg-white/10" />

        <div className="flex items-center justify-between">
          <span className="text-white font-semibold">Total</span>
          <span className="text-xl font-bold text-white">
            {formatPrice(subtotal)}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <GlowButton href="/checkout" variant="primary" size="lg" className="w-full">
          Proceed to Checkout
        </GlowButton>

        <Link
          href="/boxes"
          className="block text-center text-sm text-white/40 hover:text-white/60 transition-colors py-2"
        >
          Continue Shopping
        </Link>
      </div>
    </GlassCard>
  );
}
