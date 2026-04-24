"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg cursor-pointer"
      style={{
        boxShadow:
          "0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.2)",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
    >
      {/* Pulsing ring */}
      <span className="absolute inset-0 rounded-full animate-ping bg-green-500/30" />
      <span className="absolute inset-0 rounded-full animate-pulse bg-green-500/20" />
      <MessageCircle className="w-7 h-7 relative z-10" fill="white" />
    </motion.a>
  );
}
