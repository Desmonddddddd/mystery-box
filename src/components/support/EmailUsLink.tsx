"use client";

import { useContactModalStore } from "@/stores/contactModalStore";

/** Footer "Email us" trigger — opens the contact form modal. */
export default function EmailUsLink() {
  const open = useContactModalStore((s) => s.open);

  return (
    <button
      onClick={open}
      className="mt-4 inline-flex items-center gap-2 text-sm text-pink-400 hover:text-pink-300 transition-colors"
    >
      <span
        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
        style={{
          background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
        }}
      >
        @
      </span>
      Email us
    </button>
  );
}
