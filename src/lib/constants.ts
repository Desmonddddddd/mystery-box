export const SITE_NAME = "MYSTERYX";
export const SITE_TAGLINE = "Crack it. Keep it. Flex it.";

export const WHATSAPP_NUMBER = "919876543210";
export const WHATSAPP_MESSAGE =
  "Hi, I have a question about MYSTERYX mystery boxes!";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const SPIN_SEGMENTS = [
  { label: "₹50 Credit", value: 50, color: "#3B82F6" },
  { label: "₹100 Credit", value: 100, color: "#8B5CF6" },
  { label: "₹200 Credit", value: 200, color: "#EC4899" },
  { label: "₹500 Credit", value: 500, color: "#06B6D4" },
  { label: "Free Basic Box", value: 999, color: "#10B981" },
  { label: "2x Boost", value: 0, color: "#F59E0B" },
  { label: "10% Off", value: 0, color: "#EF4444" },
  { label: "Better Luck!", value: 0, color: "#6B7280" },
] as const;

export const NAV_LINKS = [
  { label: "Boxes", href: "/boxes" },
  { label: "Online", href: "/online" },
  { label: "Virtual", href: "/virtual" },
  { label: "Spin", href: "/spin" },
  { label: "Blog", href: "/blog" },
  { label: "Dashboard", href: "/dashboard" },
] as const;

export const SECRET_BOX_COOLDOWN_HOURS = 24;
export const CREDITS_CONVERSION_RATE = 0.6; // 60% of item value when converting to credits
