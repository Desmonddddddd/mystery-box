"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, Lock, Flame } from "lucide-react";
import type { MysteryBox } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";

interface BoxCardProps {
  box: MysteryBox;
}

export default function BoxCard({ box }: BoxCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const isSoldOut = box.stock === 0;
  const isLowStock = box.stock > 0 && box.stock < 10;
  const isUltra = box.id === "ultra";

  return (
    <motion.div
      className="relative group rounded-2xl overflow-hidden flex flex-col h-full"
      whileHover={
        isSoldOut
          ? {}
          : {
              scale: 1.03,
              y: -6,
            }
      }
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Background with gradient border effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: box.glowColor }}
      />

      <div className="relative bg-[#0c0c14] border border-white/[0.06] rounded-2xl p-0 flex flex-col h-full overflow-hidden">
        {/* Top section — trunk visual */}
        <div className={`relative h-48 ${box.gradient} flex items-center justify-center overflow-hidden`}>
          {/* Box image */}
          {box.image && (
            <Image
              src={box.image}
              alt={box.name}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14] via-black/30 to-transparent" />

          {/* Lock icon overlay */}
          <div className="absolute bottom-3 right-3 z-10">
            <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <Lock className="w-3.5 h-3.5 text-white/40" />
            </div>
          </div>

          {/* Low stock badge */}
          {isLowStock && (
            <div className="absolute top-3 left-3 z-10">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/90 text-white text-[10px] font-bold uppercase tracking-wider"
              >
                <Flame className="w-3 h-3" />
                {box.stock} Left
              </motion.div>
            </div>
          )}

          {/* Engraved badge for Ultra */}
          {isUltra && (
            <div className="absolute top-3 right-3 z-10">
              <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest">
                Engraved
              </span>
            </div>
          )}

          {/* SOLD OUT overlay */}
          {isSoldOut && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-20 flex items-center justify-center">
              <span className="text-xl font-black text-white/70 rotate-[-12deg] border-2 border-white/20 px-6 py-2 rounded-lg tracking-widest uppercase">
                Sold Out
              </span>
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="flex flex-col flex-1 p-5">
          {/* Name */}
          <h3 className="text-lg font-bold text-white mb-0.5 tracking-tight">
            {box.name}
          </h3>
          <p className="text-white/30 text-[11px] uppercase tracking-wider font-medium mb-3">
            {box.tagline}
          </p>

          {/* Description */}
          <p className="text-white/40 text-sm leading-relaxed mb-5 line-clamp-2">
            {box.description}
          </p>

          {/* Price area */}
          <div className="mt-auto">
            <div className="flex items-baseline gap-2.5 mb-4">
              <span className="text-2xl font-black text-white tracking-tight">
                {formatPrice(box.price)}
              </span>
              {box.originalPrice && (
                <span className="text-xs text-white/25 line-through font-medium">
                  {formatPrice(box.originalPrice)}
                </span>
              )}
            </div>

            {/* Stock bar — subtle */}
            <div className="w-full h-[3px] bg-white/[0.04] rounded-full mb-4 overflow-hidden">
              <div
                className={`h-full rounded-full ${box.gradient} transition-all duration-700`}
                style={{
                  width: `${(box.stock / box.totalStock) * 100}%`,
                }}
              />
            </div>

            {/* CTA */}
            <button
              onClick={() => addItem(box.id)}
              disabled={isSoldOut}
              className="group/btn relative w-full py-3 px-4 rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2 text-white overflow-hidden active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed disabled:!shadow-none"
              style={{
                background: isSoldOut
                  ? "rgba(255,255,255,0.06)"
                  : "linear-gradient(135deg, #EC4899, #8B5CF6, #3B82F6)",
                boxShadow: isSoldOut
                  ? "none"
                  : "0 0 20px rgba(139, 92, 246, 0.35), 0 0 40px rgba(236, 72, 153, 0.15)",
              }}
            >
              {/* Hover shimmer */}
              {!isSoldOut && (
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
              )}
              <ShoppingCart className="w-4 h-4 relative z-10" />
              <span className="relative z-10">
                {isSoldOut ? "Sold Out" : "Add to Cart"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
