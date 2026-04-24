"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowLeft, Package, Sparkles } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { getBoxByTier } from "@/data/boxes";
import { formatPrice } from "@/lib/utils";
import type { BoxTier } from "@/types";

export default function CartPage() {
  const { items, removeItem, updateQuantity, updateEngraving } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch with persisted store
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading cart...</div>
      </div>
    );
  }

  // Calculate totals
  const cartItems = items.map((item) => {
    const box = getBoxByTier(item.boxId);
    return { ...item, box };
  });

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.box?.price ?? 0) * item.quantity;
  }, 0);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-neon-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-neon-pink" />
              Your Cart
            </h1>
            {totalItems > 0 && (
              <p className="text-gray-400 mt-1">
                {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
              </p>
            )}
          </div>
          <Link
            href="/boxes"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        <AnimatePresence mode="wait">
          {items.length === 0 ? (
            /* ─── Empty Cart ──────────────────────────────────── */
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-dark-800 flex items-center justify-center mb-6">
                <Package className="w-12 h-12 text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Your cart is empty
              </h2>
              <p className="text-gray-400 max-w-md mb-8">
                Looks like you haven&apos;t added any mystery boxes yet. Browse our
                collection and start your adventure!
              </p>
              <Link
                href="/boxes"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background:
                    "linear-gradient(135deg, #EC4899, #8B5CF6, #3B82F6)",
                }}
              >
                <Sparkles className="w-5 h-5" />
                Explore Mystery Boxes
              </Link>
            </motion.div>
          ) : (
            /* ─── Cart Items ──────────────────────────────────── */
            <motion.div
              key="cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Items list */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {cartItems.map((item) => {
                    if (!item.box) return null;
                    const isUltra = item.boxId === "ultra";

                    return (
                      <motion.div
                        key={item.boxId}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        className="glass rounded-2xl p-5 sm:p-6"
                      >
                        <div className="flex items-start gap-4 sm:gap-6">
                          {/* Box emoji */}
                          <div
                            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl ${item.box.gradient} flex items-center justify-center text-3xl sm:text-4xl shrink-0`}
                          >
                            {item.box.emoji}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-white truncate">
                              {item.box.name}
                            </h3>
                            <p className="text-sm text-gray-400 mt-1">
                              {item.box.itemCount[0]}–{item.box.itemCount[1]}{" "}
                              items per box
                            </p>

                            {/* Engraving for Ultra */}
                            {isUltra && (
                              <div className="mt-3">
                                <label className="text-xs text-neon-purple font-medium block mb-1">
                                  Engraving Name
                                </label>
                                <input
                                  type="text"
                                  value={item.engravingName ?? ""}
                                  onChange={(e) =>
                                    updateEngraving(
                                      item.boxId,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter name for engraving"
                                  maxLength={20}
                                  className="w-full sm:w-64 px-3 py-2 text-sm rounded-lg bg-dark-800 border border-white/10 text-white placeholder-gray-500 focus:border-neon-purple focus:outline-none transition-colors"
                                />
                              </div>
                            )}

                            {/* Price & quantity */}
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.boxId,
                                      item.quantity - 1
                                    )
                                  }
                                  className="w-8 h-8 rounded-lg bg-dark-800 border border-white/10 flex items-center justify-center text-white hover:bg-dark-700 transition-colors text-sm font-bold"
                                >
                                  -
                                </button>
                                <span className="text-white font-semibold w-6 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.boxId,
                                      item.quantity + 1
                                    )
                                  }
                                  className="w-8 h-8 rounded-lg bg-dark-800 border border-white/10 flex items-center justify-center text-white hover:bg-dark-700 transition-colors text-sm font-bold"
                                >
                                  +
                                </button>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold neon-text">
                                  {formatPrice(item.box.price * item.quantity)}
                                </p>
                                {item.box.originalPrice && (
                                  <p className="text-xs text-gray-500 line-through">
                                    {formatPrice(
                                      item.box.originalPrice * item.quantity
                                    )}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => removeItem(item.boxId)}
                            className="text-gray-500 hover:text-neon-red transition-colors text-sm shrink-0"
                            aria-label="Remove item"
                          >
                            &times;
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* ─── Cart Summary ─────────────────────────────── */}
              <div className="lg:col-span-1">
                <div className="glass rounded-2xl p-6 sticky top-28">
                  <h3 className="text-lg font-bold text-white mb-6">
                    Order Summary
                  </h3>

                  <div className="space-y-3 mb-6">
                    {cartItems.map((item) => {
                      if (!item.box) return null;
                      return (
                        <div
                          key={item.boxId}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-gray-400 truncate mr-2">
                            {item.box.name} &times; {item.quantity}
                          </span>
                          <span className="text-white font-medium shrink-0">
                            {formatPrice(item.box.price * item.quantity)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-white/10 pt-4 mb-6">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-white">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-400">Shipping</span>
                      <span className="text-neon-green font-medium">
                        FREE
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4 mb-8">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold text-lg">Total</span>
                      <span className="text-2xl font-bold neon-text">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="block w-full text-center px-6 py-4 rounded-xl font-bold text-white text-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background:
                        "linear-gradient(135deg, #EC4899, #8B5CF6, #3B82F6)",
                    }}
                  >
                    Proceed to Checkout
                  </Link>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Secure checkout powered by Razorpay
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
