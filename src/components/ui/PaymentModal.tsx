"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CreditCard,
  Building2,
  Smartphone,
  ChevronLeft,
  Shield,
  CheckCircle2,
  Loader2,
} from "lucide-react";

/* ── Types ─────────────────────────────────────────────── */
type PaymentMethod = "upi" | "card" | "netbanking" | null;
type Step = "method" | "details" | "processing" | "success";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
  itemDescription: string;
}

/* ── Helpers ───────────────────────────────────────────── */
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function generateTxnId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "pay_";
  for (let i = 0; i < 14; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
  return digits;
}

/* ── Banks ─────────────────────────────────────────────── */
const BANKS = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Punjab National Bank",
  "Bank of Baroda",
  "Yes Bank",
];

/* ══════════════════════════════════════════════════════════
   PAYMENT MODAL COMPONENT
   ══════════════════════════════════════════════════════════ */
export default function PaymentModal({
  isOpen,
  onClose,
  onSuccess,
  amount,
  itemDescription,
}: PaymentModalProps) {
  const [step, setStep] = useState<Step>("method");
  const [method, setMethod] = useState<PaymentMethod>(null);
  const [txnId, setTxnId] = useState("");

  // Form fields
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [selectedBank, setSelectedBank] = useState("");

  const resetModal = useCallback(() => {
    setStep("method");
    setMethod(null);
    setTxnId("");
    setUpiId("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvv("");
    setCardName("");
    setSelectedBank("");
  }, []);

  const handleClose = () => {
    if (step === "processing") return; // can't close during processing
    resetModal();
    onClose();
  };

  const handleMethodSelect = (m: PaymentMethod) => {
    setMethod(m);
    setStep("details");
  };

  const handleBack = () => {
    if (step === "details") {
      setStep("method");
      setMethod(null);
    }
  };

  /* ── Validation ────────────────────────────────────────── */
  const isDetailsValid = (): boolean => {
    switch (method) {
      case "upi":
        return upiId.includes("@") && upiId.length >= 5;
      case "card":
        return (
          cardNumber.replace(/\s/g, "").length === 16 &&
          /^\d{2}\/\d{2}$/.test(cardExpiry) &&
          cardCvv.length === 3 &&
          cardName.trim().length >= 2
        );
      case "netbanking":
        return selectedBank.length > 0;
      default:
        return false;
    }
  };

  /* ── Process payment ───────────────────────────────────── */
  const processPayment = async () => {
    setStep("processing");
    // Simulate processing time
    await new Promise((r) => setTimeout(r, 2000 + Math.random() * 1000));
    setTxnId(generateTxnId());
    setStep("success");
  };

  const handleSuccess = () => {
    resetModal();
    onSuccess();
  };

  /* ── Step animations ───────────────────────────────────── */
  const stepVariants = {
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md rounded-2xl overflow-hidden"
            style={{
              background: "rgba(12, 12, 20, 0.98)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow:
                "0 0 60px rgba(59, 130, 246, 0.15), 0 25px 50px rgba(0,0,0,0.5)",
            }}
          >
            {/* ── Header ──────────────────────────────── */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {step === "details" && (
                  <button
                    onClick={handleBack}
                    className="p-1 rounded-lg hover:bg-white/10 transition-colors text-white/80"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-200" />
                    <span className="text-sm font-semibold text-white">
                      Secure Checkout
                    </span>
                  </div>
                  <p className="text-xs text-blue-200 mt-0.5">
                    {itemDescription}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-white">
                  {formatCurrency(amount)}
                </span>
                {step !== "processing" && step !== "success" && (
                  <button
                    onClick={handleClose}
                    className="p-1 rounded-lg hover:bg-white/10 transition-colors text-white/80"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* ── Body ────────────────────────────────── */}
            <div className="p-5 min-h-[320px]">
              <AnimatePresence mode="wait">
                {/* ─── STEP 1: Method Selection ────────── */}
                {step === "method" && (
                  <motion.div
                    key="method"
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-sm text-white/50 mb-4">
                      Choose a payment method
                    </p>

                    <div className="space-y-3">
                      {/* UPI */}
                      <button
                        onClick={() => handleMethodSelect("upi")}
                        className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all group text-left"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                          <Smartphone className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                            UPI
                          </p>
                          <p className="text-xs text-white/40">
                            GPay, PhonePe, Paytm & more
                          </p>
                        </div>
                        <ChevronLeft className="w-4 h-4 text-white/20 rotate-180" />
                      </button>

                      {/* Card */}
                      <button
                        onClick={() => handleMethodSelect("card")}
                        className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all group text-left"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                          <CreditCard className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                            Credit / Debit Card
                          </p>
                          <p className="text-xs text-white/40">
                            Visa, Mastercard, Rupay
                          </p>
                        </div>
                        <ChevronLeft className="w-4 h-4 text-white/20 rotate-180" />
                      </button>

                      {/* Net Banking */}
                      <button
                        onClick={() => handleMethodSelect("netbanking")}
                        className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all group text-left"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                            Net Banking
                          </p>
                          <p className="text-xs text-white/40">
                            All major Indian banks
                          </p>
                        </div>
                        <ChevronLeft className="w-4 h-4 text-white/20 rotate-180" />
                      </button>
                    </div>

                    {/* Trust badges */}
                    <div className="flex items-center justify-center gap-4 mt-6 text-[10px] text-white/25">
                      <span className="flex items-center gap-1">
                        <Shield className="w-3 h-3" /> 256-bit SSL
                      </span>
                      <span>•</span>
                      <span>PCI DSS Compliant</span>
                      <span>•</span>
                      <span>100% Secure</span>
                    </div>
                  </motion.div>
                )}

                {/* ─── STEP 2: Payment Details ─────────── */}
                {step === "details" && (
                  <motion.div
                    key="details"
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                  >
                    {/* UPI Form */}
                    {method === "upi" && (
                      <div>
                        <p className="text-sm text-white/50 mb-4">
                          Enter your UPI ID
                        </p>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="yourname@paytm"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-blue-500/50 transition-colors text-sm"
                          autoFocus
                        />
                        <div className="flex items-center gap-3 mt-3 px-1">
                          <span className="text-[10px] text-white/30">
                            Supported:
                          </span>
                          {["GPay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                            <span
                              key={app}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40"
                            >
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Card Form */}
                    {method === "card" && (
                      <div className="space-y-3">
                        <p className="text-sm text-white/50 mb-4">
                          Enter card details
                        </p>
                        <div>
                          <label className="text-xs text-white/40 mb-1 block">
                            Card Number
                          </label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) =>
                              setCardNumber(formatCardNumber(e.target.value))
                            }
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-blue-500/50 transition-colors text-sm font-mono tracking-wider"
                            autoFocus
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-white/40 mb-1 block">
                              Expiry
                            </label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) =>
                                setCardExpiry(formatExpiry(e.target.value))
                              }
                              placeholder="MM/YY"
                              maxLength={5}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-blue-500/50 transition-colors text-sm font-mono"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-white/40 mb-1 block">
                              CVV
                            </label>
                            <input
                              type="password"
                              value={cardCvv}
                              onChange={(e) =>
                                setCardCvv(
                                  e.target.value.replace(/\D/g, "").slice(0, 3)
                                )
                              }
                              placeholder="•••"
                              maxLength={3}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-blue-500/50 transition-colors text-sm font-mono"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-white/40 mb-1 block">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-blue-500/50 transition-colors text-sm"
                          />
                        </div>
                      </div>
                    )}

                    {/* Net Banking Form */}
                    {method === "netbanking" && (
                      <div>
                        <p className="text-sm text-white/50 mb-4">
                          Select your bank
                        </p>
                        <div className="space-y-2 max-h-[240px] overflow-y-auto">
                          {BANKS.map((bank) => (
                            <button
                              key={bank}
                              onClick={() => setSelectedBank(bank)}
                              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left text-sm ${
                                selectedBank === bank
                                  ? "bg-blue-500/10 border-blue-500/40 text-white"
                                  : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
                              }`}
                            >
                              <Building2 className="w-4 h-4 flex-shrink-0" />
                              {bank}
                              {selectedBank === bank && (
                                <CheckCircle2 className="w-4 h-4 text-blue-400 ml-auto" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pay Button */}
                    <button
                      onClick={processPayment}
                      disabled={!isDetailsValid()}
                      className="w-full mt-5 py-3.5 rounded-xl font-semibold text-white text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      style={{
                        background: isDetailsValid()
                          ? "linear-gradient(135deg, #3B82F6, #2563EB)"
                          : "rgba(255,255,255,0.05)",
                        boxShadow: isDetailsValid()
                          ? "0 0 20px rgba(59, 130, 246, 0.3)"
                          : "none",
                      }}
                    >
                      Pay {formatCurrency(amount)}
                    </button>
                  </motion.div>
                )}

                {/* ─── STEP 3: Processing ──────────────── */}
                {step === "processing" && (
                  <motion.div
                    key="processing"
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-center py-12"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Loader2 className="w-12 h-12 text-blue-400" />
                    </motion.div>
                    <p className="text-white font-semibold mt-5">
                      Processing payment...
                    </p>
                    <p className="text-sm text-white/40 mt-2">
                      Please don&apos;t close this window
                    </p>

                    {/* Progress bar */}
                    <div className="w-48 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "90%" }}
                        transition={{ duration: 2.5, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                )}

                {/* ─── STEP 4: Success ─────────────────── */}
                {step === "success" && (
                  <motion.div
                    key="success"
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-center py-8"
                  >
                    {/* Checkmark */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        damping: 15,
                        stiffness: 200,
                        delay: 0.1,
                      }}
                      className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-5"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          damping: 12,
                          stiffness: 200,
                          delay: 0.3,
                        }}
                      >
                        <CheckCircle2 className="w-12 h-12 text-green-400" />
                      </motion.div>
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-xl font-bold text-white mb-1"
                    >
                      Payment Successful!
                    </motion.h3>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-center"
                    >
                      <p className="text-sm text-white/50 mb-4">
                        {formatCurrency(amount)} paid for {itemDescription}
                      </p>

                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
                        <span className="text-[10px] text-white/30">
                          TXN ID:
                        </span>
                        <span className="text-xs font-mono text-white/60">
                          {txnId}
                        </span>
                      </div>
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      onClick={handleSuccess}
                      className="w-full py-3.5 rounded-xl font-semibold text-white text-sm"
                      style={{
                        background:
                          "linear-gradient(135deg, #10B981, #059669)",
                        boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
                      }}
                    >
                      Continue
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
