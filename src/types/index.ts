export type Rarity = "common" | "rare" | "epic" | "legendary";
export type BoxTier = "basic" | "silver" | "gold" | "elite" | "ultra";

export interface MysteryBox {
  id: BoxTier;
  name: string;
  price: number;
  originalPrice?: number;
  itemCount: [number, number]; // [min, max]
  stock: number;
  totalStock: number;
  description: string;
  tagline: string;
  gradient: string;
  glowColor: string;
  borderColor: string;
  emoji: string;
}

export interface RewardItem {
  id: string;
  name: string;
  category: string;
  rarity: Rarity;
  value: number;
  image: string;
  emoji: string;
}

export interface Comment {
  id: string;
  username: string;
  avatar: string;
  text: string;
  likes: number;
  timestamp: string;
  isLiked?: boolean;
}

export interface WinEntry {
  username: string;
  item: string;
  value: number;
  boxTier: BoxTier;
  timestamp: string;
}

export interface CartItem {
  boxId: BoxTier;
  quantity: number;
  engravingName?: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  isLoggedIn: boolean;
  credits: number;
  boxesOpened: number;
  itemsWon: RewardItem[];
}

export interface Order {
  id: string;
  boxId: BoxTier;
  boxName: string;
  quantity: number;
  total: number;
  status: "confirmed" | "shipped" | "delivered";
  date: string;
  engravingName?: string;
}

// ─── Online Game Types ─────────────────────────────────────
export type OnlineBoxTier = "mini" | "standard" | "mega" | "jackpot";

export interface OnlineBox {
  id: OnlineBoxTier;
  name: string;
  creditCost: number;
  description: string;
  tagline: string;
  gradient: string;
  glowColor: string;
  borderColor: string;
  emoji: string;
}

export interface DigitalReward {
  id: string;
  name: string;
  type: "credits" | "discount" | "freeBox" | "merch" | "cashback";
  value: number;
  rarity: Rarity;
  emoji: string;
  description: string;
}

// ─── Blog Types ────────────────────────────────────────────
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: "unboxing" | "tips" | "community" | "news";
  readTime: number;
  emoji: string;
}

// ─── Daily Rewards ─────────────────────────────────────────
export interface DailyReward {
  day: number;
  reward: string;
  credits: number;
  emoji: string;
  isMilestone: boolean;
}

// ─── Featured Winner ───────────────────────────────────────
export interface FeaturedWinner {
  username: string;
  item: string;
  value: number;
  boxTier: BoxTier;
  avatar: string;
  period: "daily" | "weekly";
}
