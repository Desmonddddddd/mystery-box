"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gem, Zap, Check, ArrowLeft, Sparkles, ShieldCheck, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/stores/userStore";
import PaymentModal from "@/components/ui/PaymentModal";
import confetti from "canvas-confetti";

const GEM_PACKAGES = [
  {
    gems: 100,
    price: 200,
    label: "Starter",
    popular: false,
    gradient: "from-blue-500 to-cyan-400",
    glow: "rgba(59, 130, 246, 0.3)",
  },
  {
    gems: 500,
    price: 600,
    label: "Popular",
    popular: true,
    gradient: "from-purple-500 to-pink-500",
    glow: "rgba(139, 92, 246, 0.4)",
  },
  {
    gems: 1000,
    price: 1000,
    label: "Best Value",
    popular: false,
    gradient: "from-pink-500 to-rose-500",
    glow: "rgba(236, 72, 153, 0.3)",
  },
  {
    gems: 2000,
    price: 1800,
    label: "Pro",
    popular: false,
    gradient: "from-amber-500 to-yellow-400",
    glow: "rgba(245, 158, 11, 0.3)",
  },
  {
    gems: 5000,
    price: 4200,
    label: "Whale",
    popular: false,
    gradient: "from-emerald-500 to-teal-400",
    glow: "rgba(16, 185, 129, 0.3)",
  },
];

