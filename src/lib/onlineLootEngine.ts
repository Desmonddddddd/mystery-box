import type { OnlineBoxTier, DigitalReward, Rarity } from "@/types";
import { allDigitalRewards, getDigitalRewardsByRarity } from "@/data/digitalRewards";
import { getRandomInt } from "@/lib/utils";

// ─── Rarity weights for online box tiers ────────────────────
const onlineRarityWeights: Record<OnlineBoxTier, Record<Rarity, number>> = {
  mini:     { common: 65, rare: 25, epic: 8, legendary: 2 },
  standard: { common: 50, rare: 30, epic: 15, legendary: 5 },
  mega:     { common: 30, rare: 35, epic: 25, legendary: 10 },
  jackpot:  { common: 15, rare: 25, epic: 35, legendary: 25 },
};

/**
 * Opens an online mystery box and returns a single digital reward.
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
