import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtual Unboxing — Try Free | MYSTERYX",
  description:
    "Open a free virtual mystery box and see what you could win! Experience the thrill of unboxing without spending a rupee. Try all 5 box tiers — Basic, Silver, Gold, Elite & Ultra.",
  openGraph: {
    title: "Virtual Unboxing — Try Free | MYSTERYX",
    description:
      "Open a free virtual mystery box and see what you could win! No purchase needed.",
    type: "website",
    siteName: "MYSTERYX",
  },
  twitter: {
    card: "summary_large_image",
    title: "Virtual Unboxing — Try Free | MYSTERYX",
    description:
      "Experience the thrill of unboxing for free. See what items you could win from MYSTERYX mystery boxes.",
  },
};

export default function VirtualLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
