"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Package,
  Trophy,
  Star,
  Gift,
  LogOut,
  Copy,
  Check,
  ShoppingBag,
  Crown,
  Sparkles,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/stores/userStore";
import { formatPrice, generateReferralCode } from "@/lib/utils";
import { useGamificationStore } from "@/stores/gamificationStore";
import type { Rarity } from "@/types";
import LuckMeter from "@/components/gamification/LuckMeter";
import DailyRewards from "@/components/gamification/DailyRewards";

type Tab = "items" | "orders";

export default function DashboardPage() {
  const profile = useUserStore((s) => s.profile);
  const orders = useUserStore((s) => s.orders);
  const login = useUserStore((s) => s.login);
  const logout = useUserStore((s) => s.logout);

  const { isLoggedIn, name, phone, credits, boxesOpened, itemsWon } = profile;

  const referralCode = useGamificationStore((s) => s.referralCode);
  const referralCount = useGamificationStore((s) => s.referralCount);
  const streak = useGamificationStore((s) => s.dailyStreak);

  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("items");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginName, setLoginName] = useState("");
  const [loginPhone, setLoginPhone] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (loginName.trim() && loginPhone.trim()) {
        login(loginName.trim(), loginPhone.trim());
        setShowLoginModal(false);
        setLoginName("");
        setLoginPhone("");
      }
    },
    [loginName, loginPhone, login]
  );

  const handleCopyReferral = useCallback(() => {
    const code = referralCode || generateReferralCode();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [referralCode]);

  const getRarityColor = (rarity: Rarity): string => {
    switch (rarity) {
      case "common":
        return "text-gray-400 bg-gray-500/10 border-gray-500/20";
      case "rare":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "epic":
        return "text-purple-400 bg-purple-500/10 border-purple-500/20";
      case "legendary":
        return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    }
  };

  const getRarityLabel = (rarity: Rarity): string => {
    return rarity.charAt(0).toUpperCase() + rarity.slice(1);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  // ─── Not Logged In ────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-dark-950">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-24 h-24 rounded-full bg-dark-800 flex items-center justify-center mx-auto mb-6">
              <User className="w-12 h-12 text-gray-500" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3">
              Welcome to Your Dashboard
            </h1>
            <p className="text-gray-400 max-w-md mx-auto">
              Log in to track your boxes, view your collection, and manage
              orders.
            </p>
          </motion.div>

          {!showLoginModal ? (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={() => setShowLoginModal(true)}
              className="px-10 py-4 rounded-xl font-bold text-white text-lg transition-all hover:scale-105 active:scale-95"
              style={{
                background:
                  "linear-gradient(135deg, #EC4899, #8B5CF6, #3B82F6)",
              }}
            >
              Log In / Sign Up
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl p-8 w-full max-w-md"
            >
              <h2 className="text-xl font-bold text-white mb-6 text-center">
                Enter Your Details
              </h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white placeholder-gray-500 focus:border-neon-purple focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    placeholder="9876543210"
                    maxLength={10}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white placeholder-gray-500 focus:border-neon-purple focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowLoginModal(false)}
                    className="flex-1 px-6 py-3 rounded-xl font-semibold text-gray-300 border border-white/10 hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background:
                        "linear-gradient(135deg, #EC4899, #8B5CF6)",
                    }}
                  >
                    Continue
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // ─── Logged In Dashboard ──────────────────────────────────
  const totalItemValue = itemsWon.reduce((sum, item) => sum + item.value, 0);
  const legendaryCount = itemsWon.filter(
    (item) => item.rarity === "legendary"
  ).length;

  const stats = [
    {
      label: "Boxes Opened",
      value: boxesOpened.toString(),
      icon: Package,
      color: "text-neon-pink",
      bgColor: "bg-neon-pink/10",
    },
    {
      label: "Items Won",
      value: itemsWon.length.toString(),
      icon: Trophy,
      color: "text-neon-blue",
      bgColor: "bg-neon-blue/10",
    },
    {
      label: "Total Value Won",
      value: formatPrice(totalItemValue),
      icon: Star,
      color: "text-neon-yellow",
      bgColor: "bg-neon-yellow/10",
    },
    {
      label: "Legendaries",
      value: legendaryCount.toString(),
      icon: Crown,
      color: "text-amber-400",
      bgColor: "bg-amber-400/10",
    },
    {
      label: "Credits",
      value: formatPrice(credits),
      icon: Gift,
      color: "text-neon-green",
      bgColor: "bg-neon-green/10",
    },
    {
      label: "Streak",
      value: `${streak} days`,
      icon: Sparkles,
      color: "text-neon-cyan",
      bgColor: "bg-neon-cyan/10",
    },
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-pink/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        {/* ─── Profile Header ────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center text-2xl font-bold text-white">
              {name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
                {name}
              </h1>
              <p className="text-gray-400 text-sm">{phone}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 border border-white/10 hover:text-neon-red hover:border-neon-red/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* ─── Stats Grid ────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass rounded-xl p-4 text-center"
            >
              <div
                className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center mx-auto mb-2`}
              >
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-lg font-bold text-white">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* ─── Luck Meter & Daily Rewards ────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <LuckMeter />
          <DailyRewards />
        </div>

        {/* ─── Tabs ──────────────────────────────────────────── */}
        <div className="flex gap-1 mb-8 bg-dark-800/50 p-1 rounded-xl w-fit">
          {(["items", "orders"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-r from-neon-pink to-neon-purple text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab === "items" ? "My Items" : "Orders"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ─── Items Gallery ────────────────────────────────── */}
          {activeTab === "items" && (
            <motion.div
              key="items"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {itemsWon.length === 0 ? (
                <div className="glass rounded-2xl p-12 text-center">
                  <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    No items yet
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Open some mystery boxes to start your collection!
                  </p>
                  <Link
                    href="/boxes"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white hover:scale-105 transition-transform"
                    style={{
                      background:
                        "linear-gradient(135deg, #EC4899, #8B5CF6)",
                    }}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Browse Boxes
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {itemsWon.map((item, idx) => (
                    <motion.div
                      key={`${item.id}-${idx}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      className={`glass rounded-xl p-4 border ${getRarityColor(item.rarity).split(" ").slice(2).join(" ")}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{item.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-white truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-400">{item.category}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span
                              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getRarityColor(item.rarity)}`}
                            >
                              {getRarityLabel(item.rarity)}
                            </span>
                            <span className="text-sm font-bold text-white">
                              {formatPrice(item.value)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ─── Order History ────────────────────────────────── */}
          {activeTab === "orders" && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {orders.length === 0 ? (
                <div className="glass rounded-2xl p-12 text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    No orders yet
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Your order history will appear here after your first
                    purchase.
                  </p>
                  <Link
                    href="/boxes"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white hover:scale-105 transition-transform"
                    style={{
                      background:
                        "linear-gradient(135deg, #EC4899, #8B5CF6)",
                    }}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Shop Now
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order, idx) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="glass rounded-xl p-5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-dark-800 flex items-center justify-center text-xl">
                            {order.boxId === "basic"
                              ? "📦"
                              : order.boxId === "silver"
                                ? "🥈"
                                : order.boxId === "gold"
                                  ? "🥇"
                                  : order.boxId === "elite"
                                    ? "💎"
                                    : "👑"}
                          </div>
                          <div>
                            <h4 className="font-bold text-white">
                              {order.boxName}
                            </h4>
                            <p className="text-xs text-gray-400">
                              {order.id} &bull; Qty: {order.quantity}
                            </p>
                            {order.engravingName && (
                              <p className="text-xs text-fuchsia-400">
                                Engraved: {order.engravingName}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="font-bold text-white">
                              {formatPrice(order.total)}
                            </p>
                            <p className="text-xs text-gray-400">
                              {new Date(order.date).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              order.status === "delivered"
                                ? "bg-neon-green/10 text-neon-green"
                                : order.status === "shipped"
                                  ? "bg-neon-blue/10 text-neon-blue"
                                  : "bg-neon-yellow/10 text-neon-yellow"
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Referral Card ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 glass rounded-2xl p-6 sm:p-8 border border-neon-purple/20"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <Share2 className="w-5 h-5 text-neon-purple" />
                Refer &amp; Earn
              </h3>
              <p className="text-gray-400 text-sm max-w-lg">
                Share your referral code with friends. Both of you get{" "}
                <span className="text-neon-green font-semibold">
                  200 credits
                </span>{" "}
                when they make their first purchase!
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {referralCount} friends referred so far
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-5 py-3 rounded-xl bg-dark-800 border border-white/10 font-mono text-lg font-bold text-neon-purple tracking-widest">
                {referralCode || generateReferralCode()}
              </div>
              <button
                onClick={handleCopyReferral}
                className="p-3 rounded-xl bg-dark-800 border border-white/10 hover:bg-dark-700 transition-colors"
                title="Copy referral code"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-neon-green" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
