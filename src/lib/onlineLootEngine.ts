import type { OnlineBoxTier, DigitalReward, Rarity } from "@/types";
import { allDigitalRewards, getDigitalRewardsByRarity } from "@/data/digitalRewards";
import { getRandomInt } from "@/lib/utils";

// ─── Rarity weights for each virtual mystery box tier ──────
const onlineRarityWeights: Record<OnlineBoxTier, Record<Rarity, number>> = {
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

/**
 * Opens a virtual mystery box and returns a single digital reward.
 */
export function openOnlineBox(tier: OnlineBoxTier): DigitalReward {
  const weights = onlineRarityWeights[tier];
  const roll = Math.random() * 100;

  let rarity: Rarity;
  let cumulative = 0;

  cumulative += weights.common;
  if (roll < cumulative) {
    rarity = "common";
  } else {
    cumulative += weights.rare;
    if (roll < cumulative) {
      rarity = "rare";
    } else {
      cumulative += weights.epic;
      if (roll < cumulative) {
        rarity = "epic";
      } else {
        rarity = "legendary";
      }
    }
  }

  const pool = getDigitalRewardsByRarity(rarity);
  if (pool.length === 0) {
    return allDigitalRewards[getRandomInt(0, allDigitalRewards.length - 1)];
  }
  return pool[getRandomInt(0, pool.length - 1)];
}
