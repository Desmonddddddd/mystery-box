"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Check, Gift } from "lucide-react";
import { useGamificationStore } from "@/stores/gamificationStore";
import { useUserStore } from "@/stores/userStore";
import { dailyRewardSchedule } from "@/data/dailyRewards";
import { cn } from "@/lib/utils";

export default function DailyRewards() {
  const loginStreak = useGamificationStore((s) => s.loginStreak);
  const claimedDays = useGamificationStore((s) => s.claimedDailyDays);
  const claimDailyReward = useGamificationStore((s) => s.claimDailyReward);
  const recordDailyLogin = useGamificationStore((s) => s.recordDailyLogin);
  const addCredits = useUserStore((s) => s.addCredits);

  useEffect(() => {
    recordDailyLogin();
  }, [recordDailyLogin]);

  const currentDay = Math.min(loginStreak, 7);
  const canClaim = currentDay > 0 && !claimedDays.includes(currentDay);

  const handleClaim = () => {
    if (!canClaim) return;
    const reward = dailyRewardSchedule.find((r) => r.day === currentDay);
    if (reward) {
      addCredits(reward.credits);
      claimDailyReward(currentDay);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-400" />
          <h3 className="text-sm font-semibold text-white">Daily Rewards</h3>
        </div>
        <span className="text-xs text-white/40">
          Streak: {loginStreak} day{loginStreak !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {dailyRewardSchedule.map((day) => {
          const isClaimed = claimedDays.includes(day.day);
          const isCurrent = day.day === currentDay && !isClaimed;
          const isLocked = day.day > currentDay;

          return (
            <motion.div
              key={day.day}
              whileHover={isCurrent ? { scale: 1.05 } : {}}
              whileTap={isCurrent ? { scale: 0.95 } : {}}
              onClick={isCurrent ? handleClaim : undefined}
              className={cn(
                "relative flex flex-col items-center p-2 rounded-xl text-center cursor-default transition-all",
                isClaimed && "bg-green-500/10 border border-green-500/20",
                isCurrent &&
                  "bg-gradient-to-b from-pink-500/10 to-purple-500/10 border border-pink-500/30 cursor-pointer",
                isLocked && "bg-white/5 border border-white/5 opacity-40",
                !isClaimed && !isCurrent && !isLocked && "bg-white/5 border border-white/5",
                day.isMilestone && !isLocked && "ring-1 ring-amber-500/30"
              )}
            >
              {isCurrent && (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-xl bg-gradient-to-b from-pink-500/5 to-purple-500/5"
                />
              )}

              <span className="text-[10px] text-white/40 mb-1">
                Day {day.day}
              </span>
              <span className="text-lg mb-1">{day.emoji}</span>

              {isClaimed ? (
                <Check className="w-3.5 h-3.5 text-green-400" />
              ) : isCurrent ? (
                <span className="text-[9px] font-bold text-pink-400">
                  CLAIM
                </span>
              ) : (
                <span className="text-[9px] text-white/30">
                  {day.credits}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      {canClaim && (
        <motion.button
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleClaim}
          className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Gift className="w-4 h-4" />
          Claim Day {currentDay} Reward
        </motion.button>
      )}
    </div>
  );
}
