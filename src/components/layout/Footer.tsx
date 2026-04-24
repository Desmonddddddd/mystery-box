import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE, WHATSAPP_LINK } from "@/lib/constants";

const quickLinks = [
  { label: "Boxes", href: "/boxes" },
  { label: "Online Game", href: "/online" },
  { label: "Virtual Try", href: "/virtual" },
  { label: "Blog", href: "/blog" },
  { label: "Spin to Win", href: "/spin" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Terms", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-black/90 border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              {SITE_NAME}
            </span>
            <p className="mt-2 text-white/50 text-sm">{SITE_TAGLINE}</p>
            <p className="mt-4 text-white/30 text-xs max-w-xs">
              India&apos;s most exciting mystery box platform. Every box is packed
              with surprises worth way more than you pay.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white/80 font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-pink-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white/80 font-semibold text-sm uppercase tracking-wider mb-4">
              Connect
            </h3>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm transition-colors"
            >
              <span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-xs">
                W
              </span>
              Chat on WhatsApp
            </a>
            <p className="mt-4 text-white/30 text-xs">
              Got questions? We reply within minutes.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Made with <span className="text-orange-500">🔥</span> by {SITE_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
}
