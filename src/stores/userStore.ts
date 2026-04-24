import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RewardItem, UserProfile, Order } from "@/types";

const defaultProfile: UserProfile = {
  name: "",
  phone: "",
  isLoggedIn: false,
  gems: 50000,
  boxesOpened: 0,
  itemsWon: [],
};

interface UserStore {
  profile: UserProfile;
  orders: Order[];
  login: (name: string, phone: string) => void;
  logout: () => void;
  addWonItems: (items: RewardItem[]) => void;
  addGems: (amount: number) => void;
  spendGems: (amount: number) => boolean;
  incrementBoxesOpened: () => void;
  addOrder: (order: Order) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      profile: defaultProfile,
      orders: [],

      login: (name, phone) => {
        set((state) => ({
          profile: {
            ...state.profile,
            name,
            phone,
            isLoggedIn: true,
          },
        }));
      },

      logout: () => {
        set({ profile: defaultProfile, orders: [] });
      },

      addWonItems: (items) => {
        set((state) => ({
          profile: {
            ...state.profile,
            itemsWon: [...state.profile.itemsWon, ...items],
          },
        }));
      },

      addGems: (amount) => {
        set((state) => ({
          profile: {
            ...state.profile,
            gems: state.profile.gems + amount,
          },
        }));
      },

      spendGems: (amount) => {
        const state = get();
        if (state.profile.gems >= amount) {
          set({
            profile: {
              ...state.profile,
              gems: state.profile.gems - amount,
            },
          });
          return true;
        }
        return false;
      },

      incrementBoxesOpened: () => {
        set((state) => ({
          profile: {
            ...state.profile,
            boxesOpened: state.profile.boxesOpened + 1,
          },
        }));
      },

      addOrder: (order) => {
        set((state) => ({
          orders: [...state.orders, order],
        }));
      },
    }),
    {
      name: "mysteryx-user",
      version: 3,
      migrate: (persisted: unknown, version: number) => {
        const state = persisted as UserStore;
        if (version === 0) {
          return {
            ...state,
            profile: {
              ...state.profile,
              gems: (state.profile as unknown as { credits?: number }).credits ?? 1000,
            },
          };
        }
        if (version === 1) {
          // v1 → v2: rename credits → gems
          return {
            ...state,
            profile: {
              ...state.profile,
              gems: (state.profile as unknown as { credits?: number }).credits ?? state.profile.gems ?? 1000,
            },
          };
        }
        if (version === 2) {
          // v2 → v3: add 50000 gems for testing
          return {
            ...state,
            profile: {
              ...state.profile,
              gems: (state.profile.gems ?? 0) + 50000,
            },
          };
        }
        return state;
      },
    }
  )
);
