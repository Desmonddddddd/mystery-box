"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Share2 } from "lucide-react";
import { useGamificationStore } from "@/stores/gamificationStore";
import { generateReferralCode } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import GlassCard from "@/components/ui/GlassCard";
import GlowButton from "@/components/ui/GlowButton";

export default function ReferralCard() {
  const [copied, setCopied] = useState(false);
  const referralCode = useGamificationStore((s) => s.referralCode);
  const referralCount = useGamificationStore((s) => s.referralCount);
  const [code, setCode] = useState(referralCode);

  useEffect(() => {
    if (!referralCode) {
      setCode(generateReferralCode());
    }
  }, [referralCode]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareMessage = encodeURIComponent(
    `Join MYSTERYX and get 200 gems! Use my referral code: ${code}. Sign up at https://mysteryx.in 🎁`
  );

  return (
    <GlassCard glow="rgba(6, 182, 212, 0.1)" hover={false}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
          <Share2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Refer & Earn</h3>
          <p className="text-white/40 text-xs">
            Earn ₹100 per referral
          </p>
        </div>
      </div>

      {/* Referral code */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 font-mono text-white text-lg tracking-[0.3em] text-center font-bold">
          {code}
        </div>
        <motion.button
          onClick={handleCopy}
          className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
          whileTap={{ scale: 0.95 }}
        >
          {copied ? (
            <Check className="w-5 h-5 text-green-400" />
          ) : (
            <Copy className="w-5 h-5" />
          )}
        </motion.button>
      </div>

      {/* Referral count */}
      <div className="flex items-center justify-between mb-5 px-1">
        <span className="text-sm text-white/50">Referrals</span>
        <span className="text-sm font-bold text-cyan-400">
          {referralCount}
        </span>
      </div>

      {/* WhatsApp share */}
      <a
        href={`https://wa.me/?text=${shareMessage}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <GlowButton variant="primary" size="md" className="w-full">
          Share on WhatsApp
        </GlowButton>
      </a>
    </GlassCard>
  );
}
