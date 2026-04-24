import type { Metadata } from "next";
import BoxGrid from "@/components/boxes/BoxGrid";

export const metadata: Metadata = {
  title: "Mystery Trunks — MYSTERYX",
  description:
    "Choose your trunk. What's inside is sealed, packed, and waiting for you. The mystery is the point.",
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
            Mystery Trunks
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-2">
            Five tiers. One question. How bold are you?
          </p>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            No previews. No spoilers. Every trunk pays more than it costs.
            That&apos;s the only guarantee you need.
          </p>
        </div>
      </section>

      {/* ─── Box Grid ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <BoxGrid />
      </section>

      {/* ─── Trust Section ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-8 text-center">
            Our Word
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                emoji: "🔒",
                title: "Sealed Tight",
                desc: "No one — not even us — knows which trunk gets what. It's randomized, sealed, and untouched until you crack it.",
              },
              {
                emoji: "💰",
                title: "Always Pays More",
                desc: "The stuff inside is always worth more than what you paid. Always. We don't do L's.",
              },
              {
                emoji: "🚀",
                title: "At Your Door, Fast",
                desc: "2-3 days to ship. Tracked the whole way. The anticipation is half the fun.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <span className="text-4xl block mb-3">{item.emoji}</span>
                <h3 className="text-base font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
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
