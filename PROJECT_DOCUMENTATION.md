# MYSTERYX — Complete Project Documentation

## Overview
**MYSTERYX** is India's #1 gamified mystery box e-commerce platform built with Next.js 16, React 19, Tailwind CSS 4, Zustand 5, and Framer Motion. Users purchase sealed "trunks" containing randomized physical products (fashion, tech, collectibles, etc.) worth more than the purchase price.

**Live URL:** https://mystery-box-nu.vercel.app
**GitHub:** https://github.com/Desmonddddddd/mystery-box

---

## Tech Stack
| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.2.4 | Framework (App Router + Turbopack) |
| React | 19.2.4 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling (inline theme, no config file) |
| Zustand | 5.0.3 | State management (5 stores, localStorage persist) |
| Framer Motion | 12.6.3 | Animations |
| Lucide React | 0.469.0 | Icon library |
| Canvas Confetti | 1.9.3 | Confetti effects |

---

## Design System

### Colors
| Token | Hex | Usage |
|---|---|---|
| `dark-950` | `#0a0a0f` | Body background |
| `dark-900` | `#0f0f18` | Scrollbar track |
| `dark-800` | `#16162a` | Card backgrounds |
| `dark-700` | `#1e1e3a` | Hover states |
| `dark-600` | `#2a2a4a` | Borders |
| `neon-pink` | `#EC4899` | Primary accent |
| `neon-blue` | `#3B82F6` | Secondary accent |
| `neon-purple` | `#8B5CF6` | Tertiary accent |
| `neon-cyan` | `#06B6D4` | Info accent |
| `neon-green` | `#10B981` | Success states |
| `neon-yellow` | `#F59E0B` | Warning/gems |
| `neon-red` | `#EF4444` | Danger states |

### Fonts
- **Sans (body):** Inter
- **Display (headings):** Orbitron

### CSS Utilities
- `.glass` / `.glass-strong` — Glassmorphism with backdrop-blur
- `.neon-text` / `.neon-text-pink` / `.neon-text-blue` / `.neon-text-purple` — Gradient text
- `.glow-pink` / `.glow-blue` / `.glow-purple` / `.glow-cyan` / `.glow-green` — Box-shadow glows
- `.gradient-border` — Animated gradient border
- `.bg-dot-grid` — Dotted grid background pattern
- `.noise-overlay` — Subtle noise texture overlay
- `.rarity-common` / `.rarity-rare` / `.rarity-epic` / `.rarity-legendary` — Rarity color schemes

### Animations (13 keyframes)
`float`, `pulse-glow`, `shake`, `marquee`, `spin-wheel`, `flip-card`, `gradient-shift`, `fade-in-up`, `shimmer`, `bounce-in`, `wheel-glow`, `led-chase`, `wheel-spin-glow`

---

## Page Routes (13 routes)

| Route | Type | Description |
|---|---|---|
| `/` | Server | Home: Hero, LiveTicker, FeaturedBoxes, WhatYouCanGet, VirtualTrySection, HowItWorks, CommunityWall, Leaderboard, WinnerHighlight |
| `/boxes` | Server | Mystery trunk catalog with BoxGrid, trust section |
| `/cart` | Client | Shopping cart with quantity controls, engraving input for Ultra |
| `/checkout` | Client | Checkout: contact + shipping form, coupon codes (MYSTERY10, FIRST50, TRUNK20, WELCOME100, MEGA30), PaymentModal |
| `/dashboard` | Client | User profile: stats, LuckMeter, DailyRewards, Items Gallery, Order History, Referral |
| `/spin` | Client | SVG spin wheel with LED ring, lion mascot, costs 21 gems/spin |
| `/store` | Client | Gem store: 5 packages (₹200–₹4,200), "Redeem Gems" coming soon |
| `/blog` | Client | Blog listing with category filter (All/Unboxing/Tips/Community/News) |
| `/blog/[slug]` | Client | Individual blog post with markdown, WhatsApp share |
| `/open/[id]` | Client | Physical box opening animation with loss protection |
| `/virtual` | Client | Virtual box opening: 10 tiers, spend gems, instant digital reveal |
| `/online` | Server | Redirect → `/virtual` |
| `/terms` | Server | 18-section Terms & Conditions |

