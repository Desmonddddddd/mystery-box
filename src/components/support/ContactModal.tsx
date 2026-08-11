"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Send, CheckCircle2, AlertTriangle } from "lucide-react";
import { useContactModalStore } from "@/stores/contactModalStore";
import { CONTACT_FORM_ENDPOINT, SUPPORT_EMAIL, SUPPORT_LINK } from "@/lib/constants";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactModal() {
  const isOpen = useContactModalStore((s) => s.isOpen);
  const close = useContactModalStore((s) => s.close);
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [message, setMessage] = useState("");

  // Fresh form every time the modal opens
  useEffect(() => {
    if (isOpen) setStatus("idle");
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          order_id: orderId || "—",
          message,
          _subject: `MYSTERYX Enquiry from ${name}`,
          _template: "table",
        }),
      });
      if (!res.ok) throw new Error(`relay responded ${res.status}`);
      setStatus("sent");
      setName("");
      setEmail("");
      setOrderId("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-pink-500/50 focus:bg-white/[0.07] transition-colors";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={close}
          />

          <motion.div
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-dark-950/95 backdrop-blur-xl p-6 shadow-2xl shadow-purple-500/10"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {status === "sent" ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 mx-auto text-green-400 mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">
                  Enquiry sent!
                </h2>
                <p className="text-sm text-white/50 mb-6">
                  It&apos;s landed in our support inbox. We usually reply within
                  a few hours.
                </p>
                <button
                  onClick={close}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 active:scale-95 transition-all"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
                    }}
                  >
                    <Mail className="w-4 h-4 text-white" />
                  </span>
                  <h2 className="text-lg font-bold text-white">Email us</h2>
                </div>
                <p className="text-xs text-white/40 mb-5 ml-12">
                  Tell us what&apos;s up — it goes straight to our support
                  inbox.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    className={inputClass}
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email (so we can reply)"
                    autoComplete="email"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Order ID (optional)"
                    className={inputClass}
                  />
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue or question…"
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />

                  {status === "error" && (
                    <p className="flex items-start gap-1.5 text-xs text-amber-400/90">
                      <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <span>
                        Couldn&apos;t send just now. Try again, or email us
                        directly at{" "}
                        <a href={SUPPORT_LINK} className="underline">
                          {SUPPORT_EMAIL}
                        </a>
                        .
                      </span>
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full mt-1 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {status === "sending" ? "Sending…" : "Send Enquiry"}
                  </button>
                </form>

                <p className="mt-4 text-center text-[10px] text-white/25">
                  Prefer your own mail app?{" "}
                  <a
                    href={SUPPORT_LINK}
                    className="underline hover:text-white/50 transition-colors"
                  >
                    Email {SUPPORT_EMAIL}
                  </a>
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
