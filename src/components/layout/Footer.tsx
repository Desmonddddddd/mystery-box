import Link from "next/link";
import { SITE_NAME, WHATSAPP_LINK } from "@/lib/constants";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "Mystery Trunks", href: "/boxes" },
      { label: "Virtual Mystery Box", href: "/virtual" },
      { label: "Spin to Win", href: "/spin" },
      { label: "Gem Store", href: "/store" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "My Cart", href: "/cart" },
      { label: "Orders", href: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#060609] border-t border-white/[0.06] mt-auto overflow-hidden">
      {/* Subtle gradient glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Top section — 4 equal columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              {SITE_NAME}
            </span>
            <p className="mt-3 text-white/30 text-sm leading-relaxed max-w-[240px]">
              India&apos;s most exciting mystery trunk platform. Every trunk pays
              more than it costs.
            </p>
            {/* WhatsApp link */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-pink-400 hover:text-pink-300 transition-colors"
            >
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
                }}
              >
                W
              </span>
              Chat with us
            </a>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-white/70 font-semibold text-xs uppercase tracking-widest mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-white/35 hover:text-pink-400 text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-12 mb-6 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-white/25 text-xs">
            Built with{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-medium">
              passion
            </span>
          </p>
        </div>

        {/* Legal fine print — hidden at bottom */}
        <div className="mt-8 pt-6 border-t border-white/[0.03]">
          <p className="text-white/[0.12] text-[9px] leading-relaxed max-w-5xl mx-auto text-center">
            DISCLAIMER: All product images, descriptions, and representations on {SITE_NAME} are for illustrative purposes only and do not constitute a guarantee or warranty of any kind. Actual products received may differ from those shown in images in brand, model, colour, size, specification, and appearance. {SITE_NAME} reserves the right to substitute any item with an alternative of equal or greater value without notice. All mystery trunk purchases are final — no returns, refunds, or exchanges are permitted under any circumstances, except for physically damaged items reported within 48 hours of delivery. {SITE_NAME} does not guarantee that any specific item, brand, or value will be included in any trunk. Rarity percentages and value ranges are approximate and for informational purposes only. Past results are not indicative of future outcomes. Gems are virtual currency with no cash value and cannot be transferred, sold, or exchanged for real money. {SITE_NAME} and its affiliates disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. Use of this platform is at your sole risk. By using this platform, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-white/20 transition-colors">
              Terms &amp; Conditions
            </Link>
            . Subject to the exclusive jurisdiction of courts in New Delhi, India.
          </p>
        </div>
      </div>
    </footer>
  );
}
