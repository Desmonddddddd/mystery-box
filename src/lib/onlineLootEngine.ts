import type { OnlineBoxTier, DigitalReward, Rarity } from "@/types";
import { getTierRewardPool } from "@/data/digitalRewards";
import type { WeightedDigitalReward } from "@/data/digitalRewards";

// ─── Rarity weights for each virtual mystery box tier ──────
// These are the REAL odds — the /virtual odds table renders directly
// from this object, and the "up to 45% Legendary" banner refers to the
// mythic tier below.
export const onlineRarityWeights: Record<
  OnlineBoxTier,
  Record<Rarity, number>
> = {
  starter:   { common: 80, rare: 15, epic: 4, legendary: 1 },
  bronze:    { common: 70, rare: 22, epic: 6, legendary: 2 },
  silver:    { common: 60, rare: 27, epic: 10, legendary: 3 },
  gold:      { common: 50, rare: 30, epic: 14, legendary: 6 },
  platinum:  { common: 42, rare: 32, epic: 18, legendary: 8 },
  diamond:   { common: 35, rare: 30, epic: 23, legendary: 12 },
  elite:     { common: 25, rare: 30, epic: 28, legendary: 17 },
  master:    { common: 18, rare: 27, epic: 32, legendary: 23 },
  legendary: { common: 10, rare: 22, epic: 35, legendary: 33 },
  mythic:    { common: 5, rare: 15, epic: 35, legendary: 45 },
};

const RARITY_ORDER: Rarity[] = ["common", "rare", "epic", "legendary"];

function rollRarity(tier: OnlineBoxTier): Rarity {
  const weights = onlineRarityWeights[tier];
  const total = RARITY_ORDER.reduce((sum, r) => sum + weights[r], 0);
  let roll = Math.random() * total;
  for (const rarity of RARITY_ORDER) {
    roll -= weights[rarity];
    if (roll < 0) return rarity;
  }
  return "legendary";
}

function pickWeightedReward(pool: WeightedDigitalReward[]): DigitalReward {
  const total = pool.reduce((sum, entry) => sum + entry.weight, 0);
  let roll = Math.random() * total;
  for (const entry of pool) {
    roll -= entry.weight;
    if (roll < 0) return entry.reward;
  }
  return pool[pool.length - 1].reward;
}

/**
 * Opens a virtual mystery box and returns a single digital reward.
 *
 * 1. Roll a rarity using the tier's rarity weights above.
 * 2. Pick a reward from that tier's rarity pool (weighted). Pools are
 *    scaled to the tier's stake, so legendary outcomes always pay more
 *    than the box cost while the median outcome sits below it.
 */
export function openOnlineBox(tier: OnlineBoxTier): DigitalReward {
  const rarity = rollRarity(tier);
  const pool = getTierRewardPool(tier, rarity);
  return pickWeightedReward(pool);
}