---

## Components (37 total)

### Layout (2)
- **Navbar** — Sticky glassmorphism top bar: logo, nav links, gem count, cart badge, login/profile, mobile hamburger
- **Footer** — Multi-column footer with Shop/Account/Learn links, WhatsApp, copyright

### Home (9)
- **Hero** — Full-screen hero with animated gradient orbs, blended image backdrop, "₹1 to ₹10,00,000" headline, GlowButton CTA
- **LiveTicker** — Infinite scrolling marquee of recent winners
- **FeaturedBoxes** — Card grid of 6 box tiers with images, prices, stock badges
- **WhatYouCanGet** — Grid of 9 category cards showing possible items
- **VirtualTrySection** — CTA promoting free virtual unboxing
- **HowItWorks** — 4-step guide: Pick → Pay → Deliver → Open
- **CommunityWall** — Social feed of community comments with likes
- **Leaderboard** — Ranked list of top winners by value
- **WinnerHighlight** — Rotating spotlight of featured winners

### Boxes (3)
- **BoxCard** — Individual trunk card: image, name, price, stock bar, "Add to Cart"
- **BoxGrid** — Grid wrapper with staggered animation
- **RewardPreview** — Modal showing possible rewards by rarity

### Cart (2)
- **CartItem** — Line item: emoji, name, qty controls, price, remove
- **CartSummary** — Sidebar: subtotal, free shipping, total, checkout CTA

### Dashboard (3)
- **StatsGrid** — 4 stat cards: boxes opened, items won, gems, streak
- **ItemsGallery** — Grid of won items with rarity badges and values
- **OrderHistory** — Past orders with status badges

### Gamification (6)
- **SpinWheel** — Reusable animated spin wheel component
- **DailyRewards** — 7-day reward calendar with milestones
- **LuckMeter** — Visual progress bar (0-100%) for loss protection
- **ReferralCard** — Referral code display with copy/share
- **SecretBox** — Easter egg that awards 50-200 gems, 24h cooldown
- **WelcomeBonus** — First-visit popup offering free gems

### Opening (4)
- **BoxAnimation** — Multi-phase opening sequence controller
- **ItemReveal** — Item card with flip animation, rarity badge, value
- **RevealSummary** — Post-opening summary: total value, best item, share
- **Confetti** — Canvas-confetti wrapper

### Online/Virtual (2)
- **OnlineBoxOpening** — Digital reward reveal with confetti
- **VirtualBoxOpening** — Free virtual unboxing experience

### UI (8)
- **AIChatbot** — Floating FAQ chatbot with NLP matching engine
- **Badge** — Rarity badge with tier-specific colors
- **GlassCard** — Glassmorphism card wrapper with hover glow
- **GlowButton** — Neon gradient button (primary/secondary/danger, 3 sizes)
- **LoginModal** — Name + phone login overlay
- **MusicPlayer** — Floating "Track of the Day" toggle
- **PaymentModal** — Simulated Razorpay payment (Card/UPI/NetBanking)
- **WhatsAppButton** — Floating WhatsApp support icon

---

## Zustand Stores (5)

### `cartStore.ts` — Persisted as `mysteryx-cart`
- State: `items: CartItem[]`
- Actions: addItem, removeItem, updateQuantity, updateEngraving, clearCart
- Computed: getTotal(), getItemCount()

### `userStore.ts` — Persisted as `mysteryx-user` (v3 with migrations)
- State: profile (name, phone, isLoggedIn, gems, boxesOpened, itemsWon[]), orders[]
- Default gems: 50,000 (testing)
- Actions: login, logout, addWonItems, addGems, spendGems, incrementBoxesOpened, addOrder

### `gamificationStore.ts` — Persisted as `mysteryx-gamification`
- State: lastSpinDate, dailyStreak, referralCode, referralCount, spinResult, luckMeter, loginStreak, claimedDailyDays[], secretBoxCooldown
- Actions: canSpinToday, recordSpin, claimWelcomeBonus, recordDailyLogin, claimDailyReward, findSecretBox

