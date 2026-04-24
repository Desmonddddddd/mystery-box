import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtual Mystery Box | MYSTERYX",
  description:
    "Spend gems to open virtual mystery boxes and win instant digital rewards. Redeem gems for real products. No shipping needed!",
  openGraph: {
    title: "Virtual Mystery Box | MYSTERYX",
    description:
      "Spend gems to open virtual mystery boxes. Win digital rewards instantly!",
    type: "website",
    siteName: "MYSTERYX",
  },
  twitter: {
    card: "summary_large_image",
    title: "Virtual Mystery Box | MYSTERYX",
    description:
      "Spend gems to open virtual mystery boxes. Win digital rewards from MYSTERYX instantly.",
  },
};

export default function VirtualLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
