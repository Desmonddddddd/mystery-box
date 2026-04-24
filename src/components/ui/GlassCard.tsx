"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: string;
}

export default function GlassCard({
  children,
  className,
  hover = true,
  glow,
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6",
        className
      )}
      style={{
        boxShadow: glow ? `0 0 30px ${glow}` : undefined,
      }}
      whileHover={
        hover
          ? {
              scale: 1.02,
              borderColor: "rgba(255, 255, 255, 0.2)",
              boxShadow: glow
                ? `0 0 40px ${glow}, 0 0 80px ${glow}`
                : "0 0 20px rgba(255, 255, 255, 0.05)",
            }
          : {}
      }
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
