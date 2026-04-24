"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, Trophy, Coins, Flame } from "lucide-react";
import { useUserStore } from "@/stores/userStore";
import { useGamificationStore } from "@/stores/gamificationStore";
import { formatPrice } from "@/lib/utils";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  gradient: string;
  glow: string;
  delay: number;
}

function StatCard({ icon, label, value, gradient, glow, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 relative overflow-hidden"
      style={{ boxShadow: `0 0 30px ${glow}` }}
    >
      {/* Gradient accent */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${gradient}`} />

      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          {icon}
        </div>
        <span className="text-sm text-white/50">{label}</span>
      </div>

      <p className="text-3xl font-black text-white">{value}</p>
    </motion.div>
  );
}

export default function StatsGrid() {
  const [mounted, setMounted] = useState(false);
  const boxesOpened = useUserStore((s) => s.profile.boxesOpened);
  const itemsWon = useUserStore((s) => s.profile.itemsWon);
  const gems = useUserStore((s) => s.profile.gems);
  const streak = useGamificationStore((s) => s.dailyStreak);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 h-28 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<Package className="w-5 h-5 text-white" />}
        label="Boxes Opened"
        value={boxesOpened}
        gradient="from-blue-500 to-cyan-400"
        glow="rgba(59, 130, 246, 0.1)"
        delay={0}
      />
      <StatCard
        icon={<Trophy className="w-5 h-5 text-white" />}
        label="Items Won"
        value={itemsWon.length}
        gradient="from-purple-500 to-pink-500"
        glow="rgba(139, 92, 246, 0.1)"
        delay={0.1}
      />
      <StatCard
        icon={<Coins className="w-5 h-5 text-white" />}
        label="Gems"
        value={gems.toLocaleString()}
        gradient="from-amber-500 to-yellow-400"
        glow="rgba(245, 158, 11, 0.1)"
        delay={0.2}
      />
      <StatCard
        icon={<Flame className="w-5 h-5 text-white" />}
        label="Day Streak"
        value={`${streak} 🔥`}
        gradient="from-red-500 to-orange-400"
        glow="rgba(239, 68, 68, 0.1)"
        delay={0.3}
      />
    </div>
  );
}
