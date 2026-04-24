"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Lock, Flame } from "lucide-react";
import { mysteryBoxes } from "@/data/boxes";
import { formatPrice } from "@/lib/utils";

export default function FeaturedBoxes() {
  // Featured: Gold, Diamond, Elite
  const featured = mysteryBoxes.filter((b) =>
    ["gold", "diamond", "elite"].includes(b.id)
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
              Trunks
            </span>
          </h2>
          <p className="text-white/40 max-w-md mx-auto">
            These three move the fastest. Don&apos;t blink.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((box, index) => {
            const isLowStock = box.stock > 0 && box.stock < 10;

            return (
              <motion.div
                key={box.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ scale: 1.03, y: -4 }}
              >
                <div className="relative rounded-2xl overflow-hidden h-full flex flex-col bg-[#0c0c14] border border-white/[0.06]">
                  {/* Trunk visual header */}
                  <div
                    className={`relative h-44 ${box.gradient} flex items-center justify-center overflow-hidden`}
                  >
                    {/* Box image */}
                    {box.image && (
                      <Image
                        src={box.image}
                        alt={box.name}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                    {/* Dark overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14] via-black/30 to-transparent" />

                    {/* Lock */}
                    <div className="absolute bottom-2.5 right-2.5 z-10">
                      <div className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                        <Lock className="w-3 h-3 text-white/40" />
                      </div>
                    </div>

                    {isLowStock && (
                      <div className="absolute top-2.5 left-2.5 z-10">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/90 text-white text-[9px] font-bold uppercase">
                          <Flame className="w-2.5 h-2.5" />
                          {box.stock} Left
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-white mb-0.5 tracking-tight">
                      {box.name}
                    </h3>
                    <p className="text-white/30 text-[10px] uppercase tracking-wider font-medium mb-3">
                      {box.tagline}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-5">
                      <span className="text-xl font-black text-white">
                        {formatPrice(box.price)}
                      </span>
                      {box.originalPrice && (
                        <span className="text-xs text-white/25 line-through">
                          {formatPrice(box.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="mt-auto">
                      <Link
                        href="/boxes"
                        className="group/btn relative w-full py-2.5 px-4 rounded-xl text-sm font-bold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 text-white overflow-hidden"
                        style={{
                          background:
                            "linear-gradient(135deg, #EC4899, #8B5CF6, #3B82F6)",
                          boxShadow:
                            "0 0 20px rgba(139, 92, 246, 0.35), 0 0 40px rgba(236, 72, 153, 0.15)",
                        }}
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
                        <span className="relative z-10">View Trunk</span>
                        <ArrowRight className="w-3.5 h-3.5 relative z-10" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
