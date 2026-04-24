"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}

const variantStyles = {
  primary: {
    base: "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold",
    glow: "0 0 20px rgba(236, 72, 153, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)",
    hoverGlow:
      "0 0 30px rgba(236, 72, 153, 0.7), 0 0 60px rgba(139, 92, 246, 0.5), 0 0 80px rgba(59, 130, 246, 0.3)",
  },
  secondary: {
    base: "bg-white/5 border border-white/20 text-white font-medium backdrop-blur-sm",
    glow: "0 0 10px rgba(255, 255, 255, 0.05)",
    hoverGlow:
      "0 0 20px rgba(255, 255, 255, 0.1), 0 0 40px rgba(139, 92, 246, 0.2)",
  },
  danger: {
    base: "bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold",
    glow: "0 0 20px rgba(239, 68, 68, 0.4)",
    hoverGlow:
      "0 0 30px rgba(239, 68, 68, 0.6), 0 0 60px rgba(239, 68, 68, 0.3)",
  },
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-xl",
};

export default function GlowButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  href,
  disabled = false,
  type = "button",
}: GlowButtonProps) {
  const styles = variantStyles[variant];
  const sizeClass = sizeStyles[size];

  const buttonContent = (
    <motion.span
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer select-none",
        styles.base,
        sizeClass,
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      style={{ boxShadow: styles.glow }}
      whileHover={
        disabled
          ? {}
          : {
              scale: 1.02,
              boxShadow: styles.hoverGlow,
            }
      }
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {children}
    </motion.span>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className="inline-block">
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-block bg-transparent border-none p-0"
    >
      {buttonContent}
    </button>
  );
}
