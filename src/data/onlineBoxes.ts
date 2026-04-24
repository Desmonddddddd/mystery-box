import type { OnlineBox } from "@/types";

export const onlineBoxes: OnlineBox[] = [
  {
    id: "mini",
    name: "Mini Box",
    creditCost: 50,
    description: "Quick spin! Small digital prizes — credits, discounts, and surprises.",
    tagline: "Quick & Fun",
    gradient: "bg-gradient-to-br from-green-500 via-emerald-400 to-teal-400",
    glowColor: "0 0 30px rgba(16, 185, 129, 0.5), 0 0 60px rgba(16, 185, 129, 0.2)",
    borderColor: "border-emerald-400/40",
    emoji: "🎲",
  },
  {
    id: "standard",
    name: "Standard Box",
    creditCost: 150,
    description: "Decent digital rewards — bigger credit wins, discount codes, and rare drops.",
    tagline: "Solid Value",
    gradient: "bg-gradient-to-br from-blue-500 via-indigo-400 to-violet-400",
    glowColor: "0 0 30px rgba(99, 102, 241, 0.5), 0 0 60px rgba(99, 102, 241, 0.2)",
    borderColor: "border-indigo-400/40",
    emoji: "🎰",
  },
  {
    id: "mega",
    name: "Mega Box",
    creditCost: 500,
    description: "High-value digital rewards. Free box vouchers, massive credit jackpots, and exclusive merch.",
    tagline: "Go Big",
    gradient: "bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-400",
    glowColor: "0 0 30px rgba(245, 158, 11, 0.5), 0 0 60px rgba(245, 158, 11, 0.2)",
    borderColor: "border-amber-400/40",
    emoji: "💰",
  },
  {
    id: "jackpot",
    name: "Jackpot Box",
    creditCost: 1000,
    description: "The ultimate digital gamble. Legendary credit explosions, free Elite boxes, and exclusive collectibles.",
    tagline: "All or Nothing",
    gradient: "bg-gradient-to-br from-red-500 via-pink-500 to-purple-500",
    glowColor: "0 0 40px rgba(239, 68, 68, 0.4), 0 0 80px rgba(236, 72, 153, 0.3)",
    borderColor: "border-pink-400/40",
    emoji: "🎰",
  },
];

export function getOnlineBoxByTier(tier: string): OnlineBox | undefined {
  return onlineBoxes.find((box) => box.id === tier);
}
