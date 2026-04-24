import Hero from "@/components/home/Hero";
import LiveTicker from "@/components/home/LiveTicker";
import FeaturedBoxes from "@/components/home/FeaturedBoxes";
import WhatYouCanGet from "@/components/home/WhatYouCanGet";
import VirtualTrySection from "@/components/home/VirtualTrySection";
import HowItWorks from "@/components/home/HowItWorks";
import CommunityWall from "@/components/home/CommunityWall";
import Leaderboard from "@/components/home/Leaderboard";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Hero />
      <LiveTicker />
      <FeaturedBoxes />
      <WhatYouCanGet />
      <VirtualTrySection />
      <HowItWorks />
      <CommunityWall />
      <Leaderboard />
    </div>
  );
}