export default function StorePage() {
  const addGems = useUserStore((s) => s.addGems);
  const gems = useUserStore((s) => s.profile.gems);
  const isLoggedIn = useUserStore((s) => s.profile.isLoggedIn);
  const [purchased, setPurchased] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<(typeof GEM_PACKAGES)[number] | null>(null);

  useState(() => {
    setMounted(true);
  });

  const handleBuy = (pkg: (typeof GEM_PACKAGES)[number]) => {
    if (!isLoggedIn) return;
    setSelectedPkg(pkg);
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    if (!selectedPkg) return;

    addGems(selectedPkg.gems);
    setPurchased(selectedPkg.gems);
    setShowPayment(false);
    setSelectedPkg(null);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 },
      colors: ["#EC4899", "#8B5CF6", "#3B82F6", "#06B6D4", "#10B981"],
    });

    setTimeout(() => setPurchased(null), 2500);
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-pink-500/5 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-blue-500/3 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 mb-6">
            <Gem className="w-4 h-4 text-purple-400" />
            Gem Store
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Get{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Gems
            </span>
          </h1>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Power up your experience. Use gems to spin the wheel, play the
            online game, and unlock exclusive rewards.
          </p>
        </motion.div>

        {/* Current balance */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10">
            <Gem className="w-5 h-5 text-purple-400" />
            <span className="text-white/60 text-sm">Your Balance:</span>
            <span className="text-xl font-bold text-white">
              {mounted ? gems.toLocaleString() : "---"}
            </span>
            <span className="text-sm text-white/40">gems</span>
          </div>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-16">
          {GEM_PACKAGES.map((pkg, index) => {
            const perGem = (pkg.price / pkg.gems).toFixed(1);
            const isPurchased = purchased === pkg.gems;

            return (
              <motion.div
                key={pkg.gems}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="relative"
              >
                {/* Popular badge */}
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r from-pink-500 to-purple-500 shadow-[0_0_15px_rgba(236,72,153,0.4)]">
                      Most Popular
                    </span>
                  </div>
                )}

                <div
                  className={`relative group rounded-2xl border p-6 flex flex-col items-center text-center transition-all duration-300 bg-white/5 backdrop-blur-xl overflow-hidden ${
                    pkg.popular
                      ? "border-pink-500/30 ring-1 ring-pink-500/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                  style={{
                    boxShadow: pkg.popular
                      ? `0 0 40px ${pkg.glow}`
                      : undefined,
                  }}
                >
                  {/* Top gradient accent */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${pkg.gradient}`}
                  />

                  {/* Gem icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pkg.gradient} flex items-center justify-center mb-4 shadow-lg`}
                    style={{ boxShadow: `0 0 20px ${pkg.glow}` }}
                  >
                    <Gem className="w-7 h-7 text-white" />
                  </div>

                  {/* Label */}
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">
                    {pkg.label}
                  </p>

                  {/* Gem amount */}
                  <h3 className="text-3xl font-black text-white mb-1">
                    {pkg.gems.toLocaleString()}
                  </h3>
                  <p className="text-xs text-white/30 mb-4">gems</p>

                  {/* Price */}
                  <div className="mb-1">
                    <span className="text-2xl font-bold text-white">
                      ₹{pkg.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[10px] text-white/30 mb-5">
                    ₹{perGem} per gem
                  </p>

                  {/* Buy button */}
                  <AnimatePresence mode="wait">
                    {isPurchased ? (
                      <motion.div
                        key="success"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="w-full py-2.5 px-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-semibold flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Added!
                      </motion.div>
                    ) : (
                      <motion.button
                        key="buy"
                        onClick={() => handleBuy(pkg)}
                        disabled={!isLoggedIn}
                        className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                          isLoggedIn
                            ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] active:scale-95"
                            : "bg-white/5 text-white/30 cursor-not-allowed"
                        }`}
                      >
                        <Zap className="w-3.5 h-3.5" />
                        {isLoggedIn ? "Buy Now" : "Login to Buy"}
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ════════ REDEEM GEMS SECTION ════════ */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="text-2xl font-bold text-white">Redeem Gems</h2>
            <span className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold">
              Coming Soon
            </span>
          </div>
          <p className="text-sm text-white/40 mb-6 max-w-lg">
            Exchange your gems for real products — gift cards, merch, accessories
            and more. Items will be added soon!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { id: "r1", name: "Coming Soon", gemCost: 500, emoji: "🎁" },
              { id: "r2", name: "Coming Soon", gemCost: 1000, emoji: "🎁" },
              { id: "r3", name: "Coming Soon", gemCost: 2000, emoji: "🎁" },
              { id: "r4", name: "Coming Soon", gemCost: 5000, emoji: "🎁" },
            ].map((item) => (
              <div
                key={item.id}
                className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 flex flex-col items-center text-center opacity-50 pointer-events-none"
              >
                <span className="text-3xl mb-3">{item.emoji}</span>
                <p className="text-sm font-semibold text-white/50 mb-1">
                  {item.name}
                </p>
                <div className="flex items-center gap-1 mb-3">
                  <Gem className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-sm font-bold text-purple-400">
                    {item.gemCost.toLocaleString()}
                  </span>
                </div>
                <button
                  disabled
                  className="w-full py-2 rounded-xl text-xs font-semibold bg-white/5 text-white/20 cursor-not-allowed"
                >
                  Redeem
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            {
              icon: Sparkles,
              title: "Instant Delivery",
              desc: "Gems added to your account immediately",
            },
            {
              icon: ShieldCheck,
              title: "Secure Payment",
              desc: "100% safe and encrypted transactions",
            },
            {
              icon: Gem,
              title: "Use Anywhere",
              desc: "Spin wheel, online game, and more",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="text-xs text-white/40">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* FAQ-style note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-white/25 max-w-md mx-auto">
            Gems are a virtual currency for use within MYSTERYX. They have no
            cash value and cannot be transferred or refunded. See our{" "}
            <Link href="/terms" className="text-purple-400 hover:underline">
              Terms & Conditions
            </Link>{" "}
            for details.
          </p>
        </motion.div>

        {/* Payment Modal */}
        {selectedPkg && (
          <PaymentModal
            isOpen={showPayment}
            onClose={() => {
              setShowPayment(false);
              setSelectedPkg(null);
            }}
            onSuccess={handlePaymentSuccess}
            amount={selectedPkg.price}
            itemDescription={`${selectedPkg.gems.toLocaleString()} Gems`}
          />
        )}
      </div>
    </div>
  );
}
