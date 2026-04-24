"use client";

import { motion } from "framer-motion";
import { mysteryBoxes } from "@/data/boxes";
import BoxCard from "./BoxCard";

export default function BoxGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mysteryBoxes.map((box, index) => (
        <motion.div
          key={box.id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.12,
            duration: 0.5,
            type: "spring",
            stiffness: 100,
          }}
        >
          <BoxCard box={box} />
        </motion.div>
      ))}
    </div>
  );
}
