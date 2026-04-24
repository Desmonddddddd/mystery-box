import type { BoxTier, Rarity, RewardItem } from "@/types";
import { allRewards, getRewardsByRarity } from "@/data/rewards";
import { getBoxByTier } from "@/data/boxes";
import { getRandomInt } from "@/lib/utils";

// ─── Rarity weight tables per box tier ───────────────────────
// Each value represents the percentage chance for that rarity.
// Values must sum to 100 for each tier.

interface RarityWeights {
  common: number;
  rare: number;
  epic: number;
  legendary: number;
}

const rarityWeightsByTier: Record<BoxTier, RarityWeights> = {
  silver: { common: 70, rare: 25, epic: 4.5, legendary: 0.5 },
  gold: { common: 55, rare: 30, epic: 12, legendary: 3 },
  diamond: { common: 40, rare: 35, epic: 18, legendary: 7 },
  elite: { common: 30, rare: 35, epic: 22, legendary: 13 },
  mega: { common: 20, rare: 32, epic: 28, legendary: 20 },
  ultra: { common: 15, rare: 30, epic: 30, legendary: 25 },
};

// Ordered from lowest to highest rarity for suspense-building sort.
const rarityOrder: Rarity[] = ["common", "rare", "epic", "legendary"];

/**
 * Rolls a single rarity based on the tier's weight table.
 * Generates a random number 0–100 and compares against cumulative weights.
 */
function rollRarity(tier: BoxTier): Rarity {
  const weights = rarityWeightsByTier[tier];
  const roll = Math.random() * 100;

  let cumulative = 0;

  cumulative += weights.common;
  if (roll < cumulative) return "common";

  cumulative += weights.rare;
  if (roll < cumulative) return "rare";

  cumulative += weights.epic;
  if (roll < cumulative) return "epic";

  return "legendary";
}

/**
 * Picks a random item from the pool matching the given rarity.
 * Falls back to the full pool if no items match (shouldn't happen with our data).
 */
function pickRandomFromRarity(rarity: Rarity): RewardItem {
  const pool = getRewardsByRarity(rarity);
  if (pool.length === 0) {
    // Fallback: pick from all rewards
    return allRewards[getRandomInt(0, allRewards.length - 1)];
  }
  return pool[getRandomInt(0, pool.length - 1)];
}

/**
 * Opens a mystery box of the given tier and returns a sorted array of rewards.
 *
 * Algorithm:
 * 1. Determine item count (random between box's min and max)
 * 2. For each slot, roll a rarity using weighted probabilities
 * 3. Pick a random reward from that rarity pool
 * 4. Sort results: common first → legendary last (builds suspense during reveal)
 * 5. Return the array
 */
export function openBox(tier: BoxTier): RewardItem[] {
  const box = getBoxByTier(tier);
  if (!box) {
    throw new Error(`Unknown box tier: ${tier}`);
  }

  const [minItems, maxItems] = box.itemCount;
  const itemCount = getRandomInt(minItems, maxItems);

  const items: RewardItem[] = [];

  for (let i = 0; i < itemCount; i++) {
    const rarity = rollRarity(tier);
    const item = pickRandomFromRarity(rarity);
    items.push(item);
  }

  // Sort by rarity: common first, legendary last — builds suspense during reveal
  items.sort((a, b) => {
    return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
  });

  return items;
}

/**
 * Calculates the total value of a set of reward items.
 */
export function calculateLootValue(items: RewardItem[]): number {
  return items.reduce((sum, item) => sum + item.value, 0);
}

/**
 * Returns the highest-rarity item from a set of rewards.
 */
export function getBestItem(items: RewardItem[]): RewardItem | null {
  if (items.length === 0) return null;
  return items.reduce((best, item) => {
    const bestIdx = rarityOrder.indexOf(best.rarity);
    const itemIdx = rarityOrder.indexOf(item.rarity);
    if (itemIdx > bestIdx) return item;
    if (itemIdx === bestIdx && item.value > best.value) return item;
    return best;
  });
}

/**
 * Opens a box with loss protection. Boosts rarity weights when the user has
 * consecutive low wins or a high luck meter.
 */
export function openBoxWithProtection(
  tier: BoxTier,
  consecutiveLowWins: number,
  luckMeter: number
): RewardItem[] {
  const box = getBoxByTier(tier);
  if (!box) {
    throw new Error(`Unknown box tier: ${tier}`);
  }

  const [minItems, maxItems] = box.itemCount;
  const itemCount = getRandomInt(minItems, maxItems);

  // Get base weights and apply protection boosts
  const baseWeights = { ...rarityWeightsByTier[tier] };

  if (consecutiveLowWins >= 3) {
    // Shift 15% from common to rare/epic
    baseWeights.common = Math.max(baseWeights.common - 15, 10);
    baseWeights.rare += 8;
    baseWeights.epic += 5;
    baseWeights.legendary += 2;
  }

  if (luckMeter >= 80) {
    // Further boost — shift another 10% from common to epic/legendary
    baseWeights.common = Math.max(baseWeights.common - 10, 5);
    baseWeights.epic += 6;
    baseWeights.legendary += 4;
  }

  // Normalize weights to sum to 100
  const total = baseWeights.common + baseWeights.rare + baseWeights.epic + baseWeights.legendary;
  const scale = 100 / total;
  baseWeights.common *= scale;
  baseWeights.rare *= scale;
  baseWeights.epic *= scale;
  baseWeights.legendary *= scale;

  const items: RewardItem[] = [];

  for (let i = 0; i < itemCount; i++) {
    const roll = Math.random() * 100;
    let rarity: Rarity;
    let cumulative = 0;

    cumulative += baseWeights.common;
    if (roll < cumulative) {
      rarity = "common";
    } else {
      cumulative += baseWeights.rare;
      if (roll < cumulative) {
        rarity = "rare";
      } else {
        cumulative += baseWeights.epic;
        if (roll < cumulative) {
          rarity = "epic";
        } else {
          rarity = "legendary";
        }
      }
    }

    // If luck meter is maxed out (100), guarantee at least the first item is rare+
    if (i === 0 && luckMeter >= 100 && rarity === "common") {
      rarity = "rare";
    }

    items.push(pickRandomFromRarity(rarity));
  }

  items.sort((a, b) => {
    return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
  });

  return items;
}
