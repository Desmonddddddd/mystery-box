"use client";

import { motion } from "framer-motion";
import { Package, Sparkles, Trophy } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const steps = [
  {
    number: "01",
    title: "Pick Your Trunk",
    description: "Five tiers. ₹999 to ₹24,999. The heavier the trunk, the wilder the ride.",
    Icon: Package,
    gradient: "from-blue-500 to-cyan-400",
    glow: "rgba(59, 130, 246, 0.2)",
  },
  {
    number: "02",
    title: "Crack It Open",
    description: "Watch it unlock live. Items drop one by one. Your heart rate will thank us later.",
    Icon: Sparkles,
    gradient: "from-purple-500 to-pink-500",
    glow: "rgba(139, 92, 246, 0.2)",
  },
  {
    number: "03",
    title: "Keep Everything",
    description: "It's all yours. Every single item. Delivered to your door. No catches.",
    Icon: Trophy,
    gradient: "from-amber-500 to-yellow-400",
    glow: "rgba(245, 158, 11, 0.2)",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            How It{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-white/50 max-w-md mx-auto">
            Dead simple. Stupidly exciting.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-amber-500/30" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <GlassCard
                className="text-center relative"
                glow={step.glow}
              >
                {/* Step number */}
                <span
                  className={`inline-block text-sm font-bold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent mb-4`}
                >
                  STEP {step.number}
                </span>

                {/* Icon */}
                <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <step.Icon className="w-7 h-7 text-white/80" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/50">{step.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
