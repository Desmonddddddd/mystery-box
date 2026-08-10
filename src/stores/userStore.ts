import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RewardItem, UserProfile, Order } from "@/types";

// New accounts start with a modest balance; the welcome popup adds +200 on top.
const STARTING_GEMS = 250;
// Existing persisted balances (early testers got a large test grant) are
// clamped to this ceiling by the v4 migration below.
const MIGRATION_GEM_CAP = 2500;

const defaultProfile: UserProfile = {
  name: "",
  phone: "",
  isLoggedIn: false,
  gems: STARTING_GEMS,
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
      version: 4,
      migrate: (persisted: unknown, version: number) => {
        const state = persisted as UserStore;
        const profile = state?.profile ?? defaultProfile;
        let gems = profile.gems ?? STARTING_GEMS;

        if (version <= 1) {
          // v0/v1 → rename credits → gems
          gems =
            (profile as unknown as { credits?: number }).credits ??
            profile.gems ??
            STARTING_GEMS;
        }

        if (version <= 3) {
          // v3 shipped a +50,000 test-gem grant to every persisted account.
          // v4 claws that back: existing users (testers) keep at most 2,500.
          gems = Math.min(Math.max(gems, 0), MIGRATION_GEM_CAP);
        }

        return {
          ...state,
          profile: { ...profile, gems },
        };
      },
    }
  )
);
