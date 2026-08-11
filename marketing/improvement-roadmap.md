# MYSTERYX — Review Panel Scorecard & Improvement Roadmap
**Compiled by FRIDAY (PM) — 2026-08-11, overnight autopilot run**

## Scorecard (5 end-user review agents, live site)

| Lens | Score | Verdict one-liner |
|---|---|---|
| Trust & credibility | **2/10** | "Would not risk ₹99" — placeholder support number, no legal identity, guarantee contradicted by terms |
| Content & clarity | **4/10** | Site describes two different catalogs; trust-anchor blog post proves the site wrong |
| Gamification & fun | **4.5/10** | "Great skin, broken game" — 50k test gems shipped, spin economy broken, flat reveals |
| Purchase experience | **6.5/10** | Slick checkout; hidden coupon, no COD, post-payment dump |
| Mobile experience | **6.5/10** | Fast + responsive; welcome popup eats checkout taps, small tap targets |
| **Overall** | **4.7/10** | Polished shell, credibility and economy need surgery |

## Activity list

### ✅ DONE tonight (pack 1 — pushed, commit 0e24d2b)
1. Support = **email only** (support@cornorstoneconsulting.com) — placeholder WhatsApp removed from footer, chatbot, terms; share buttons now number-less
2. Guest spin now credits winnings (was: charged 21 gems, prize withheld)
3. Payment success routes to /dashboard (was: empty-cart dead end)
4. Orders record the coupon-discounted amount actually paid
5. Dashboard gem balance no longer shows ₹ symbol
6. Chat panel no longer covers the music player
7. Hero: watermarked monkey image removed; carousel = cat → panda → neon lion
8. Terms aligned to real catalog (Gems not Credits, real tier names)
9. Earlier same night: hero "$1 to $1 Million" + hi-res lion, mobile nav compaction, responsive leaderboard/daily-rewards grids, Wall hydration fix, 13.4MB junk deletion + 9 dead components, MystiQ chatbot hardening (29/29 E2E on prod)

### 🔄 IN PROGRESS (3 parallel agents, each build-gated then pushed)
**W1 — Game economy & integrity** (fun 4.5 → target 7+)
10. Kill the 50,000 test-gem leak → new users start at 250 gems; migration clamps testers to 2,500
11. Spin wheel EV rebalance (was 11x money printer) + honest "999 Gem Jackpot" label (was fake "Free Silver Trunk")
12. Virtual tier cards: honest one-reward copy (was "1–4 items" lie)
13. Per-tier reward pools rescaled so top prizes beat the stake; odds table on /virtual from real engine weights
14. "Cashback" rewards renamed (contradicted "gems have no cash value")

**W2 — Trust & purchase UX** (trust 2 / purchase 6.5 → target 6+/8+)
15. Welcome popup: dismiss-once-forever, no route resurrection, scroll lock, ≥44px close (was eating checkout taps)
16. Fake scarcity ("9 Left") and fake strike-through prices removed → honest badges
17. Simulated winner feed / leaderboard / wall labeled "Simulated preview"; wall actions persist
18. Per-trunk item counts + rarity odds on /boxes (canonical table, matches blog + terms)
19. MYSTERY10 surfaced: banner on /boxes + one-tap apply chip at checkout
20. Add-to-cart feedback ("Added ✓"), ≥44px tap targets, checkout autocomplete + numeric pincode keypad
21. COD payment option; success screen shows order number + delivery ETA + "View My Order"

**W3 — Content alignment** (clarity 4 → target 8)
22. "How Our Loot System Works" rewritten to the real 6-tier catalog with odds + item counts (was the old 5-tier catalog — worst credibility hole)
23. Online-game post fixed to the real ten gem boxes
24. One refund policy everywhere (final sale; damaged within 48h via email → replacement)
25. "Credits"/"cashback"/"convert items" contradictions swept from all posts

### 🔑 NEEDS MASTER (cannot and should not be fabricated)
26. **Legal identity in footer/terms**: registered entity name (LLP/Pvt Ltd), address, GSTIN/CIN — the #1 trust blocker per review
27. **Custom domain** (mysteryx.in / .com) — free vercel.app subdomain reads as scam
28. Real payment gateway (Razorpay/Cashfree KYC needs the legal entity)
29. Decision: real inventory + fulfillment plan before taking real money

### 📋 NEXT PHASE (queued, from teardown + reviews)
30. Daily Free Box with countdown in navbar (gamification reviewer's #1 retention mechanic; infra ~80% exists)
31. Real backend (orders/users server-side — everything is localStorage today)
32. Sell-back-to-gems on the reveal screen (HypeDrop margin engine)
33. Live-drops rail with product images; box battles (gem-staked only — India legal line)
34. Provably-fair verifier + per-item drop tables
35. Better reveal animation (spinner reel, rarity tease, near-miss) — "most important 3 seconds of a case site"
36. Instagram launch per marketing/instagram-60day-plan.md once trust items ship

India legal bright lines (from competitor teardown — never cross): no cash-out of gems, no rupee-staked battles, no casino games (crash/plinko), no negative-EV boxes.
