"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useUserStore } from "@/stores/userStore";
import GlowButton from "./GlowButton";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const login = useUserStore((s) => s.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      login(name.trim(), phone.trim());
      setName("");
      setPhone("");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8"
            style={{
              boxShadow:
                "0 0 40px rgba(139, 92, 246, 0.2), 0 0 80px rgba(236, 72, 153, 0.1)",
            }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  MYSTERYX
                </span>
              </h2>
              <p className="text-white/60 text-sm">
                Enter your details to start unboxing
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="login-name"
                  className="block text-sm font-medium text-white/70 mb-2"
                >
                  Name
                </label>
                <input
                  id="login-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="login-phone"
                  className="block text-sm font-medium text-white/70 mb-2"
                >
                  Phone Number
                </label>
                <input
                  id="login-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
                  required
                />
              </div>

              <GlowButton
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
              >
                Start Unboxing
              </GlowButton>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
