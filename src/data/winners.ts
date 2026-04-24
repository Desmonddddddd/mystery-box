import type { WinEntry } from "@/types";

const now = Date.now();
const minute = 60 * 1000;

function minutesAgo(m: number): string {
  return new Date(now - m * minute).toISOString();
}

export const recentWinners: WinEntry[] = [
  {
    username: "Arjun_M",
    item: "MacBook Air M2",
    value: 99999,
    boxTier: "ultra",
    timestamp: minutesAgo(2),
  },
  {
    username: "PriyaSharma",
    item: "boAt Airdopes 141",
    value: 1299,
    boxTier: "gold",
    timestamp: minutesAgo(5),
  },
  {
    username: "Rohit_K",
    item: "22K Gold Chain (5g)",
    value: 35000,
    boxTier: "ultra",
    timestamp: minutesAgo(8),
  },
  {
    username: "NehaGupta21",
    item: "Nike Air Max 90",
    value: 8999,
    boxTier: "elite",
    timestamp: minutesAgo(12),
  },
  {
    username: "DeepakPatel",
    item: "JBL Go 3 Portable Speaker",
    value: 2999,
    boxTier: "silver",
    timestamp: minutesAgo(15),
  },
  {
    username: "Simran_K",
    item: "Concert VIP Pass — Front Row",
    value: 15000,
    boxTier: "elite",
    timestamp: minutesAgo(18),
  },
  {
    username: "AkashDev",
    item: "Signed Virat Kohli Bat",
    value: 75000,
    boxTier: "ultra",
    timestamp: minutesAgo(22),
  },
  {
    username: "KaranJ",
    item: "Pokemon Booster Box (10 Packs)",
    value: 1999,
    boxTier: "silver",
    timestamp: minutesAgo(26),
  },
  {
    username: "Tanvi_P",
    item: "Tom Ford Perfume Gift Set",
    value: 9999,
    boxTier: "elite",
    timestamp: minutesAgo(30),
  },
  {
    username: "RahulVerma",
    item: "UV Protection Sunglasses",
    value: 299,
    boxTier: "silver",
    timestamp: minutesAgo(35),
  },
  {
    username: "MeghaS",
    item: "iPhone 16",
    value: 79999,
    boxTier: "ultra",
    timestamp: minutesAgo(40),
  },
  {
    username: "AmitSingh",
    item: "925 Sterling Silver Ring",
    value: 1499,
    boxTier: "silver",
    timestamp: minutesAgo(45),
  },
  {
    username: "VikramB",
    item: "Samsung Galaxy Tab A9",
    value: 12999,
    boxTier: "gold",
    timestamp: minutesAgo(50),
  },
  {
    username: "DivyaR",
    item: "Cult.fit 3-Month Membership",
    value: 5999,
    boxTier: "gold",
    timestamp: minutesAgo(55),
  },
  {
    username: "IshaSaxena",
    item: "Callaway Premium Golf Club Set",
    value: 45000,
    boxTier: "ultra",
    timestamp: minutesAgo(60),
  },
];
