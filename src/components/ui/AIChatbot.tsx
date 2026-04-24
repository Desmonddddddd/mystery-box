"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, ExternalLink } from "lucide-react";
import Image from "next/image";
import { findBestMatch } from "@/lib/chatMatcher";
import { WHATSAPP_LINK } from "@/lib/constants";

/* ── Types ─────────────────────────────────────────────── */
interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
}

/* ── Suggested questions ───────────────────────────────── */
const SUGGESTIONS = [
  "What's inside a trunk?",
  "How does shipping work?",
  "How do gems work?",
  "What are the prices?",
];

/* ── Typing dots component ─────────────────────────────── */
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 rounded-full bg-white/40"
            animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <span className="text-xs text-white/30 ml-2">typing...</span>
    </div>
  );
}

/* ── Main Component ────────────────────────────────────── */
export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Add welcome message on first open
  const handleOpen = useCallback(() => {
    setIsOpen(true);
    if (!hasOpened) {
      setHasOpened(true);
      setMessages([
        {
          id: "welcome",
          role: "bot",
          text: "Hey! 👋 I'm the MYSTERYX bot. Ask me anything about mystery trunks, shipping, gems, or how things work!",
        },
      ]);
    }
  }, [hasOpened]);

  // Send message
  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        text: trimmed,
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);

      // Simulate typing delay (500-800ms)
      const delay = 500 + Math.random() * 300;
      setTimeout(() => {
        const response = findBestMatch(trimmed);
        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          role: "bot",
          text: response.answer,
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, delay);
    },
    [isTyping]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* ─── Chat Panel ──────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 z-[60] w-[360px] sm:w-[380px] h-[520px] max-h-[80vh] flex flex-col rounded-2xl overflow-hidden
              max-sm:left-3 max-sm:right-3 max-sm:bottom-24 max-sm:top-24 max-sm:w-auto max-sm:h-auto"
            style={{
              background: "rgba(10, 10, 15, 0.95)",
              backdropFilter: "blur(40px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow:
                "0 0 40px rgba(139, 92, 246, 0.15), 0 0 80px rgba(236, 72, 153, 0.08), 0 25px 50px rgba(0,0,0,0.5)",
            }}
          >
            {/* ── Header ───────────────────────────────── */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 flex-shrink-0">
              {/* Lion avatar */}
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-purple-500/50 flex-shrink-0">
                <Image
                  src="/images/lion-mascot.webp"
                  alt="Bot"
                  fill
                  className="object-cover"
                  sizes="36px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white">MYSTERYX Bot</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-[10px] text-white/40">Always online</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ── Messages ─────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin scrollbar-thumb-white/10">
              {/* Suggestions — shown when few messages */}
              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {SUGGESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 transition-all"
                    >
                      {q}
                    </button>
                  ))}
                  {/* WhatsApp suggestion */}
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-green-400 hover:border-green-500/40 hover:bg-green-500/10 transition-all"
                  >
                    Talk to a human 💬
                  </a>
                </div>
              )}

              {/* Message bubbles */}
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "rounded-2xl rounded-br-sm text-white"
                        : "rounded-2xl rounded-bl-sm bg-white/5 text-white/80"
                    }`}
                    style={
                      msg.role === "user"
                        ? {
                            background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
                          }
                        : undefined
                    }
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 rounded-2xl rounded-bl-sm">
                    <TypingIndicator />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Input ────────────────────────────────── */}
            <div className="flex-shrink-0 border-t border-white/10 p-3">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-purple-500/50 transition-colors"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    background: input.trim() && !isTyping
                      ? "linear-gradient(135deg, #EC4899, #8B5CF6)"
                      : "rgba(255,255,255,0.05)",
                  }}
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>

              {/* WhatsApp fallback link */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 mt-2 text-[10px] text-white/25 hover:text-white/50 transition-colors"
              >
                Need a human? Chat on WhatsApp
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Floating Trigger Button ─────────────────────── */}
      <motion.button
        onClick={() => (isOpen ? setIsOpen(false) : handleOpen())}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full text-white cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
          boxShadow:
            "0 0 20px rgba(236, 72, 153, 0.5), 0 0 40px rgba(139, 92, 246, 0.25)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {/* Pulsing rings (only when closed) */}
        {!isOpen && (
          <>
            <span className="absolute inset-0 rounded-full animate-ping bg-pink-500/20" />
            <span className="absolute inset-0 rounded-full animate-pulse bg-purple-500/15" />
          </>
        )}

        {/* Icon — switch between Bot and X */}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6 relative z-10" />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Bot className="w-7 h-7 relative z-10" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification dot — first visit only */}
        {!hasOpened && !isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-[#0a0a0f] flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-[8px] font-bold text-white">1</span>
          </motion.div>
        )}
      </motion.button>
    </>
  );
}
