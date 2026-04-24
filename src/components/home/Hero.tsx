"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import GlowButton from "@/components/ui/GlowButton";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0f]">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(236,72,153,0.4), transparent 70%)",
            animation: "float1 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.4), transparent 70%)",
            animation: "float2 10s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.4), transparent 70%)",
            animation: "float3 12s ease-in-out infinite",
          }}
        />
      </div>

      {/* ── Full-bleed image on right half, blended into bg ── */}
      <motion.div
        className="absolute top-0 right-0 w-full h-full lg:w-[60%] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1.2 }}
        style={{
          maskImage:
            "linear-gradient(to right, transparent 5%, black 40%, black 50%, transparent 95%), linear-gradient(to bottom, transparent 5%, black 30%, black 65%, transparent 95%)",
          maskComposite: "intersect",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 5%, black 40%, black 50%, transparent 95%), linear-gradient(to bottom, transparent 5%, black 30%, black 65%, transparent 95%)",
          WebkitMaskComposite: "source-in",
        }}
      >
        <Image
          src="/images/image 12345.avif"
          alt="MYSTERYX Hero"
          fill
          className="object-contain object-center lg:object-right"
          priority
          quality={90}
        />
      </motion.div>

      {/* Ambient glow behind image area */}
      <div className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] rounded-full bg-gradient-to-br from-pink-500/10 via-purple-500/15 to-blue-500/10 blur-[150px] pointer-events-none" />

      {/* Floating particles over image area */}
      <motion.div
        className="absolute top-[20%] right-[15%] w-3 h-3 rounded-full bg-pink-500/60 blur-[1px] pointer-events-none"
        animate={{ y: [-10, 10, -10], x: [5, -5, 5], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] right-[35%] w-2 h-2 rounded-full bg-blue-400/60 blur-[1px] pointer-events-none"
        animate={{ y: [10, -15, 10], x: [-5, 5, -5], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-[30%] right-[18%] w-2.5 h-2.5 rounded-full bg-purple-400/60 blur-[1px] pointer-events-none"
        animate={{ y: [5, -10, 5], x: [3, -3, 3], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-[25%] right-[30%] w-2 h-2 rounded-full bg-cyan-400/50 blur-[1px] pointer-events-none"
        animate={{ y: [-8, 8, -8], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />

      {/* ── Content (left side) ───────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-xl lg:max-w-2xl text-center lg:text-left">
          {/* Pre-heading badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/60 text-sm font-medium">
              LIVE — 500+ trunks cracked open today
            </span>
          </motion.div>

          {/* Main heading — 3 tiers */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black leading-tight bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-3"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              ₹1 to
              <br />
              ₹10,00,000
            </motion.h1>

            <motion.p
              className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-clip-text text-transparent mb-4 whitespace-nowrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Your Luck, Your Loot
            </motion.p>

            <motion.p
              className="text-base sm:text-lg md:text-xl font-medium text-white/50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              You won&apos;t know until you open it.
            </motion.p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex items-center gap-4 justify-center lg:justify-start"
          >
            <GlowButton href="/boxes" size="lg" variant="primary">
              Crack Open a Trunk
            </GlowButton>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent z-10" />

      {/* CSS animations */}
      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.1); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 20px) scale(1.05); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.15); }
        }
      `}</style>
    </section>
  );
}
