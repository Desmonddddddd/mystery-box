"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useGamificationStore } from "@/stores/gamificationStore";
import { useUserStore } from "@/stores/userStore";
import { getRandomInt } from "@/lib/utils";
import confetti from "canvas-confetti";

const POSITIONS = [
  { bottom: "20%", right: "5%" },
  { bottom: "30%", left: "5%" },
  { top: "40%", right: "8%" },
  { top: "50%", left: "3%" },
  { bottom: "15%", right: "12%" },
  { top: "35%", left: "8%" },
];

export default function SecretBox() {
  const [visible, setVisible] = useState(false);
  const [found, setFound] = useState(false);
  const [reward, setReward] = useState(0);
  const [position, setPosition] = useState(POSITIONS[0]);

  const canFind = useGamificationStore((s) => s.canFindSecretBox);
  const findSecretBox = useGamificationStore((s) => s.findSecretBox);
  const addCredits = useUserStore((s) => s.addCredits);

  useEffect(() => {
    if (!canFind()) return;

    // Random delay between 30-120 seconds before appearing
    const delay = getRandomInt(30000, 120000);
    const timer = setTimeout(() => {
      setPosition(POSITIONS[getRandomInt(0, POSITIONS.length - 1)]);
      setVisible(true);

      // Auto-hide after 15 seconds if not clicked
      const hideTimer = setTimeout(() => {
        setVisible(false);
      }, 15000);

      return () => clearTimeout(hideTimer);
    }, delay);

    return () => clearTimeout(timer);
  }, [canFind]);

  const handleClick = () => {
    if (found) return;

    const credits = getRandomInt(50, 200);
    setReward(credits);
    setFound(true);
    findSecretBox();
    addCredits(credits);

    // Confetti burst
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#EC4899", "#8B5CF6", "#3B82F6", "#06B6D4"],
    });

    // Hide after 3 seconds
    setTimeout(() => {
      setVisible(false);
      setFound(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed z-[100] cursor-pointer"
          style={position}
          onClick={handleClick}
        >
          {found ? (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: [1, 1.2, 1] }}
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl px-4 py-3 text-center shadow-2xl"
            >
              <p className="text-white font-bold text-lg">+{reward} Credits!</p>
              <p className="text-white/70 text-xs">Secret Box Found!</p>
            </motion.div>
          ) : (
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/40 to-purple-500/40 blur-xl animate-pulse" />
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-pink-500/50 shadow-[0_0_20px_rgba(236,72,153,0.4)]">
                <Image
                  src="/images/MYSTER Guy.jpg"
                  alt="Secret Box"
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -top-2 -right-2 text-lg"
              >
                ✨
              </motion.span>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
