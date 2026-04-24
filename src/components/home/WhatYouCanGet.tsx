"use client";

import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import GlassCard from "@/components/ui/GlassCard";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function WhatYouCanGet() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            What&apos;s{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Inside?
            </span>
          </h2>
          <p className="text-white/50 max-w-md mx-auto">
            Six categories. Infinite possibilities. Zero spoilers.
          </p>
        </motion.div>

        {/* 2x3 Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <motion.div key={cat.name} variants={item}>
              <GlassCard className="h-full relative overflow-hidden group">
                {/* Gradient accent */}
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${cat.gradient} opacity-60 group-hover:opacity-100 transition-opacity`}
                />

                {/* Emoji & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{cat.emoji}</span>
                  <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                </div>

                {/* Item list */}
                <ul className="space-y-1.5">
                  {cat.items.slice(0, 4).map((itemName) => (
                    <li
                      key={itemName}
                      className="text-sm text-white/50 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                      {itemName}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
