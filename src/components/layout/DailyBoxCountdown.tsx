"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { useGamificationStore } from "@/stores/gamificationStore";

function formatCountdownToMidnight(now: number): string {
  const d = new Date(now);
  const nextMidnight = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate() + 1
  ).getTime();
  const ms = Math.max(0, nextMidnight - now);
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

/**
 * Navbar chip for the Daily Free Box.
 * - Free box available → glowing "Free Box" pill linking to /virtual.
 * - Already claimed today → countdown to local midnight (next free box).
 */
export default function DailyBoxCountdown({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const [now, setNow] = useState<number | null>(null);
  const lastFreeBoxDate = useGamificationStore((s) => s.lastFreeBoxDate);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const timer = setInterval(tick, 1000);
    tick();
    return () => clearInterval(timer);
  }, []);

  // Avoid hydration mismatch: render nothing until mounted.
  if (now === null) return null;

  const today = new Date(now).toISOString().split("T")[0];
  const available = lastFreeBoxDate !== today;

  return (
    <Link
      href="/virtual#daily-free-box"
      onClick={onNavigate}
      aria-label={
        available
          ? "Daily free box available"
          : "Next daily free box countdown"
      }
      className={className}
    >
      {available ? (
        <motion.span
          animate={{ boxShadow: [
            "0 0 8px rgba(236,72,153,0.25)",
            "0 0 18px rgba(236,72,153,0.5)",
            "0 0 8px rgba(236,72,153,0.25)",
          ] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-pink-500/40 bg-pink-500/10 text-pink-300 hover:text-pink-200 transition-colors"
        >
          <Gift className="w-4 h-4" />
          <span className="text-xs font-bold whitespace-nowrap">Free Box</span>
        </motion.span>
      ) : (
        <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/40 hover:text-white/60 transition-colors">
          <Gift className="w-4 h-4" />
          <span className="text-xs font-semibold tabular-nums whitespace-nowrap">
            {formatCountdownToMidnight(now)}
          </span>
        </span>
      )}
    </Link>
  );
}
