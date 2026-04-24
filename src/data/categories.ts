export interface Category {
  name: string;
  emoji: string;
  items: string[];
  gradient: string;
  description: string;
}

export const categories: Category[] = [
  {
    name: "Fashion",
    emoji: "👗",
    items: [
      "Designer kicks",
      "Premium streetwear",
      "Accessories that go hard",
      "Stuff you'd flex on Instagram",
    ],
    gradient: "bg-gradient-to-br from-pink-500 to-rose-600",
    description:
      "From head to toe. Every trunk could have your next grail.",
  },
  {
    name: "Tech",
    emoji: "💻",
    items: [
      "Gadgets you actually use",
      "Audio that slaps",
      "Screens, cables, power",
      "The kind of tech that changes plans",
    ],
    gradient: "bg-gradient-to-br from-cyan-500 to-blue-600",
    description:
      "Could be a cable. Could be a laptop. We're not telling.",
  },
  {
    name: "Collectibles",
    emoji: "🎴",
    items: [
      "Signed memorabilia",
      "Limited drops",
      "Cards worth holding",
      "Pieces that appreciate",
    ],
    gradient: "bg-gradient-to-br from-amber-500 to-orange-600",
    description:
      "For the ones who collect, not just consume.",
  },
  {
    name: "Lifestyle",
    emoji: "✨",
    items: [
      "Real jewelry",
      "Premium fragrances",
      "Leather goods",
      "Things that smell expensive",
    ],
    gradient: "bg-gradient-to-br from-purple-500 to-violet-600",
    description:
      "Elevate without trying. These items do the talking.",
  },
  {
    name: "Sports",
    emoji: "🏏",
    items: [
      "Cricket. Skating. Cycling.",
      "Equipment that performs",
      "Gear for the obsessed",
      "Pro-level drops",
    ],
    gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
    description:
      "Built for players, not spectators.",
  },
  {
    name: "Experiences",
    emoji: "🎤",
    items: [
      "VIP access",
      "Front row seats",
      "Days you'll never forget",
      "Vouchers that unlock doors",
    ],
    gradient: "bg-gradient-to-br from-red-500 to-pink-600",
    description:
      "Memories hit harder than things. We pack both.",
  },
  {
    name: "Gaming",
    emoji: "🎮",
    items: [
      "Gaming accessories & controllers",
      "Gift cards & top-ups",
      "Collectible figurines",
      "Gear that levels you up",
    ],
    gradient: "bg-gradient-to-br from-indigo-500 to-blue-600",
    description:
      "For gamers who play to win. Loot drops IRL.",
  },
  {
    name: "Adult Fun",
    emoji: "🔥",
    items: [
      "Premium adult toys",
      "Couple's kits & surprises",
      "Discreet & tasteful picks",
      "Stuff they don't sell at the mall",
    ],
    gradient: "bg-gradient-to-br from-rose-500 to-red-700",
    description:
      "Spice things up. Discreetly packed, zero judgement.",
  },
  {
    name: "Cash & Finance",
    emoji: "💸",
    items: [
      "Real cash vouchers",
      "Gold coins & bars",
      "Crypto top-ups",
      "Investment starter kits",
    ],
    gradient: "bg-gradient-to-br from-yellow-500 to-amber-600",
    description:
      "Money moves. Some trunks literally pay you back.",
  },
];
