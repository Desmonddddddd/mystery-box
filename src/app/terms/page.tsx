import { SITE_NAME } from "@/lib/constants";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-dark-950 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">
          Terms &amp; Conditions
        </h1>

        <div className="space-y-8">
          {[
            {
              title: "1. General",
              content: `Welcome to ${SITE_NAME}. By accessing and using this platform, you agree to be bound by these Terms and Conditions. ${SITE_NAME} is a mystery box e-commerce platform that offers curated surprise packages containing a variety of items. All items shown on the platform are indicative of possible contents — actual items received may vary based on availability and the randomized selection process.`,
            },
            {
              title: "2. Eligibility",
              content: "You must be at least 18 years of age to purchase mystery boxes on this platform. By placing an order, you confirm that you meet this age requirement. Users under 18 may browse the site and use the virtual unboxing feature but cannot make purchases.",
            },
            {
              title: "3. Mystery Box Purchases",
              content: `Each mystery box tier (Basic, Silver, Gold, Elite, Ultra) contains a randomly selected assortment of items. The number and value of items varies by tier. While we guarantee that the total retail value of items in each box meets or exceeds the purchase price, specific items cannot be requested, exchanged, or guaranteed. Item selection is powered by our weighted rarity algorithm which provides transparent odds for each tier.`,
            },
            {
              title: "4. Credits & Virtual Currency",
              content: `${SITE_NAME} Credits are a virtual currency that can be earned through daily spins, login streaks, referrals, and the online mystery box game. Credits can be used to play the online game or redeemed against future purchases. Credits have no cash value and cannot be transferred, sold, or exchanged for real money. ${SITE_NAME} reserves the right to adjust credit values and earning rates at any time.`,
            },
            {
              title: "5. Returns & Refunds",
              content: "Due to the nature of mystery boxes, all sales are final. We do not offer returns, refunds, or exchanges on opened mystery boxes. If you receive a damaged or defective item, please contact us within 48 hours of delivery via WhatsApp with photos of the damage. We will arrange a replacement for the affected item(s) only.",
            },
            {
              title: "6. Shipping & Delivery",
              content: "Orders are processed within 2-3 business days. Standard delivery takes 5-7 business days across India. Express shipping options may be available at checkout. Shipping costs are included in the box price. We are not responsible for delays caused by courier services or force majeure events.",
            },
            {
              title: "7. Online Game",
              content: `The ${SITE_NAME} Online Game is a credit-based digital experience. No real money is wagered in the online game. Digital rewards include credits, discount codes, free box vouchers, and merchandise. All digital rewards are subject to availability and the terms specified at the time of winning.`,
            },
            {
              title: "8. Fair Play & Anti-Fraud",
              content: `${SITE_NAME} reserves the right to suspend or terminate accounts that engage in fraudulent activity, including but not limited to: creating multiple accounts, manipulating the referral system, exploiting bugs or glitches, or any form of abuse. We employ monitoring systems to ensure fair play across the platform.`,
            },
            {
              title: "9. Limitation of Liability",
              content: `${SITE_NAME} is provided "as is" without warranties of any kind. We do not guarantee the availability of specific items, uninterrupted service, or specific outcomes from mystery boxes. Our total liability shall not exceed the purchase price of the relevant mystery box. We are not liable for indirect, incidental, or consequential damages.`,
            },
            {
              title: "10. Changes to Terms",
              content: `${SITE_NAME} reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the platform. Continued use of the platform after changes constitutes acceptance of the modified terms. We recommend reviewing these terms periodically.`,
            },
          ].map((section) => (
            <div
              key={section.title}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <h2 className="text-lg font-semibold text-white mb-3">
                {section.title}
              </h2>
              <p className="text-white/50 text-sm leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/30 text-xs">
            Last updated: April 2026 &bull; {SITE_NAME}
          </p>
        </div>
      </div>
    </div>
  );
}
