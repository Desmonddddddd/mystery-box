"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X } from "lucide-react";
import { useGamificationStore } from "@/stores/gamificationStore";
import { useUserStore } from "@/stores/userStore";
import GlowButton from "@/components/ui/GlowButton";

const DISMISS_KEY = "myx-welcome-dismissed";

export default function WelcomeBonus() {
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const hasClaimedWelcomeBonus = useGamificationStore(
    (s) => s.hasClaimedWelcomeBonus
  );
  const claimWelcomeBonus = useGamificationStore((s) => s.claimWelcomeBonus);
  const addGems = useUserStore((s) => s.addGems);

  useEffect(() => {
    if (hasClaimedWelcomeBonus) return;
    try {
      if (localStorage.getItem(DISMISS_KEY) === "1") return;
    } catch {
      // localStorage unavailable — fail open, but dismissal won't persist
    }
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, [hasClaimedWelcomeBonus]);

  // Lock background scroll while the popup is open
  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  // Any dismissal — X, backdrop, or claim — is permanent
  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
    setShow(false);
  };

  const handleClaim = () => {
    addGems(200);
    claimWelcomeBonus();
    dismiss();
    // Non-blocking confirmation toast — never intercepts taps
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 z-[150] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={dismiss}
            />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-sm bg-[#0d0d15] border border-white/10 rounded-2xl p-8 text-center overflow-hidden"
              style={{
                boxShadow:
                  "0 0 60px rgba(236, 72, 153, 0.2), 0 0 120px rgba(139, 92, 246, 0.1)",
              }}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              {/* Close button — 44x44 tap target */}
              <button
                onClick={dismiss}
                aria-label="Close welcome offer"
                className="absolute top-1 right-1 w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Gradient glow behind icon */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 blur-3xl pointer-events-none" />

              {/* Gift icon */}
              <motion.div
                className="relative mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Gift className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-2">
                Yo, welcome to the family <span className="inline-block">🐒</span>
              </h3>
              <p className="text-white/50 text-sm mb-6">
                Here&apos;s{" "}
                <span className="text-pink-400 font-bold">200 gems</span> on
                the house. Go break something open.
              </p>
              <GlowButton
                onClick={handleClaim}
                variant="primary"
                size="lg"
                className="w-full"
              >
                Grab the Bag
              </GlowButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Non-blocking claimed toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[150] pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0d0d15] border border-green-500/30 shadow-lg shadow-green-500/10">
              <Gift className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-green-400">
                200 gems added to your account
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
