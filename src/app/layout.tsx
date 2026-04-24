import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import WelcomeBonus from "@/components/gamification/WelcomeBonus";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "MYSTERYX — What Will You Unbox?",
  description:
    "MYSTERYX is India's #1 gamified mystery box platform. Unbox curated surprises — fashion, tech, collectibles, and legendary drops worth up to 100x your purchase. Try your luck today!",
  keywords: [
    "mystery box",
    "unboxing",
    "gamified shopping",
    "surprise box",
    "MYSTERYX",
    "loot box",
    "India",
  ],
  openGraph: {
    title: "MYSTERYX — What Will You Unbox?",
    description:
      "Unbox curated surprises worth up to 100x your purchase. Fashion, tech, collectibles & legendary drops.",
    type: "website",
    siteName: "MYSTERYX",
  },
  twitter: {
    card: "summary_large_image",
    title: "MYSTERYX — What Will You Unbox?",
    description:
      "India's #1 gamified mystery box platform. Legendary drops await.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${orbitron.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-dark-950 text-white font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <WelcomeBonus />
      </body>
    </html>
  );
}
