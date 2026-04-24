"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface ConfettiProps {
  trigger: boolean;
}

export default function Confetti({ trigger }: ConfettiProps) {
  const hasFired = useRef(false);

  useEffect(() => {
    if (trigger && !hasFired.current) {
      hasFired.current = true;

      // Gold/purple/pink burst
      const fire = (angle: number, origin: { x: number; y: number }) => {
        confetti({
          particleCount: 100,
          spread: 80,
          angle,
          origin,
          colors: [
            "#FFD700", // gold
            "#8B5CF6", // purple
            "#EC4899", // pink
            "#F59E0B", // amber
            "#06B6D4", // cyan
          ],
          startVelocity: 50,
          gravity: 1.2,
          ticks: 200,
          scalar: 1.2,
        });
      };

      // Multiple bursts from different positions
      fire(60, { x: 0, y: 0.7 });
      fire(120, { x: 1, y: 0.7 });

      setTimeout(() => {
        fire(90, { x: 0.5, y: 0.9 });
      }, 200);

      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 360,
          origin: { x: 0.5, y: 0.4 },
          colors: ["#FFD700", "#8B5CF6", "#EC4899"],
          startVelocity: 30,
          gravity: 0.8,
          ticks: 300,
          shapes: ["circle", "square"],
        });
      }, 500);
    }
  }, [trigger]);

  return null;
}
