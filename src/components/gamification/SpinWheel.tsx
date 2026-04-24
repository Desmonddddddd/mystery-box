"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGamificationStore } from "@/stores/gamificationStore";
import { useUserStore } from "@/stores/userStore";
import { SPIN_SEGMENTS } from "@/lib/constants";
import GlowButton from "@/components/ui/GlowButton";
import GlassCard from "@/components/ui/GlassCard";

export default function SpinWheel() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const canSpinToday = useGamificationStore((s) => s.canSpinToday);
  const recordSpin = useGamificationStore((s) => s.recordSpin);
  const resetSpinIfNewDay = useGamificationStore((s) => s.resetSpinIfNewDay);
  const addCredits = useUserStore((s) => s.addCredits);

  useEffect(() => {
    resetSpinIfNewDay();
  }, [resetSpinIfNewDay]);

  const segmentCount = SPIN_SEGMENTS.length;
  const segmentAngle = 360 / segmentCount;

  const handleSpin = useCallback(() => {
    if (spinning || !canSpinToday()) return;

    setSpinning(true);
    setResult(null);

    // Random winning segment
    const winningIndex = Math.floor(Math.random() * segmentCount);
    const segment = SPIN_SEGMENTS[winningIndex];

    // Calculate rotation: multiple full spins + target position
    // The pointer is at the top (0 degrees).
    // We need the winning segment to land at the top.
    const targetAngle =
      360 * 5 + // 5 full rotations
      (360 - winningIndex * segmentAngle - segmentAngle / 2);

    setRotation((prev) => prev + targetAngle);

    setTimeout(() => {
      setSpinning(false);
      setResult(segment.label);
      recordSpin(segment.label);

      // Add credits if applicable
      if (segment.value > 0 && segment.label.includes("Credit")) {
        addCredits(segment.value);
      }
    }, 4500);
  }, [spinning, !canSpinToday(), segmentCount, segmentAngle, recordSpin, addCredits]);

  return (
    <div className="max-w-md mx-auto">
      <GlassCard hover={false} glow="rgba(139, 92, 246, 0.15)">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Daily Spin
        </h2>
        <p className="text-white/50 text-sm text-center mb-8">
          Spin once a day for free rewards!
        </p>

        {/* Wheel container */}
        <div className="relative mx-auto w-72 h-72 sm:w-80 sm:h-80 mb-8">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10">
            <div
              className="w-0 h-0"
              style={{
                borderLeft: "12px solid transparent",
                borderRight: "12px solid transparent",
                borderTop: "20px solid #EC4899",
                filter: "drop-shadow(0 0 10px rgba(236, 72, 153, 0.6))",
              }}
            />
          </div>

          {/* Wheel */}
          <div
            ref={wheelRef}
            className="w-full h-full rounded-full border-4 border-white/10 overflow-hidden relative"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning
                ? "transform 4.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
                : undefined,
            }}
          >
            {SPIN_SEGMENTS.map((seg, i) => {
              const startAngle = i * segmentAngle;
              const midAngle = startAngle + segmentAngle / 2;
              return (
                <div
                  key={i}
                  className="absolute inset-0 origin-center"
                  style={{
                    transform: `rotate(${startAngle}deg)`,
                    clipPath: `polygon(50% 50%, ${50 + 50 * Math.sin(0)}% ${50 - 50 * Math.cos(0)}%, ${50 + 50 * Math.sin((segmentAngle * Math.PI) / 180)}% ${50 - 50 * Math.cos((segmentAngle * Math.PI) / 180)}%)`,
                  }}
                >
                  <div
                    className="w-full h-full"
                    style={{ backgroundColor: seg.color }}
                  />
                </div>
              );
            })}

            {/* Segment labels */}
            {SPIN_SEGMENTS.map((seg, i) => {
              const angle = i * segmentAngle + segmentAngle / 2;
              const rad = (angle * Math.PI) / 180;
              const radius = 35;
              const x = 50 + radius * Math.sin(rad);
              const y = 50 - radius * Math.cos(rad);
              return (
                <div
                  key={`label-${i}`}
                  className="absolute text-white text-[9px] sm:text-[10px] font-bold text-center pointer-events-none"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                    textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                    width: "60px",
                  }}
                >
                  {seg.label}
                </div>
              );
            })}

            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0a0a0f] border-2 border-white/20 flex items-center justify-center z-10">
              <span className="text-xs font-bold text-white/60">SPIN</span>
            </div>
          </div>
        </div>

        {/* Spin button */}
        <div className="text-center">
          <GlowButton
            onClick={handleSpin}
            disabled={spinning || !canSpinToday()}
            variant="primary"
            size="lg"
          >
            {spinning
              ? "Spinning..."
              : !canSpinToday()
              ? "Come Back Tomorrow"
              : "SPIN!"}
          </GlowButton>
        </div>

        {/* Result popup */}
        <AnimatePresence>
          {result && (
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", damping: 12 }}
            >
              <div className="inline-block bg-white/5 border border-white/10 rounded-xl px-6 py-4">
                <p className="text-white/50 text-sm mb-1">You won</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  {result}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </div>
  );
}
