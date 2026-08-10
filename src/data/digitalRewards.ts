import type { DigitalReward, OnlineBoxTier, Rarity } from "@/types";
import { onlineBoxes } from "@/data/onlineBoxes";

// ═══════════════════════════════════════════════════════════
// Tier-scaled reward pools.
//
// Gem payouts are generated as multiples of the tier's stake so a
// 7,999-gem Mythic open can never "win" a 2,500-gem legendary.
// Guarantees per tier:
//   • every legendary-rarity outcome pays MORE than the stake
//   • the median outcome sits below the stake (normal case-site economics)
//   • overall RTP lands between ~61% and ~84% (higher tiers pay better)
// Non-gem catalog items (coupons, merch, free physical boxes) are mixed
// in only where their real value fits the tier's payout band.
// ═══════════════════════════════════════════════════════════

export interface WeightedDigitalReward {
  reward: DigitalReward;
  weight: number;
}

// ─── Non-gem catalog (coupons, merch, free boxes) ──────────
// NOTE: no "cashback" rewards — gems have no cash value, so payouts are
// gems, coupons, or real shippable items only.
export const catalogRewards: DigitalReward[] = [
  // Discount coupons (percent off physical boxes)
  {
    id: "discount-10",
    name: "10% Off Next Box",
    type: "discount",
    value: 10,
    rarity: "common",
    emoji: "🏷️",
    description: "10% discount on your next physical box.",
  },
  {
    id: "discount-20",
    name: "20% Off Next Box",
    type: "discount",
    value: 20,
    rarity: "rare",
    emoji: "🔥",
    description: "20% discount on any physical box.",
  },
  {
    id: "discount-30",
    name: "30% Off Next Box",
    type: "discount",
    value: 30,
    rarity: "rare",
    emoji: "🔥",
    description: "30% discount on any physical box.",
  },
  {
    id: "discount-50",
    name: "50% Off Any Box",
    type: "discount",
    value: 50,
    rarity: "epic",
    emoji: "⚡",
    description: "Half price on ANY physical mystery box!",
  },
  // Merch & free physical boxes (value in ₹, roughly 1 gem ≈ ₹1)
  {
    id: "merch-tshirt",
    name: "MYSTERYX T-Shirt",
    type: "merch",
    value: 999,
    rarity: "epic",
    emoji: "👕",
    description: "Exclusive MYSTERYX branded tee — ships free!",
  },
  {
    id: "free-basic",
    name: "Free Basic Box",
    type: "freeBox",
    value: 999,
    rarity: "epic",
    emoji: "📦",
    description: "One free Basic Box — delivered to your door!",
  },
  {
    id: "free-silver",
    name: "Free Silver Box",
    type: "freeBox",
    value: 2999,
    rarity: "epic",
    emoji: "🥈",
    description: "One free Silver Box — delivered to your door!",
  },
  {
    id: "merch-hoodie",
    name: "MYSTERYX Limited Hoodie",
    type: "merch",
    value: 2499,
    rarity: "legendary",
    emoji: "🧥",
    description: "Ultra-limited MYSTERYX hoodie — only from Jackpot wins!",
  },
  {
    id: "free-gold",
    name: "Free Gold Box",
    type: "freeBox",
    value: 4999,
    rarity: "legendary",
    emoji: "🥇",
    description: "One free Gold Box — delivered to your door!",
  },
  {
    id: "free-elite",
    name: "Free Elite Box",
    type: "freeBox",
    value: 9999,
    rarity: "legendary",
    emoji: "💎",
    description: "One free Elite Box — the ultimate prize!",
  },
];

// ─── Gem payout bands (multiples of the tier stake) ────────
type PayoutBand = { mult: number; weight: number }[];
type RarityBands = Record<Rarity, PayoutBand>;

