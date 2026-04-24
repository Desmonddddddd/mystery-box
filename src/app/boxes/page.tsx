import type { Metadata } from "next";
import BoxGrid from "@/components/boxes/BoxGrid";

export const metadata: Metadata = {
  title: "Mystery Boxes — MYSTERYX",
  description:
    "Choose your destiny. Browse all mystery box tiers from Basic to Ultra — every box is a new adventure packed with surprises.",
};

export default function BoxesPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      {/* ─── Hero Header ─────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-neon-pink/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold neon-text mb-4">
            Mystery Boxes
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Choose your destiny. Every box is a new adventure.
          </p>
        </div>
      </section>

      {/* ─── Box Grid ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <BoxGrid />
      </section>

      {/* ─── Tier Explanation ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="glass rounded-2xl p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-8 text-center">
            How Box Tiers Work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                tier: "Basic",
                emoji: "📦",
                color: "text-blue-400",
                border: "border-blue-500/30",
                desc: "Everyday surprises. Great odds on common & rare items. The perfect starting point.",
              },
              {
                tier: "Silver",
                emoji: "🥈",
                color: "text-cyan-300",
                border: "border-cyan-400/30",
                desc: "Better drops, more items. Increased chance for rare and epic rewards.",
              },
              {
                tier: "Gold",
                emoji: "🥇",
                color: "text-amber-400",
                border: "border-amber-400/30",
                desc: "The sweet spot. High-value items with solid legendary odds. Real wins start here.",
              },
              {
                tier: "Elite",
                emoji: "💎",
                color: "text-purple-400",
                border: "border-purple-500/30",
                desc: "For high rollers. Epic-tier loaded with smartwatches, designer gear & VIP experiences.",
              },
              {
                tier: "Ultra",
                emoji: "👑",
                color: "text-fuchsia-400",
                border: "border-fuchsia-400/30",
                desc: "The endgame. Engraved. 25% legendary odds. MacBooks, iPhones, gold chains.",
              },
            ].map((item) => (
              <div
                key={item.tier}
                className={`bg-dark-800/50 border ${item.border} rounded-xl p-6 text-center hover:bg-dark-700/50 transition-colors`}
              >
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className={`text-lg font-bold ${item.color} mb-2`}>
                  {item.tier}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
