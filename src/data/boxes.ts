import type { MysteryBox } from "@/types";

export const mysteryBoxes: MysteryBox[] = [
  {
    id: "basic",
    name: "The Starter Trunk",
    price: 999,
    originalPrice: 1499,
    itemCount: [3, 5],
    stock: 42,
    totalStock: 100,
    description:
      "Your first step into the unknown. What's inside? Only one way to find out.",
    tagline: "Begin the Mystery",
    gradient: "bg-gradient-to-br from-slate-600 via-slate-500 to-zinc-400",
    glowColor: "0 0 25px rgba(100, 116, 139, 0.3), 0 0 50px rgba(100, 116, 139, 0.1)",
    borderColor: "border-slate-500/30",
    emoji: "🗃️",
  },
  {
    id: "silver",
    name: "The Silver Vault",
    price: 2999,
    originalPrice: 4499,
    itemCount: [4, 6],
    stock: 31,
    totalStock: 100,
    description:
      "A heavier trunk. A deeper mystery. Something worth chasing is locked inside.",
    tagline: "Unlock the Unknown",
    gradient: "bg-gradient-to-br from-slate-400 via-cyan-300 to-teal-400",
    glowColor: "0 0 25px rgba(148, 163, 184, 0.4), 0 0 50px rgba(34, 211, 238, 0.15)",
    borderColor: "border-cyan-400/30",
    emoji: "🔒",
  },
  {
    id: "gold",
    name: "The Gold Reserve",
    price: 4999,
    originalPrice: 7999,
    itemCount: [5, 7],
    stock: 18,
    totalStock: 100,
    description:
      "Sealed tight. Packed heavy. The kind of trunk people talk about for weeks.",
    tagline: "Fortune Favours the Bold",
    gradient: "bg-gradient-to-br from-yellow-500 via-amber-400 to-orange-500",
    glowColor: "0 0 30px rgba(245, 158, 11, 0.4), 0 0 60px rgba(245, 158, 11, 0.15)",
    borderColor: "border-amber-400/30",
    emoji: "🏆",
  },
  {
    id: "elite",
    name: "The Elite Chest",
    price: 9999,
    originalPrice: 14999,
    itemCount: [6, 8],
    stock: 9,
    totalStock: 100,
    description:
      "Reserved for those who dare. This chest holds what others only dream about.",
    tagline: "Not for the Faint-Hearted",
    gradient: "bg-gradient-to-br from-purple-600 via-pink-500 to-fuchsia-500",
    glowColor: "0 0 30px rgba(168, 85, 247, 0.4), 0 0 60px rgba(236, 72, 153, 0.15)",
    borderColor: "border-purple-500/30",
    emoji: "💎",
  },
  {
    id: "ultra",
    name: "The Ultra Vault — Engraved",
    price: 24999,
    originalPrice: 39999,
    itemCount: [8, 10],
    stock: 5,
    totalStock: 100,
    description:
      "The final trunk. Personally engraved. Legendary contents. This is the endgame.",
    tagline: "The Endgame Awaits",
    gradient:
      "bg-gradient-to-br from-red-500 via-purple-500 to-blue-500",
    glowColor:
      "0 0 35px rgba(239, 68, 68, 0.3), 0 0 70px rgba(168, 85, 247, 0.2), 0 0 100px rgba(59, 130, 246, 0.1)",
    borderColor: "border-fuchsia-400/30",
    emoji: "👑",
  },
];

export function getBoxByTier(tier: string): MysteryBox | undefined {
  return mysteryBoxes.find((box) => box.id === tier);
}
