import { create } from "zustand";
import type { BoxTier, RewardItem } from "@/types";

export type OpeningPhase =
  | "idle"
  | "anticipation"
  | "shake"
  | "burst"
  | "reveal"
  | "summary";

const phaseOrder: OpeningPhase[] = [
  "idle",
  "anticipation",
  "shake",
  "burst",
  "reveal",
  "summary",
];

interface OpeningStore {
  phase: OpeningPhase;
  currentItemIndex: number;
  items: RewardItem[];
  boxTier: BoxTier | null;
  startOpening: (tier: BoxTier, items: RewardItem[]) => void;
  nextPhase: () => void;
  revealNextItem: () => void;
  reset: () => void;
}

export const useOpeningStore = create<OpeningStore>()((set) => ({
  phase: "idle",
  currentItemIndex: 0,
  items: [],
  boxTier: null,

  startOpening: (tier, items) => {
    set({
      phase: "anticipation",
      currentItemIndex: 0,
      items,
      boxTier: tier,
    });
  },

  nextPhase: () => {
    set((state) => {
      const currentIndex = phaseOrder.indexOf(state.phase);
      const nextIndex = Math.min(currentIndex + 1, phaseOrder.length - 1);
      return { phase: phaseOrder[nextIndex] };
    });
  },

  revealNextItem: () => {
    set((state) => {
      const nextIndex = state.currentItemIndex + 1;
      if (nextIndex >= state.items.length) {
        // All items revealed — move to summary
        return { currentItemIndex: nextIndex, phase: "summary" };
      }
      return { currentItemIndex: nextIndex };
    });
  },

  reset: () => {
    set({
      phase: "idle",
      currentItemIndex: 0,
      items: [],
      boxTier: null,
    });
  },
}));
