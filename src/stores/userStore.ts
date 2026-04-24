import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RewardItem, UserProfile, Order } from "@/types";

const defaultProfile: UserProfile = {
  name: "",
  phone: "",
  isLoggedIn: false,
  credits: 0,
  boxesOpened: 0,
  itemsWon: [],
};

interface UserStore {
  profile: UserProfile;
  orders: Order[];
  login: (name: string, phone: string) => void;
  logout: () => void;
  addWonItems: (items: RewardItem[]) => void;
  addCredits: (amount: number) => void;
  spendCredits: (amount: number) => boolean;
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

      addCredits: (amount) => {
        set((state) => ({
          profile: {
            ...state.profile,
            credits: state.profile.credits + amount,
          },
        }));
      },

      spendCredits: (amount) => {
        const state = get();
        if (state.profile.credits >= amount) {
          set({
            profile: {
              ...state.profile,
              credits: state.profile.credits - amount,
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
    }
  )
);
