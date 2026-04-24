"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CreditCard,
  ArrowLeft,
  Shield,
  CheckCircle,
  Loader2,
  Package,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";
import { getBoxByTier } from "@/data/boxes";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/types";

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  pincode?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const getTotal = useCartStore((s) => s.getTotal);
  const addOrder = useUserStore((s) => s.addOrder);
  const login = useUserStore((s) => s.login);
  const isLoggedIn = useUserStore((s) => s.profile.isLoggedIn);
  const userName = useUserStore((s) => s.profile.name);
  const userPhone = useUserStore((s) => s.profile.phone);

  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pre-fill from user store
  useEffect(() => {
    if (isLoggedIn) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || userName,
        phone: prev.phone || userPhone,
      }));
    }
  }, [isLoggedIn, userName, userPhone]);

  // Redirect if cart is empty
  useEffect(() => {
    if (mounted && items.length === 0) {
      router.replace("/cart");
    }
  }, [mounted, items, router]);

  const cartItems = items.map((item) => ({
    ...item,
    box: getBoxByTier(item.boxId),
  }));

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.box?.price ?? 0) * item.quantity,
    0
  );

  const hasUltraBox = items.some((item) => item.boxId === "ultra");
  const ultraItem = items.find((item) => item.boxId === "ultra");

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit Indian phone number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);

    // Simulate Razorpay payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Log in user if not already
    if (!isLoggedIn) {
      login(formData.name.trim(), formData.phone.trim());
    }

    // Create orders
    cartItems.forEach((item) => {
      if (!item.box) return;
      const order: Order = {
        id: `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
        boxId: item.boxId,
        boxName: item.box.name,
        quantity: item.quantity,
        total: item.box.price * item.quantity,
        status: "confirmed",
        date: new Date().toISOString(),
        engravingName: item.engravingName,
      };
      addOrder(order);
    });

    // Clear cart and redirect
    clearCart();
    setIsProcessing(false);

    // Show success alert (mock Razorpay)
    alert("Payment successful! Your mystery boxes are on the way.");
    router.push("/dashboard");
  };

  if (!mounted || items.length === 0) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-neon-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-neon-cyan" />
              Checkout
            </h1>
            <p className="text-gray-400 mt-1">
              Complete your order and get ready to unbox!
            </p>
          </div>
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ─── Form ──────────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-6 sm:p-8"
              >
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-neon-pink/20 text-neon-pink text-sm flex items-center justify-center font-bold">
                    1
                  </span>
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-xl bg-dark-800 border text-white placeholder-gray-500 focus:outline-none transition-colors ${
                        errors.name
                          ? "border-neon-red focus:border-neon-red"
                          : "border-white/10 focus:border-neon-purple"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-neon-red text-xs mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="9876543210"
                      maxLength={10}
                      className={`w-full px-4 py-3 rounded-xl bg-dark-800 border text-white placeholder-gray-500 focus:outline-none transition-colors ${
                        errors.phone
                          ? "border-neon-red focus:border-neon-red"
                          : "border-white/10 focus:border-neon-purple"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-neon-red text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-dark-800 border text-white placeholder-gray-500 focus:outline-none transition-colors ${
                        errors.email
                          ? "border-neon-red focus:border-neon-red"
                          : "border-white/10 focus:border-neon-purple"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-neon-red text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Shipping Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass rounded-2xl p-6 sm:p-8"
              >
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-neon-blue/20 text-neon-blue text-sm flex items-center justify-center font-bold">
                    2
                  </span>
                  Shipping Address
                </h2>

                <div className="space-y-4">
                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Street Address *
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      placeholder="House No., Street, Landmark"
                      rows={3}
                      className={`w-full px-4 py-3 rounded-xl bg-dark-800 border text-white placeholder-gray-500 focus:outline-none transition-colors resize-none ${
                        errors.address
                          ? "border-neon-red focus:border-neon-red"
                          : "border-white/10 focus:border-neon-purple"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-neon-red text-xs mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* City */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        placeholder="Mumbai"
                        className={`w-full px-4 py-3 rounded-xl bg-dark-800 border text-white placeholder-gray-500 focus:outline-none transition-colors ${
                          errors.city
                            ? "border-neon-red focus:border-neon-red"
                            : "border-white/10 focus:border-neon-purple"
                        }`}
                      />
                      {errors.city && (
                        <p className="text-neon-red text-xs mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    {/* Pincode */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        value={formData.pincode}
                        onChange={(e) =>
                          handleInputChange("pincode", e.target.value)
                        }
                        placeholder="400001"
                        maxLength={6}
                        className={`w-full px-4 py-3 rounded-xl bg-dark-800 border text-white placeholder-gray-500 focus:outline-none transition-colors ${
                          errors.pincode
                            ? "border-neon-red focus:border-neon-red"
                            : "border-white/10 focus:border-neon-purple"
                        }`}
                      />
                      {errors.pincode && (
                        <p className="text-neon-red text-xs mt-1">
                          {errors.pincode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Ultra engraving confirmation */}
              {hasUltraBox && ultraItem && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass rounded-2xl p-6 sm:p-8 border border-fuchsia-500/20"
                >
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-neon-yellow" />
                    Engraving Confirmation
                  </h2>
                  <p className="text-gray-400 text-sm mb-4">
                    Your Ultra Box will be personally engraved. Please confirm the
                    name below:
                  </p>
                  <div className="bg-dark-800/80 rounded-xl p-4 border border-fuchsia-500/10">
                    <p className="text-xs text-gray-500 mb-1">
                      Engraved Name
                    </p>
                    <p className="text-lg font-bold text-fuchsia-400">
                      {ultraItem.engravingName || formData.name || "—"}
                    </p>
                  </div>
                  {!ultraItem.engravingName && !formData.name && (
                    <p className="text-neon-yellow text-xs mt-2">
                      Please enter your name above or set an engraving name in your
                      cart.
                    </p>
                  )}
                </motion.div>
              )}
            </div>

            {/* ─── Order Summary Sidebar ─────────────────────── */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="glass rounded-2xl p-6 sticky top-28"
              >
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Package className="w-5 h-5 text-neon-purple" />
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => {
                    if (!item.box) return null;
                    return (
                      <div
                        key={item.boxId}
                        className="flex items-center gap-3"
                      >
                        <div
                          className={`w-12 h-12 rounded-lg ${item.box.gradient} flex items-center justify-center text-xl shrink-0`}
                        >
                          {item.box.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {item.box.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-white shrink-0">
                          {formatPrice(item.box.price * item.quantity)}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-white/10 pt-4 space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-neon-green font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tax</span>
                    <span className="text-white">Included</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-white font-bold text-lg">Total</span>
                    <span className="text-2xl font-bold neon-text">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full px-6 py-4 rounded-xl font-bold text-white text-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  style={{
                    background: isProcessing
                      ? "#4B5563"
                      : "linear-gradient(135deg, #EC4899, #8B5CF6, #3B82F6)",
                  }}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Pay with Razorpay
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Secure checkout &bull; 256-bit SSL encryption</span>
                </div>

                <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-500">
                  <CheckCircle className="w-3.5 h-3.5 text-neon-green" />
                  <span>100% authentic products guaranteed</span>
                </div>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
