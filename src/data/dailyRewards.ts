import type { DailyReward } from "@/types";

export const dailyRewardSchedule: DailyReward[] = [
  { day: 1, reward: "25 Gems", gems: 25, emoji: "🪙", isMilestone: false },
  { day: 2, reward: "50 Gems", gems: 50, emoji: "💰", isMilestone: false },
  { day: 3, reward: "75 Gems", gems: 75, emoji: "🤑", isMilestone: false },
  { day: 4, reward: "50 Gems + 10% Off", gems: 50, emoji: "🏷️", isMilestone: false },
  { day: 5, reward: "100 Gems", gems: 100, emoji: "🔥", isMilestone: false },
  { day: 6, reward: "75 Gems + 20% Off", gems: 75, emoji: "⚡", isMilestone: false },
  { day: 7, reward: "500 Gems + Free Basic Box!", gems: 500, emoji: "👑", isMilestone: true },
];
