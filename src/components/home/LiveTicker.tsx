"use client";

import { recentWinners } from "@/data/winners";
import { formatPrice } from "@/lib/utils";
import { getBoxByTier } from "@/data/boxes";

export default function LiveTicker() {
  const tickerItems = recentWinners.map((w) => {
    const box = getBoxByTier(w.boxTier);
    return `🔥 ${w.username} just won ${w.item} (${formatPrice(w.value)}) from ${box?.name ?? "Mystery Box"}!`;
  });

  // Duplicate for seamless loop
  const allItems = [...tickerItems, ...tickerItems];

  return (
    <div className="relative w-full overflow-hidden bg-black/60 border-y border-white/5 py-3">
      {/* Gradient edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10" />

      <div className="flex animate-ticker whitespace-nowrap">
        {allItems.map((text, i) => (
          <span
            key={i}
            className="inline-block px-8 text-sm font-medium text-white/70"
          >
            {text}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-ticker {
          animation: ticker 60s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
