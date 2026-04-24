"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useUserStore } from "@/stores/userStore";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/types";
import GlassCard from "@/components/ui/GlassCard";
import GlowButton from "@/components/ui/GlowButton";

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    boxId: "gold",
    boxName: "Gold Box",
    quantity: 1,
    total: 4999,
    status: "delivered",
    date: "2026-04-20",
  },
  {
    id: "ORD-002",
    boxId: "silver",
    boxName: "Silver Box",
    quantity: 2,
    total: 5998,
    status: "shipped",
    date: "2026-04-22",
  },
  {
    id: "ORD-003",
    boxId: "elite",
    boxName: "Elite Box",
    quantity: 1,
    total: 9999,
    status: "confirmed",
    date: "2026-04-24",
  },
];

const statusConfig: Record<
  Order["status"],
  { bg: string; text: string; label: string }
> = {
  confirmed: {
    bg: "bg-blue-500/20",
    text: "text-blue-400",
    label: "Confirmed",
  },
  shipped: {
    bg: "bg-amber-500/20",
    text: "text-amber-400",
    label: "Shipped",
  },
  delivered: {
    bg: "bg-green-500/20",
    text: "text-green-400",
    label: "Delivered",
  },
};

export default function OrderHistory() {
  const [mounted, setMounted] = useState(false);
  const orders = useUserStore((s) => s.orders);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-40 animate-pulse" />
    );
  }

  const displayOrders = orders.length > 0 ? orders : mockOrders;

  if (displayOrders.length === 0) {
    return (
      <GlassCard hover={false}>
        <div className="text-center py-8">
          <ShoppingBag className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white/60 mb-2">
            No orders yet
          </h3>
          <p className="text-white/30 text-sm mb-6">
            Your order history will appear here.
          </p>
          <GlowButton href="/boxes" variant="primary" size="md">
            Browse Boxes
          </GlowButton>
        </div>
      </GlassCard>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-4">Order History</h3>

      <div className="space-y-3">
        {displayOrders.map((order, i) => {
          const status = statusConfig[order.status];
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/15 transition-colors"
            >
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">
                      {order.boxName}
                      {order.quantity > 1 && (
                        <span className="text-white/40"> x{order.quantity}</span>
                      )}
                    </span>
                    <span className="text-xs text-white/30 mt-0.5">
                      {order.id} &middot; {order.date}
                    </span>
                    {order.engravingName && (
                      <span className="text-xs text-purple-400 mt-0.5">
                        Engraved: {order.engravingName}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-white">
                    {formatPrice(order.total)}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}
                  >
                    {status.label}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
