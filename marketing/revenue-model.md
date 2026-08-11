# MYSTERYX — Revenue Model

Standalone doc. Site: https://mystery-box-nu.vercel.app · Support: support@cornorstoneconsulting.com (email only)
Sources: live codebase (`src/data/boxes.ts`, `src/lib/constants.ts`, `src/app/store/page.tsx`, `src/app/checkout/page.tsx`), `marketing/instagram-60day-plan.md`, `marketing/competitor-teardown.md`, `marketing/improvement-roadmap.md`.

**Legend:** ✅ = pulled from code · ⚠️ = assumption (no sourcing/fulfillment data exists yet — roadmap item #29 is still open)

---

## 1. Revenue Paths

| # | Path | Mechanic | Status |
|---|------|----------|--------|
| 1 | **Physical trunk orders** | IG reels → bio link → checkout. Free virtual simulator is the bridge. | Core. 6 tiers ₹999–₹24,999 ✅ |
| 2 | **DM-to-order** | Every "price?" comment → Instagram DM within 60 min with link + `FIRST50`. | Manual close, high intent. Sales via IG DM; support via email only. |
| 3 | **Drops & scarcity events** | 2 limited drops / 60 days, capped units, drop-only coupon, countdown stories. | ~40 of the ~100 target orders |
| 4 | **Gem economy (digital)** | Gem packs ₹200–₹4,200 ✅ → spin wheel + 10 virtual box tiers. Closed loop, no cash-out. | Live. Margin near 100% (digital goods) |
| 5 | UGC / affiliate loop | Creator coupon codes (10% off = commission proxy), ₹100–150/order thank-you. | Month 2+, funnel amplifier not a direct line |

## 2. Unit Economics — Physical Trunks

Prices, item counts, odds ✅ from `boxes.ts`. Code guarantee ✅: *"Combined retail value always meets or exceeds the trunk price"* — i.e. MRP of contents ≥ price. That is affordable because wholesale cost runs well below MRP.

⚠️ **All cost columns are assumptions**: loot wholesale ≈ 52% of list price (accessories/gadget MRP typically 1.8–2.2× wholesale), packaging ₹150–300, payment gateway 2%. No real sourcing data exists yet.

| Tier | Price ✅ | Items ✅ | Legendary odds ✅ | Loot cost ⚠️ | Pack+ship ⚠️ | Gateway ⚠️ | Contribution | Margin |
|------|---------|---------|-------------------|--------------|--------------|------------|--------------|--------|
| Silver | ₹999 | 3–5 | 2% | ₹520 | ₹150 | ₹20 | **₹309** | 31% |
| Gold | ₹2,499 | 4–6 | 5% | ₹1,300 | ₹150 | ₹50 | **₹999** | 40% |
| Diamond | ₹4,999 | 5–7 | 8% | ₹2,600 | ₹180 | ₹100 | **₹2,119** | 42% |
| Elite | ₹7,999 | 6–8 | 12% | ₹4,160 | ₹200 | ₹160 | **₹3,479** | 43% |
| Mega | ₹9,999 | 7–9 | 15% | ₹5,200 | ₹220 | ₹200 | **₹4,379** | 44% |
| Ultra Vault | ₹24,999 | 8–12 | 20% | ₹13,000 | ₹300 | ₹500 | **₹11,199** | 45% |

- **Hero items** (top pull: MacBook Air M2, loot range ₹99–₹99,999): fund as a fixed marketing pool, not per-box COGS. ⚠️ Budget ~₹8–10k/month reserve until volume justifies a real ₹99,999 pull; never promise odds on a specific hero item.
- **Coupons compress this.** Live codes ✅ (`checkout/page.tsx`): `MYSTERY10` 10% (no min) · `FIRST50` ₹50 flat (min ₹200) · `TRUNK20` 20% (min ₹500) · `WELCOME100` ₹100 flat (min ₹300) · `MEGA30` 30% (min ₹1,000). Worst case `MEGA30` on Silver: ₹999 → ₹699, contribution drops to ~₹9. ⚠️ Assume blended 12–15% discount rate → blended contribution ~28–38% of gross.

## 3. 60-Day Projection

Funnel from `instagram-60day-plan.md` (base case): 60 posts → ~350k views → ~21k profile visits → ~2,500 link clicks → ~62 organic orders + ~40 drop orders ≈ **100 orders @ ₹1,700 AOV**.

| Line | Base | Stretch | Basis |
|------|------|---------|-------|
| Orders | ~100 | ~175 | Plan ✅ / 1 viral reel + drops oversell ⚠️ |
| Gross revenue | **₹1.7L** | **₹3L+** | Plan ✅ |
| − Coupon discounts (~13%) ⚠️ | −₹22k | −₹39k | Blended code usage |
| Net revenue | ₹1.48L | ₹2.6L | |
| − COGS + ship + gateway (~62% of net) ⚠️ | −₹92k | −₹1.6L | Section 2 assumptions |
| **Contribution profit** | **~₹56k** | **~₹1L** | Before content/ad spend |
| − Paid boosts + shoutouts ⚠️ | −₹5–10k | −₹10–15k | Plan Section 7/8 caps |
| Gem-pack upside ⚠️ | +₹10–25k | +₹25–50k | See Section 4 |

Checkpoints (plan ✅): Day 14 ≥ 5 orders · Day 30 ≥ 30 · Day 45 ≥ 60. Two consecutive misses → structural change per plan Section 8.

## 4. Gem Economy as a Revenue Lever

All numbers ✅ from code unless flagged.

| Element | Numbers | Revenue role |
|---------|---------|--------------|
| Gem packs (`store/page.tsx`) | 100/₹200 · 500/₹600 · 1,000/₹1,000 · 2,000/₹1,800 · 5,000/₹4,200 (₹2.00 → ₹0.84 per gem) | Direct digital revenue, ~100% margin (no COGS until gems are redeemed for physical rewards) |
| Spin wheel (`constants.ts`) | 21-gem spin, EV ≈ 15.7 gems ≈ **75% of cost** — ~25% house edge, ~50% of spins pay | Gem sink → drives pack repurchase |
| Virtual boxes (`onlineBoxes.ts`, `onlineLootEngine.ts`) | 10 tiers, 99 → 7,999 gems; legendary odds 1% → 45%; pools scaled so legendary beats stake, **median outcome below stake** | Main gem sink; rebalanced post-review (was a money printer) |
| Welcome bonus | 200 gems marketed ⚠️ (roadmap moves new users to 250; 50k test-gem leak being killed) | Free-taste funnel; ~₹2 nominal cost, zero cash cost |
| Closed loop | Money → gems → products/discounts, **never backwards** | Legal shield (retail, not gambling) + revenue never refunds itself |
| Next lever (P0, teardown #1) | Sell-back-to-gems at ~85% on the reveal screen | HypeDrop's margin engine: skips shipping cost AND recycles payout into more opens |

⚠️ Realistic 60-day gem revenue is modest (₹10–25k base): gems monetize *retention*, not acquisition. The lever matters at month 3+ when battles/upgrader (gem-denominated only) ship.

## 5. Drop Events

| Drop | Day | Inventory | Code ✅ | Goal | Est. net revenue ⚠️ |
|------|-----|-----------|---------|------|---------------------|
| #1 "Neon Drop" | 21 | 50× Gold Trunk | `TRUNK20` (−20%) | 20+ orders | 20 × ₹1,999 ≈ ₹40k |
| #2 "Vault Drop" | 52 | 20× Diamond/Elite/Mega | `MEGA30` (−30%) | ~15 orders | 15 × ~₹4,500 ≈ ₹67k |

Drops carry ~40% of the base-case order target. Mechanics: 3-day teaser runway, hourly "X left" stories, sellout recap reel. Never fake sellouts — unsold = "drop closed", not "sold out". Note margin: `MEGA30` cuts Section-2 contribution by roughly the full discount amount, so drop tiers must be Gold+ (never Silver) to stay profitable.

## 6. Top 3 Revenue Risks

| # | Risk | Why it kills revenue | Mitigation |
|---|------|----------------------|------------|
| 1 | **Trust gap blocks checkout** — review score 2/10 on trust: no legal entity in footer, vercel.app domain, no real payment gateway (roadmap #26–28, needs MASTER) | Funnel math dies at the last step: 2,500 clicks × skepticism = zero orders regardless of content quality. "Would not risk ₹99" was a direct reviewer quote. | Ship legal identity + GSTIN in footer, custom domain (mysteryx.in), Razorpay/Cashfree, COD option (done), per-trunk odds tables (done), "Simulated preview" labels (done). Gate the IG launch on these — plan already says so (roadmap #36). |
| 2 | **Margin compression** — value guarantee + stacked discounts + hero-item liability on unproven COGS assumptions | A `MEGA30`'d Silver order nets ~₹9. Every Section-2 cost number is assumed; if wholesale runs 65% of list instead of 52%, base-case contribution profit ≈ ₹0. | Lock real sourcing costs before scaling (roadmap #29); enforce coupon min-orders (done in code); one-coupon-per-order; exclude Silver from % drops; treat hero items as capped marketing budget; add sell-back-to-gems to reclaim shipping costs. |
| 3 | **Legal reclassification as gambling** — mystery boxes sit near state gaming laws (stake + chance + prize) | One wrong mechanic (cash-out, rupee-staked battles, casino games) re-reads the whole platform as gambling: payment gateways drop it, IG bans the page, revenue → 0. | Bright lines already documented: closed-loop gems, no cash-out ever, products-only prizes, guaranteed min value ≥ price (in code ✅), full odds disclosure (live ✅), banned-words list in the IG plan, 18+ gate, formal legal opinion before battles/upgrader ship with paid gems. |

---

*Contact for all commerce/support matters: support@cornorstoneconsulting.com (email only). Instagram DMs are a sales channel, not a support channel.*
