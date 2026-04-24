import type { MysteryBox } from "@/types";

export const mysteryBoxes: MysteryBox[] = [
  {
    id: "basic",
    name: "Basic Box",
    price: 999,
    originalPrice: 1499,
    itemCount: [3, 5],
    stock: 42,
    totalStock: 100,
    description:
      "Your gateway into the mystery. Packed with everyday surprises — fashion accessories, cool collectibles, and hidden gems worth way more than you pay.",
    tagline: "Start the Addiction",
    gradient: "bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400",
    glowColor: "0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.2)",
    borderColor: "border-blue-500/40",
    emoji: "📦",
  },
  {
    id: "silver",
    name: "Silver Box",
    price: 2999,
    originalPrice: 4499,
    itemCount: [4, 6],
    stock: 31,
    totalStock: 100,
    description:
      "Step it up. Silver boxes deliver a mix of premium accessories, rare collectibles, and tech essentials. More items, better odds, bigger thrills.",
    tagline: "Level Up Your Luck",
    gradient: "bg-gradient-to-br from-slate-400 via-cyan-300 to-teal-400",
    glowColor: "0 0 30px rgba(148, 163, 184, 0.5), 0 0 60px rgba(34, 211, 238, 0.2)",
    borderColor: "border-cyan-400/40",
    emoji: "🥈",
  },
  {
    id: "gold",
    name: "Gold Box",
    price: 4999,
    originalPrice: 7999,
    itemCount: [5, 7],
    stock: 18,
    totalStock: 100,
    description:
      "The sweet spot. Gold boxes are loaded with high-value drops — branded sneakers, premium tech, signed memorabilia. Real wins start here.",
    tagline: "Where Legends Are Made",
    gradient: "bg-gradient-to-br from-yellow-500 via-amber-400 to-orange-500",
    glowColor: "0 0 30px rgba(245, 158, 11, 0.5), 0 0 60px rgba(245, 158, 11, 0.2)",
    borderColor: "border-amber-400/40",
    emoji: "🥇",
  },
  {
    id: "elite",
    name: "Elite Box",
    price: 9999,
    originalPrice: 14999,
    itemCount: [6, 8],
    stock: 9,
    totalStock: 100,
    description:
      "For the high rollers. Elite boxes unlock epic-tier rewards — smartwatches, designer gear, VIP experiences. Every box is a flex.",
    tagline: "Only the Boldest Survive",
    gradient: "bg-gradient-to-br from-purple-600 via-pink-500 to-fuchsia-500",
    glowColor: "0 0 30px rgba(168, 85, 247, 0.5), 0 0 60px rgba(236, 72, 153, 0.2)",
    borderColor: "border-purple-500/40",
    emoji: "💎",
  },
  {
    id: "ultra",
    name: "Ultra Box — Engraved Edition",
    price: 24999,
    originalPrice: 39999,
    itemCount: [8, 10],
    stock: 5,
    totalStock: 100,
    description:
      "The ultimate mystery experience. Every Ultra Box is personally engraved and packed with legendary-tier drops — MacBooks, iPhones, gold chains, concert passes. This is the endgame.",
    tagline: "The Endgame Awaits",
    gradient:
      "bg-gradient-to-br from-red-500 via-purple-500 to-blue-500",
    glowColor:
      "0 0 40px rgba(239, 68, 68, 0.4), 0 0 80px rgba(168, 85, 247, 0.3), 0 0 120px rgba(59, 130, 246, 0.2)",
    borderColor: "border-fuchsia-400/40",
    emoji: "👑",
  },
];

export function getBoxByTier(tier: string): MysteryBox | undefined {
  return mysteryBoxes.find((box) => box.id === tier);
}
