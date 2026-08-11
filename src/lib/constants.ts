export const SITE_NAME = "MYSTERYX";

export const SUPPORT_EMAIL = "support@cornorstoneconsulting.com";
export const SUPPORT_LINK = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
  "MYSTERYX Support"
)}`;
// FormSubmit relay — delivers enquiries to SUPPORT_EMAIL with no backend.
// The first-ever submission emails an activation link to that inbox; it must
// be confirmed once before deliveries flow.
export const CONTACT_FORM_ENDPOINT = `https://formsubmit.co/ajax/${SUPPORT_EMAIL}`;

// Weighted spin wheel. `weight` is the selection weight (out of the total),
// NOT the visual slice size — the wheel draws equal slices, the pick is weighted.
// At a 21-gem spin cost the expected payout is:
//   EV = (250·10 + 120·25 + 100·50 + 20·100 + 6·200 + 2·500 + 1·999) / 1000
//      ≈ 15.7 gems  (~75% of cost, ~50% of spins pay out)
// Every segment pays exactly what its label says — no phantom prizes.
export const SPIN_SEGMENTS = [
  { label: "10 Gems", value: 10, weight: 250, color: "#3B82F6" },
  { label: "25 Gems", value: 25, weight: 120, color: "#8B5CF6" },
  { label: "50 Gems", value: 50, weight: 100, color: "#EC4899" },
  { label: "100 Gems", value: 100, weight: 20, color: "#06B6D4" },
  { label: "999 Gem Jackpot", value: 999, weight: 1, color: "#10B981" },
  { label: "200 Gems", value: 200, weight: 6, color: "#F59E0B" },
  { label: "500 Gems", value: 500, weight: 2, color: "#EF4444" },
  { label: "Better Luck!", value: 0, weight: 501, color: "#6B7280" },
] as const;

export const NAV_LINKS = [
  { label: "Trunks", href: "/boxes" },
  { label: "Virtual", href: "/virtual" },
  { label: "Spin", href: "/spin" },
  { label: "Store", href: "/store" },
  { label: "Blog", href: "/blog" },
  { label: "Dashboard", href: "/dashboard" },
] as const;