### `openingStore.ts` — Not persisted (ephemeral)
- State: phase (idle→anticipation→shake→burst→reveal→summary), currentItemIndex, items[], boxTier
- Actions: startOpening, nextPhase, revealNextItem, reset

### `onlineGameStore.ts` — Persisted as `mysteryx-online`
- State: totalPlays, biggestWin, recentWins[], isPlaying, currentResult
- Actions: recordPlay, startPlaying, stopPlaying, setResult

---

## Data Files (10)

### Physical Boxes (`boxes.ts`) — 6 Tiers
| Tier | Name | Price | Original | Items |
|---|---|---|---|---|
| silver | Silver Trunk | ₹999 | ₹1,499 | 3-5 |
| gold | Gold Trunk | ₹2,499 | ₹3,999 | 4-6 |
| diamond | Diamond Trunk | ₹4,999 | ₹7,999 | 5-7 |
| elite | Elite Trunk | ₹7,999 | ₹12,999 | 6-8 |
| mega | Mega Trunk | ₹9,999 | ₹16,999 | 7-9 |
| ultra | Ultra Vault | ₹24,999 | ₹39,999 | 8-10 |

### Physical Rewards (`rewards.ts`) — 49 Items
Categories: Fashion (11), Tech (11), Collectibles (9), Lifestyle (10), Sports (10), Experiences (5)
Value range: ₹99 (stickers) to ₹99,999 (MacBook Air M2)

### Virtual Boxes (`onlineBoxes.ts`) — 10 Tiers
Starter (99 gems) → Mythic (7,999 gems)

### Digital Rewards (`digitalRewards.ts`) — 26 Items
Types: gems, discounts, freeBox, merch, cashback. 8 Common, 8 Rare, 7 Epic, 6 Legendary.

### Other Data
- `categories.ts` — 9 item categories
- `comments.ts` — 20 community comments (social proof)
- `winners.ts` — 15 recent winner entries
- `blogPosts.ts` — 6 full blog posts with markdown
- `dailyRewards.ts` — 7-day reward schedule (25-500 gems)
- `faqData.ts` — 24 FAQ entries for chatbot

---

## Loot Engine

### Physical (`lootEngine.ts`)
- Rarity weights per tier: Silver (70/25/4.5/0.5%) → Ultra (15/30/30/25%)
- Loss protection: +15% rarity boost at 3+ consecutive low wins, +10% at 80+ luck, guaranteed rare+ at 100 luck
- Items sorted common→legendary for dramatic reveal

### Virtual (`onlineLootEngine.ts`)
- 10-tier weights: Starter (80/15/4/1%) → Mythic (5/15/35/45%)
- Returns single DigitalReward per open

### Chatbot NLP (`chatMatcher.ts`)
- Multi-signal scoring: patterns (25+ pts) > keywords with synonyms (8 pts) > stems (5 pts) > question words (3 pts)
- 16 synonym groups, 100+ stop words, stem matching
- Intent detection: greetings, thanks, byes
- Threshold: ≥12 for FAQ match, ≥8 for single-word queries

---

## Coupon System (Checkout)
| Code | Discount | Type | Min Order |
|---|---|---|---|
| MYSTERY10 | 10% | Percent | ₹0 |
| FIRST50 | ₹50 | Flat | ₹200 |
| TRUNK20 | 20% | Percent | ₹500 |
| WELCOME100 | ₹100 | Flat | ₹300 |
| MEGA30 | 30% | Percent | ₹1,000 |

---

## Architecture
- **100% client-side** — No API routes, no database, no auth backend
- **All state persisted to localStorage** via Zustand middleware
- **Payment is simulated** — PaymentModal fakes processing animation
- **Loot is client-side** — Rarity rolls happen in-browser
- **Indian market focus** — INR pricing, Indian phone validation, Indian addresses
- **Deployed on Vercel** with auto-deploy from GitHub

---

## Vercel Deployment
- **Project ID:** prj_oBl6ZGQKSvK6lp5LAuC5uxLZWIkt
- **Org ID:** team_vmF3wj4UpoqfUMCxXBqmKjsd
- **Project Name:** mystery-box
- **Production URL:** https://mystery-box-nu.vercel.app
