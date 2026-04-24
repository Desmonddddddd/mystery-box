import type { DailyReward } from "@/types";

export const dailyRewardSchedule: DailyReward[] = [
  { day: 1, reward: "25 Credits", credits: 25, emoji: "🪙", isMilestone: false },
  { day: 2, reward: "50 Credits", credits: 50, emoji: "💰", isMilestone: false },
  { day: 3, reward: "75 Credits", credits: 75, emoji: "🤑", isMilestone: false },
  { day: 4, reward: "50 Credits + 10% Off", credits: 50, emoji: "🏷️", isMilestone: false },
  { day: 5, reward: "100 Credits", credits: 100, emoji: "🔥", isMilestone: false },
  { day: 6, reward: "75 Credits + 20% Off", credits: 75, emoji: "⚡", isMilestone: false },
  { day: 7, reward: "500 Credits + Free Basic Box!", credits: 500, emoji: "👑", isMilestone: true },
];
