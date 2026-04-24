"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";
import { NAV_LINKS } from "@/lib/constants";
import LoginModal from "@/components/ui/LoginModal";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const cartItems = useCartStore((s) => s.items);
  const isLoggedIn = useUserStore((s) => s.profile.isLoggedIn);
  const userName = useUserStore((s) => s.profile.name);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const userInitial = userName ? userName.charAt(0).toUpperCase() : "";

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="MYSTERYX"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                MYSTERYX
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/60 hover:text-white transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 text-white/60 hover:text-white transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {mounted && totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Link>

              {/* Login / User */}
              {mounted && isLoggedIn ? (
                <div
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold cursor-pointer"
                  title={userName}
                >
                  {userInitial}
                </div>
              ) : (
                <button
                  onClick={() => setLoginOpen(true)}
                  className="hidden md:block px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  Login
                </button>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
                {mounted && !isLoggedIn && (
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setLoginOpen(true);
                    }}
                    className="w-full px-3 py-2 text-left text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm font-medium"
                  >
                    Login
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