// Band groups. Low tiers have rare legendaries, so legendary pays a huge
// multiple; high tiers hit legendary often, so it pays a modest premium.
const bandGroups = {
  // starter, bronze (legendary odds 1–2%)
  A: {
    common: [
      { mult: 0.3, weight: 40 },
      { mult: 0.5, weight: 40 },
      { mult: 0.7, weight: 20 },
    ],
    rare: [
      { mult: 0.55, weight: 50 },
      { mult: 0.75, weight: 35 },
      { mult: 1.0, weight: 15 },
    ],
    epic: [
      { mult: 1.0, weight: 60 },
      { mult: 1.5, weight: 30 },
      { mult: 2.0, weight: 10 },
    ],
    legendary: [
      { mult: 6, weight: 60 },
      { mult: 12, weight: 30 },
      { mult: 20, weight: 10 },
    ],
  },
  // silver, gold (legendary odds 3–6%)
  B: {
    common: [
      { mult: 0.25, weight: 40 },
      { mult: 0.4, weight: 40 },
      { mult: 0.6, weight: 20 },
    ],
    rare: [
      { mult: 0.5, weight: 50 },
      { mult: 0.7, weight: 35 },
      { mult: 0.9, weight: 15 },
    ],
    epic: [
      { mult: 0.9, weight: 55 },
      { mult: 1.2, weight: 30 },
      { mult: 1.8, weight: 15 },
    ],
    legendary: [
      { mult: 2.5, weight: 60 },
      { mult: 4, weight: 30 },
      { mult: 6, weight: 10 },
    ],
  },
  // platinum, diamond (legendary odds 8–12%)
  C: {
    common: [
      { mult: 0.2, weight: 50 },
      { mult: 0.3, weight: 35 },
      { mult: 0.45, weight: 15 },
    ],
    rare: [
      { mult: 0.45, weight: 50 },
      { mult: 0.6, weight: 35 },
      { mult: 0.8, weight: 15 },
    ],
    epic: [
      { mult: 0.8, weight: 55 },
      { mult: 1.1, weight: 30 },
      { mult: 1.5, weight: 15 },
    ],
    legendary: [
      { mult: 1.5, weight: 60 },
      { mult: 2.5, weight: 30 },
      { mult: 4, weight: 10 },
    ],
  },
  // elite, master, legendary (legendary odds 17–33%)
  D: {
    common: [
      { mult: 0.15, weight: 50 },
      { mult: 0.25, weight: 35 },
      { mult: 0.4, weight: 15 },
    ],
    rare: [
      { mult: 0.4, weight: 50 },
      { mult: 0.55, weight: 35 },
      { mult: 0.7, weight: 15 },
    ],
    epic: [
      { mult: 0.6, weight: 55 },
      { mult: 0.8, weight: 30 },
      { mult: 1.1, weight: 15 },
    ],
    legendary: [
      { mult: 1.05, weight: 60 },
      { mult: 1.4, weight: 30 },
      { mult: 2.2, weight: 10 },
    ],
  },
  // mythic (legendary odds 45% — payout premium must stay modest)
  E: {
    common: [
      { mult: 0.15, weight: 50 },
      { mult: 0.25, weight: 35 },
      { mult: 0.4, weight: 15 },
    ],
    rare: [
      { mult: 0.4, weight: 50 },
      { mult: 0.55, weight: 35 },
      { mult: 0.7, weight: 15 },
    ],
    epic: [
      { mult: 0.55, weight: 60 },
      { mult: 0.75, weight: 30 },
      { mult: 1.0, weight: 10 },
    ],
    legendary: [
      { mult: 1.02, weight: 65 },
      { mult: 1.3, weight: 25 },
      { mult: 1.8, weight: 10 },
    ],
  },
} satisfies Record<string, RarityBands>;

const tierBandGroup: Record<OnlineBoxTier, keyof typeof bandGroups> = {
  starter: "A",
  bronze: "A",
  silver: "B",
  gold: "B",
  platinum: "C",
  diamond: "C",
  elite: "D",
  master: "D",
  legendary: "D",
  mythic: "E",
};

// ─── Helpers ───────────────────────────────────────────────
const tierStake = (tier: OnlineBoxTier): number =>
  onlineBoxes.find((b) => b.id === tier)?.gemCost ?? 99;

const roundGems = (amount: number): number =>
  Math.max(5, Math.round(amount / 5) * 5);

const GEM_EMOJI: Record<Rarity, string> = {
  common: "🪙",
  rare: "💰",
  epic: "🤑",
  legendary: "👑",
};

const GEM_DESCRIPTION: Record<Rarity, string> = {
  common: "Gems added straight to your balance.",
  rare: "Solid gem win — added to your balance!",
  epic: "Big gem drop — added to your balance!",
  legendary: "JACKPOT! A gem payout bigger than your stake!",
};

function makeGemReward(amount: number, rarity: Rarity): DigitalReward {
  return {
    id: `gems-${rarity}-${amount}`,
    name: `${amount.toLocaleString()} Gems`,
    type: "gems",
    value: amount,
    rarity,
    emoji: GEM_EMOJI[rarity],
    description: GEM_DESCRIPTION[rarity],
  };
}

// Flavor slot: mix a non-gem catalog item into the pool when its real
// value fits the tier's payout band for that rarity.
const FLAVOR_WEIGHT = 10;

function flavorRewardsFor(
  tier: OnlineBoxTier,
  rarity: Rarity
): DigitalReward[] {
  const stake = tierStake(tier);

  if (rarity === "common") {
    return catalogRewards.filter((r) => r.id === "discount-10");
  }
  if (rarity === "rare") {
    // Bigger coupon for bigger stakes
    return catalogRewards.filter((r) =>
      stake >= 999 ? r.id === "discount-30" : r.id === "discount-20"
    );
  }
  if (rarity === "epic") {
    const fits = catalogRewards.filter(
      (r) =>
        r.rarity === "epic" &&
        r.type !== "discount" &&
        r.value >= stake * 0.6 &&
        r.value <= stake * 1.6
    );
    return fits.length > 0
      ? fits
      : catalogRewards.filter((r) => r.id === "discount-50");
  }
  // legendary: only items worth strictly MORE than the stake qualify
  return catalogRewards.filter(
    (r) =>
      r.rarity === "legendary" && r.value > stake && r.value <= stake * 2.5
  );
}

// ─── Public API ────────────────────────────────────────────
export function getTierRewardPool(
  tier: OnlineBoxTier,
  rarity: Rarity
): WeightedDigitalReward[] {
  const stake = tierStake(tier);
  const band = bandGroups[tierBandGroup[tier]][rarity];

  const pool: WeightedDigitalReward[] = band.map(({ mult, weight }) => ({
    reward: makeGemReward(roundGems(stake * mult), rarity),
    weight,
  }));

  for (const flavor of flavorRewardsFor(tier, rarity)) {
    pool.push({ reward: flavor, weight: FLAVOR_WEIGHT });
  }

  return pool;
}

// Kept for compatibility: full flat catalog (non-gem items).
export const allDigitalRewards: DigitalReward[] = catalogRewards;

export function getDigitalRewardsByRarity(rarity: Rarity): DigitalReward[] {
  return catalogRewards.filter((r) => r.rarity === rarity);
}
