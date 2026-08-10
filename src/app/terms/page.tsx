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
              title: "3. Mystery Trunk Purchases",
              content: `Each mystery trunk tier (Silver, Gold, Diamond, Elite, Mega, Ultra Vault) contains a randomly selected assortment of items. The number and value of items varies by tier. While we guarantee that the total retail value of items in each trunk meets or exceeds the purchase price, specific items cannot be requested, exchanged, or guaranteed. Item selection is powered by our weighted rarity algorithm which provides transparent odds for each tier.`,
            },
            {
              title: "4. Gems & Virtual Currency",
              content: `${SITE_NAME} Gems are a virtual currency that can be earned through daily spins, login streaks, referrals, and the online mystery box game. Gems can be used to play the online game or redeemed against future purchases. Gems have no cash value and cannot be transferred, sold, or exchanged for real money. ${SITE_NAME} reserves the right to adjust gem values and earning rates at any time.`,
            },
            {
              title: "5. Returns & Refunds",
              content: "Due to the nature of mystery boxes, all sales are final. We do not offer returns, refunds, or exchanges on opened mystery boxes. If you receive a damaged or defective item, please contact us within 48 hours of delivery via email at support@cornorstoneconsulting.com with photos of the damage. We will arrange a replacement for the affected item(s) only.",
            },
            {
              title: "6. Shipping & Delivery",
              content: "Orders are processed within 2-3 business days. Standard delivery takes 5-7 business days across India. Express shipping options may be available at checkout. Shipping costs are included in the box price. We are not responsible for delays caused by courier services or force majeure events.",
            },
            {
              title: "7. Online Game",
              content: `The ${SITE_NAME} Online Game is a gem-based digital experience. No real money is wagered in the online game. Digital rewards include gems, discount codes, free box vouchers, and merchandise. All digital rewards are subject to availability and the terms specified at the time of winning.`,
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
              title: "10. Product Disclaimer",
              content: `All images, descriptions, and representations of items on ${SITE_NAME} are for illustrative purposes only and do not constitute a guarantee, warranty, or contractual commitment regarding the actual products you will receive. ${SITE_NAME} makes no representations or warranties of any kind, express or implied, regarding the accuracy, completeness, or reliability of any product images, descriptions, specifications, or availability displayed on this platform. Products received may differ from those shown in images in terms of brand, model, colour, size, specification, packaging, and overall appearance. ${SITE_NAME} reserves the sole and absolute right to substitute any item with an alternative of equal or greater retail value at its discretion, without prior notice. By purchasing a mystery trunk, you expressly acknowledge and accept that the contents are randomised and that you may receive items different from those depicted or described anywhere on the platform.`,
            },
            {
              title: "11. No Returns, Refunds, or Exchanges",
              content: `All purchases on ${SITE_NAME} are final and non-refundable. Due to the inherent nature of mystery box products, we maintain a strict no-return, no-refund, and no-exchange policy. Once a mystery trunk has been purchased, the transaction is considered complete and irreversible. This includes, without limitation: dissatisfaction with the items received, items differing from expectations or platform imagery, duplicate items across multiple purchases, items of perceived lower value than anticipated, and change of mind after purchase. Chargebacks or payment disputes initiated without valid grounds may result in immediate account suspension and potential legal action. The only exception to this policy is receipt of physically damaged or defective items, which must be reported within 48 hours of delivery with photographic evidence via our official support email, support@cornorstoneconsulting.com.`,
            },
            {
              title: "12. No Guarantee of Specific Items or Value",
              content: `${SITE_NAME} does not guarantee that any specific item, brand, product category, or value tier will be included in any mystery trunk. The rarity percentages, value ranges, and item categories displayed on the platform are approximate and provided for informational purposes only — they do not constitute a guarantee or promise of specific outcomes. Past unboxing results displayed on the platform (including community wins, featured winners, and blog content) are not indicative of future results. Each mystery trunk is independently randomised and previous outcomes have no bearing on future contents. ${SITE_NAME} reserves the right to modify item pools, rarity weights, value ranges, and available stock at any time without prior notice.`,
            },
            {
              title: "13. Intellectual Property",
              content: `All content on this platform — including but not limited to text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software — is the property of ${SITE_NAME} or its content suppliers and is protected by Indian and international copyright, trademark, and intellectual property laws. You may not reproduce, distribute, modify, create derivative works from, publicly display, or commercially exploit any content from this platform without prior written consent from ${SITE_NAME}.`,
            },
            {
              title: "14. Indemnification",
              content: `You agree to indemnify, defend, and hold harmless ${SITE_NAME}, its directors, officers, employees, agents, partners, and affiliates from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable legal fees) arising from: (a) your use of or access to the platform; (b) your violation of these Terms; (c) your violation of any third-party right, including any intellectual property or privacy right; (d) any claim that your use of the platform caused damage to a third party. This indemnification obligation shall survive the termination of your account and these Terms.`,
            },
            {
              title: "15. Governing Law & Jurisdiction",
              content: `These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms or the use of ${SITE_NAME} shall be subject to the exclusive jurisdiction of the courts located in New Delhi, India. You irrevocably waive any objection to the venue or jurisdiction of such courts. Any cause of action arising out of or related to this platform must be commenced within one (1) year after the cause of action accrues, otherwise such cause of action is permanently barred.`,
            },
            {
              title: "16. Disclaimer of Warranties",
              content: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ${SITE_NAME} AND ITS SUPPLIERS AND PARTNERS EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. ${SITE_NAME} MAKES NO WARRANTY THAT THE PLATFORM WILL MEET YOUR REQUIREMENTS, THAT THE PLATFORM WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, THAT THE RESULTS OBTAINED FROM THE USE OF THE PLATFORM WILL BE ACCURATE OR RELIABLE, OR THAT THE QUALITY OF ANY PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIAL PURCHASED OR OBTAINED THROUGH THE PLATFORM WILL MEET YOUR EXPECTATIONS. YOU EXPRESSLY UNDERSTAND AND AGREE THAT YOUR USE OF THE PLATFORM IS AT YOUR SOLE RISK.`,
            },
            {
              title: "17. Severability",
              content: `If any provision of these Terms is found to be unenforceable or invalid by a court of competent jurisdiction, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect and enforceable. The failure of ${SITE_NAME} to exercise or enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.`,
            },
            {
              title: "18. Changes to Terms",
              content: `${SITE_NAME} reserves the right to modify these Terms and Conditions at any time without prior notice. Changes will be effective immediately upon posting to the platform. Continued use of the platform after changes constitutes acceptance of the modified terms. It is your responsibility to review these terms periodically. Your continued use of the platform following the posting of revised Terms means that you accept and agree to the changes.`,
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
