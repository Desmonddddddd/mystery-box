export const SITE_NAME = "MYSTERYX";

export const SUPPORT_EMAIL = "support@cornorstoneconsulting.com";
export const SUPPORT_LINK = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
  "MYSTERYX Support"
)}`;

export const SPIN_SEGMENTS = [
  { label: "50 Gems", value: 50, color: "#3B82F6" },
  { label: "100 Gems", value: 100, color: "#8B5CF6" },
  { label: "200 Gems", value: 200, color: "#EC4899" },
  { label: "500 Gems", value: 500, color: "#06B6D4" },
  { label: "Free Silver Trunk", value: 999, color: "#10B981" },
  { label: "2x Boost", value: 0, color: "#F59E0B" },
  { label: "10% Off", value: 0, color: "#EF4444" },
  { label: "Better Luck!", value: 0, color: "#6B7280" },
] as const;

export const NAV_LINKS = [
  { label: "Trunks", href: "/boxes" },
  { label: "Virtual", href: "/virtual" },
  { label: "Spin", href: "/spin" },
  { label: "Store", href: "/store" },
  { label: "Blog", href: "/blog" },
  { label: "Dashboard", href: "/dashboard" },
] as const;
