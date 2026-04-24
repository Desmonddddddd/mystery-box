import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GamificationStore {
  lastSpinDate: string | null;
  dailyStreak: number;
  referralCode: string;
  referralCount: number;
  hasClaimedWelcomeBonus: boolean;
  spinResult: string | null;
  luckMeter: number;
  consecutiveLowWins: number;
  lastLoginDate: string | null;
  loginStreak: number;
  claimedDailyDays: number[];
  hasFoundSecretBox: boolean;
  secretBoxCooldown: string | null;
  canSpinToday: () => boolean;
  recordSpin: (result?: string) => void;
  claimWelcomeBonus: () => void;
  incrementStreak: () => void;
  resetSpinIfNewDay: () => void;
  incrementLuckMeter: (amount: number) => void;
  resetLuckMeter: () => void;
  recordDailyLogin: () => void;
  claimDailyReward: (day: number) => void;
  findSecretBox: () => void;
  canFindSecretBox: () => boolean;
}

function generateReferralCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "MYX-";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
}

export const useGamificationStore = create<GamificationStore>()(
  persist(
    (set, get) => ({
      lastSpinDate: null,
      dailyStreak: 0,
      referralCode: generateReferralCode(),
      referralCount: 0,
      hasClaimedWelcomeBonus: false,
      spinResult: null,
      luckMeter: 0,
      consecutiveLowWins: 0,
      lastLoginDate: null,
      loginStreak: 0,
      claimedDailyDays: [],
      hasFoundSecretBox: false,
      secretBoxCooldown: null,

      canSpinToday: () => {
        const { lastSpinDate } = get();
        if (!lastSpinDate) return true;
        return lastSpinDate !== getTodayDateString();
      },

      recordSpin: (result) => {
        set({
          lastSpinDate: getTodayDateString(),
          spinResult: result ?? null,
        });
      },

      claimWelcomeBonus: () => {
        set({ hasClaimedWelcomeBonus: true });
      },

      incrementStreak: () => {
        set((state) => ({
          dailyStreak: state.dailyStreak + 1,
        }));
      },

      resetSpinIfNewDay: () => {
        const state = get();
        const today = getTodayDateString();
        if (state.lastSpinDate !== today) {
          set({ spinResult: null });
        }
      },

      incrementLuckMeter: (amount: number) => {
        set((state) => ({
          luckMeter: Math.min(state.luckMeter + amount, 100),
        }));
      },

      resetLuckMeter: () => {
        set({ luckMeter: 0, consecutiveLowWins: 0 });
      },

      recordDailyLogin: () => {
        const state = get();
        const today = getTodayDateString();
        const lastLogin = state.lastLoginDate;

        if (lastLogin) {
          const lastDate = new Date(lastLogin);
          const todayDate = new Date(today);
          const diffTime = todayDate.getTime() - lastDate.getTime();
          const diffDays = diffTime / (1000 * 60 * 60 * 24);

          if (diffDays === 1) {
            set({
              loginStreak: state.loginStreak + 1,
              lastLoginDate: today,
            });
          } else if (diffDays > 1) {
            set({
              loginStreak: 1,
              lastLoginDate: today,
              claimedDailyDays: [],
            });
          } else {
            // Same day, no update needed
            set({ lastLoginDate: today });
          }
        } else {
          set({
            loginStreak: 1,
            lastLoginDate: today,
          });
        }
      },

      claimDailyReward: (day: number) => {
        set((state) => ({
          claimedDailyDays: state.claimedDailyDays.includes(day)
            ? state.claimedDailyDays
            : [...state.claimedDailyDays, day],
        }));
      },

      findSecretBox: () => {
        set({
          hasFoundSecretBox: true,
          secretBoxCooldown: new Date().toISOString(),
        });
      },

      canFindSecretBox: () => {
        const { secretBoxCooldown } = get();
        if (!secretBoxCooldown) return true;
        const cooldownTime = new Date(secretBoxCooldown).getTime();
        const now = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000;
        return now - cooldownTime >= twentyFourHours;
      },
    }),
    {
      name: "mysteryx-gamification",
    }
  )
);
