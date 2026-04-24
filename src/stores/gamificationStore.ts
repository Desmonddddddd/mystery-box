import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GamificationStore {
  lastSpinDate: string | null;
  dailyStreak: number;
  referralCode: string;
  referralCount: number;
  hasClaimedWelcomeBonus: boolean;
  spinResult: string | null;
  canSpinToday: () => boolean;
  recordSpin: (result?: string) => void;
  claimWelcomeBonus: () => void;
  incrementStreak: () => void;
  resetSpinIfNewDay: () => void;
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
    }),
    {
      name: "mysteryx-gamification",
    }
  )
);
