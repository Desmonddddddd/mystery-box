export interface Category {
  name: string;
  emoji: string;
  items: string[];
  gradient: string;
  description: string;
}

export const categories: Category[] = [
  {
    name: "Fashion",
    emoji: "👗",
    items: [
      "Nike Air Max 90",
      "Fossil Gen 6 Smartwatch",
      "Retro Cricket Jersey",
      "Streetwear Beanies",
      "Designer Face Masks",
      "UV Sunglasses",
      "Urban Backpacks",
      "Funky Socks 3-Pack",
    ],
    gradient: "bg-gradient-to-br from-pink-500 to-rose-600",
    description:
      "Drip or drown. From streetwear essentials to designer kicks and luxury watches — every box could hold your next flex.",
  },
  {
    name: "Tech",
    emoji: "💻",
    items: [
      "MacBook Air M2",
      "iPhone 16",
      "Samsung Galaxy Tab A9",
      "boAt Airdopes 141",
      "JBL Go 3 Speaker",
      "RGB Mechanical Keyboard",
      "Anker Power Bank",
      "RGB LED Strips",
    ],
    gradient: "bg-gradient-to-br from-cyan-500 to-blue-600",
    description:
      "From cables to MacBooks. Tech drops that range from everyday essentials to jaw-dropping legendary pulls.",
  },
  {
    name: "Collectibles",
    emoji: "🎴",
    items: [
      "Signed Virat Kohli Bat",
      "Pokemon Booster Box",
      "Anime Action Figures",
      "Funko Pop! Collection",
      "Signed IPL Cricket Ball",
      "Holographic Sticker Packs",
      "Cricket Trading Cards",
      "Limited Edition Sneaker Display",
    ],
    gradient: "bg-gradient-to-br from-amber-500 to-orange-600",
    description:
      "For the collectors and superfans. Rare cards, signed memorabilia, limited editions — stuff money can't always buy.",
  },
  {
    name: "Lifestyle",
    emoji: "✨",
    items: [
      "22K Gold Chain (5g)",
      "Tom Ford Perfume Set",
      "Italian Silver Chain",
      "925 Sterling Silver Ring",
      "Premium Leather Wallet",
      "Scented Soy Candles",
      "Perfume Discovery Sets",
      "Windproof Metal Lighter",
    ],
    gradient: "bg-gradient-to-br from-purple-500 to-violet-600",
    description:
      "Elevate your everyday. Jewelry, fragrances, and premium accessories that make a statement without saying a word.",
  },
  {
    name: "Sports",
    emoji: "🏏",
    items: [
      "Callaway Golf Club Set",
      "Firefox Road Bike",
      "SS Ton English Willow Bat",
      "Element Complete Skateboard",
      "Adidas UCL Match Ball",
      "SG Leather Cricket Ball",
      "Spitfire Skateboard Wheels",
      "Nike Dri-Fit Wristbands",
    ],
    gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
    description:
      "Game on. Cricket bats, skateboards, cycles, and more — gear up for your next win, on and off the field.",
  },
  {
    name: "Experiences",
    emoji: "🎤",
    items: [
      "Concert VIP Pass — Front Row",
      "Cult.fit 3-Month Membership",
      "PVR Gold Class Tickets",
      "Luxury Spa Day Package",
      "Zomato Dining Voucher",
    ],
    gradient: "bg-gradient-to-br from-red-500 to-pink-600",
    description:
      "Memories > things. VIP concert access, gold class movie nights, spa days — experiences you'll never forget.",
  },
];
