"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tag, X } from "lucide-react";

const DISMISS_KEY = "myx-coupon-banner-dismissed";

export default function CouponBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") return;
    } catch {
      // sessionStorage unavailable — show anyway
    }
    setVisible(true);
  }, []);

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-pink-500/25 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 px-4 py-3">
            <div className="w-9 h-9 rounded-full bg-pink-500/15 border border-pink-500/25 flex items-center justify-center shrink-0">
              <Tag className="w-4 h-4 text-pink-400" />
            </div>
            <p className="flex-1 text-sm text-white/80 leading-snug">
              First trunk?{" "}
              <span className="font-bold text-pink-400 font-mono">
                MYSTERY10
              </span>{" "}
              gets you 10% off at checkout.
            </p>
            <button
              onClick={dismiss}
              aria-label="Dismiss coupon banner"
              className="w-11 h-11 -m-1.5 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
