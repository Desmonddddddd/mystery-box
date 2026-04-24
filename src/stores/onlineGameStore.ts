import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DigitalReward } from "@/types";

interface OnlineGameStore {
  totalPlays: number;
  biggestWin: DigitalReward | null;
  recentWins: DigitalReward[];
  isPlaying: boolean;
  currentResult: DigitalReward | null;
  recordPlay: (reward: DigitalReward) => void;
  startPlaying: () => void;
  stopPlaying: () => void;
  setResult: (reward: DigitalReward | null) => void;
  clearResult: () => void;
}

export const useOnlineGameStore = create<OnlineGameStore>()(
  persist(
    (set, get) => ({
      totalPlays: 0,
      biggestWin: null,
      recentWins: [],
      isPlaying: false,
      currentResult: null,

      recordPlay: (reward) => {
        const state = get();
        const newRecentWins = [reward, ...state.recentWins].slice(0, 10);
        const isBiggest =
          !state.biggestWin || reward.value > state.biggestWin.value;

        set({
          totalPlays: state.totalPlays + 1,
          recentWins: newRecentWins,
          biggestWin: isBiggest ? reward : state.biggestWin,
          currentResult: reward,
          isPlaying: false,
        });
      },

      startPlaying: () => set({ isPlaying: true, currentResult: null }),
      stopPlaying: () => set({ isPlaying: false }),
      setResult: (reward) => set({ currentResult: reward, isPlaying: false }),
      clearResult: () => set({ currentResult: null }),
    }),
    {
      name: "mysteryx-online",
      partialize: (state) => ({
        totalPlays: state.totalPlays,
        biggestWin: state.biggestWin,
        recentWins: state.recentWins,
      }),
    }
  )
);
