"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, Lock, Check, ChevronDown } from "lucide-react";
import type { MysteryBox } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import { CONTENTS_GUARANTEE } from "@/data/boxes";

interface BoxCardProps {
  box: MysteryBox;
}

const ODDS_ROWS: {
  key: keyof MysteryBox["odds"];
  label: string;
  color: string;
}[] = [
  { key: "common", label: "Common", color: "text-gray-300" },
  { key: "rare", label: "Rare", color: "text-sky-300" },
  { key: "epic", label: "Epic", color: "text-purple-300" },
  { key: "legendary", label: "Legendary", color: "text-amber-300" },
];

export default function BoxCard({ box }: BoxCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const isSoldOut = box.stock === 0;
  const isUltra = box.id === "ultra";
  const [oddsOpen, setOddsOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (addedTimer.current) clearTimeout(addedTimer.current);
    };
  }, []);

  const handleAdd = () => {
    addItem(box.id);
    setAdded(true);
    if (addedTimer.current) clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAdded(false), 1200);
  };

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
        <div className={`relative h-64 bg-[#0c0c14] flex items-center justify-center overflow-hidden`}>
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

          {/* Honest merchandising badge */}
          {box.badge && (
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                {box.badge}
              </span>
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
        <div className="flex flex-col flex-1 p-4">
          {/* Name */}
          <h3 className="text-base font-bold text-white mb-0.5 tracking-tight">
            {box.name}
          </h3>
          <p className="text-white/30 text-[10px] uppercase tracking-wider font-medium mb-2">
            {box.tagline}
          </p>

          {/* Description */}
          <p className="text-white/40 text-xs leading-relaxed mb-3 line-clamp-2">
            {box.description}
          </p>

          {/* Contents & odds disclosure — expandable */}
          <div className="mb-3 rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            <button
              type="button"
              onClick={() => setOddsOpen((o) => !o)}
              aria-expanded={oddsOpen}
              className="w-full min-h-[44px] px-3 py-2 flex items-center justify-between gap-2 text-left"
            >
              <span className="text-xs font-semibold text-white/60">
                {box.itemCount[0]}–{box.itemCount[1]} items
                <span className="text-white/25 font-normal"> · What are the odds?</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-white/30 transition-transform duration-200 shrink-0 ${
                  oddsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {oddsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3 pt-1 space-y-1.5">
                    {ODDS_ROWS.map((row) => (
                      <div
                        key={row.key}
                        className="flex items-center justify-between text-[11px]"
                      >
                        <span className={`font-medium ${row.color}`}>
                          {row.label}
                        </span>
                        <span className="text-white/50 font-mono">
                          {box.odds[row.key]}%
                        </span>
                      </div>
                    ))}
                    <p className="text-[10px] text-white/35 leading-relaxed pt-1.5 border-t border-white/[0.06]">
                      {CONTENTS_GUARANTEE}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Price area */}
          <div className="mt-auto">
            <div className="flex items-baseline gap-2.5 mb-3">
              <span className="text-xl font-black text-white tracking-tight">
                {formatPrice(box.price)}
              </span>
            </div>

            {/* CTA */}
            <button
              onClick={handleAdd}
              disabled={isSoldOut}
              className="group/btn relative w-full min-h-[44px] py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2 text-white overflow-hidden active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed disabled:!shadow-none"
              style={{
                background: isSoldOut
                  ? "rgba(255,255,255,0.06)"
                  : added
                    ? "linear-gradient(135deg, #10B981, #059669)"
                    : "linear-gradient(135deg, #EC4899, #8B5CF6, #3B82F6)",
                boxShadow: isSoldOut
                  ? "none"
                  : added
                    ? "0 0 20px rgba(16, 185, 129, 0.35)"
                    : "0 0 20px rgba(139, 92, 246, 0.35), 0 0 40px rgba(236, 72, 153, 0.15)",
              }}
            >
              {/* Hover shimmer */}
              {!isSoldOut && !added && (
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
              )}
              {added ? (
                <Check className="w-4 h-4 relative z-10" />
              ) : (
                <ShoppingCart className="w-4 h-4 relative z-10" />
              )}
              <span className="relative z-10">
                {isSoldOut ? "Sold Out" : added ? "Added ✓" : "Add to Cart"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
