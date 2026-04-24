"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { mysteryBoxes } from "@/data/boxes";
import { formatPrice } from "@/lib/utils";
import GlassCard from "@/components/ui/GlassCard";
import GlowButton from "@/components/ui/GlowButton";

export default function FeaturedBoxes() {
  // Featured: Silver, Gold, Elite
  const featured = mysteryBoxes.filter((b) =>
    ["silver", "gold", "elite"].includes(b.id)
  );

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Featured{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Drops
            </span>
          </h2>
          <p className="text-white/50 max-w-md mx-auto">
            Our most popular boxes. Every one is a chance to win big.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((box, index) => (
            <motion.div
              key={box.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <GlassCard className="relative overflow-hidden h-full flex flex-col">
                {/* Gradient accent on top */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${box.gradient}`}
                />

                {/* Emoji */}
                <div className="text-5xl mb-4 mt-2">{box.emoji}</div>

                {/* Name */}
                <h3 className="text-xl font-bold text-white mb-1">
                  {box.name}
                </h3>

                {/* Tagline */}
                <p className="text-white/40 text-sm mb-4">{box.tagline}</p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl font-bold text-white">
                    {formatPrice(box.price)}
                  </span>
                  {box.originalPrice && (
                    <span className="text-sm text-white/30 line-through">
                      {formatPrice(box.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex items-center gap-4 text-sm text-white/50 mb-6">
                  <span>{box.itemCount[0]}–{box.itemCount[1]} items</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span
                    className={
                      box.stock < 10
                        ? "text-orange-400 font-medium"
                        : ""
                    }
                  >
                    {box.stock} left
                  </span>
                </div>

                {/* CTA */}
                <div className="mt-auto">
                  <Link href="/boxes">
                    <GlowButton variant="secondary" size="sm" className="w-full">
                      Explore
                    </GlowButton>
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
