export interface FAQEntry {
  id: string;
  category: string;
  /** Primary patterns — if any of these appear in the input, it's a strong match */
  patterns: string[];
  /** Individual trigger words — scored additively */
  keywords: string[];
  question: string;
  answer: string;
}

export const faqData: FAQEntry[] = [
  // ─── About MYSTERYX ──────────────────────────────────────
  {
    id: "what-is-mysteryx",
    category: "about",
    patterns: [
      "what is mysteryx", "what is this", "what's this", "what do you do",
      "what does mysteryx do", "tell me about", "what are you", "who are you",
      "what is this site", "what is this website", "what's mysteryx",
      "kya hai ye", "kya hai", "ye kya hai", "what is this app",
      "what is this platform", "explain mysteryx",
    ],
    keywords: [
      "mysteryx", "about", "explain", "what", "platform", "company", "brand",
      "website", "site", "service",
    ],
    question: "What is MYSTERYX?",
    answer:
      "MYSTERYX is India's most exciting mystery trunk platform! You pick a trunk tier, pay for it, and we deliver a sealed box packed with surprises worth MORE than what you paid. Think fashion, tech, collectibles, gaming gear, and more — you never know what you'll get until you open it. That's the thrill!",
  },
  {
    id: "how-it-works",
    category: "about",
    patterns: [
      "how does it work", "how it works", "how do i buy", "how to buy",
      "how to order", "how to get", "explain process", "how do i start",
      "how to start", "buying process", "ordering process", "what's the process",
      "how can i buy", "how can i order", "kaise kharide", "kaise order kare",
      "how do i get a trunk", "how do i get a box", "how to purchase",
      "how does this work", "walk me through", "guide me",
    ],
    keywords: [
      "how", "work", "works", "buy", "order", "purchase", "process", "step",
      "start", "begin", "guide",
    ],
    question: "How does it work?",
    answer:
      "It's dead simple!\n\n1️⃣ Pick Your Trunk — choose from six tiers (₹999 to ₹24,999)\n2️⃣ Add to Cart & Pay — quick, secure checkout\n3️⃣ We Deliver — we handpick & customize a trunk loaded with exciting stuff, delivered to your door in 7-10 days\n4️⃣ Unbox & Enjoy — tear it open and keep everything inside!\n\nEvery trunk is worth more than you pay. That's the MYSTERYX guarantee.",
  },

  // ─── Trunks & Pricing ────────────────────────────────────
  {
    id: "trunk-tiers",
    category: "pricing",
    patterns: [
      "how much", "what price", "what's the price", "prices", "pricing",
      "how much does it cost", "what does it cost", "cost of",
      "trunk tiers", "box tiers", "which trunks", "which boxes",
      "cheapest trunk", "cheapest box", "most expensive", "price list",
      "kitne ka hai", "kitna hai", "kya price hai", "price kya hai",
      "how much is", "rate", "rates",
      "silver trunk", "gold trunk", "diamond trunk", "elite trunk",
      "mega trunk", "ultra vault", "ultra trunk",
      "999", "2499", "4999", "7999", "9999", "24999",
      "what are the tiers", "different tiers", "trunk options",
    ],
    keywords: [
      "price", "cost", "much", "tier", "tiers", "trunk", "trunks", "box",
      "boxes", "rate", "rates", "cheap", "expensive", "afford", "budget",
      "silver", "gold", "diamond", "elite", "mega", "ultra", "vault",
      "₹", "rupee", "rupees", "inr",
    ],
    question: "What are the trunk tiers and prices?",
    answer:
      "We have 6 physical trunk tiers:\n\n🥈 Silver — ₹999 (worth ₹1,499+)\n🥇 Gold — ₹2,499 (worth ₹3,999+)\n💎 Diamond — ₹4,999 (worth ₹7,999+)\n👑 Elite — ₹7,999 (worth ₹12,999+)\n🔥 Mega — ₹9,999 (worth ₹16,999+)\n⚡ Ultra Vault — ₹24,999 (worth ₹39,999+)\n\nHigher tier = more items, rarer stuff, bigger value. Every trunk pays more than it costs!",
  },
  {
    id: "online-boxes",
    category: "pricing",
    patterns: [
      "online box", "virtual box", "online boxes", "virtual boxes",
      "digital box", "gem box", "online trunk", "virtual trunk",
      "open online", "open virtually", "instant open", "open instantly",
      "what are online boxes", "how do online boxes work",
      "starter box", "bronze box", "platinum box", "master box",
      "legendary box", "mythic box",
    ],
    keywords: [
      "online", "virtual", "digital", "gem box", "instant", "open online",
      "starter", "bronze", "platinum", "master", "legendary", "mythic",
    ],
    question: "What are online/virtual boxes?",
    answer:
      "Online boxes are opened instantly on the site using gems! We have 10 tiers:\n\n• Starter (99 gems) • Bronze (199) • Silver (499) • Gold (799) • Platinum (999)\n• Diamond (1,499) • Elite (1,999) • Master (2,999) • Legendary (4,999) • Mythic (7,999)\n\nWin digital rewards like gems, discount codes, free trunks, cashback, and exclusive merch. No shipping — instant gratification!",
  },
  {
    id: "best-trunk",
    category: "pricing",
    patterns: [
      "which trunk should i buy", "which one should i get", "best trunk",
      "best box", "which is best", "recommend", "suggestion",
      "which one is best", "what should i buy", "what should i get",
      "which tier", "first trunk", "first time buying", "beginner",
      "best value", "most popular", "top seller",
    ],
    keywords: [
      "best", "recommend", "suggest", "popular", "beginner", "first",
      "which", "should",
    ],
    question: "Which trunk should I buy?",
    answer:
      "Great question! Here's a quick guide:\n\n🆕 First timer? Start with Silver (₹999) — low risk, big surprises\n💪 Want more? Gold (₹2,499) gives you 4-6 items with better rarity odds\n🔥 Go big? Diamond (₹4,999) or Elite (₹7,999) for premium drops\n👑 Baller? Ultra Vault (₹24,999) — our most insane trunk with the best odds for legendary items\n\nEvery tier pays more than it costs, so you can't go wrong!",
  },

  // ─── What's Inside ───────────────────────────────────────
  {
    id: "whats-inside",
    category: "items",
    patterns: [
      "what's inside", "whats inside", "what do i get", "what will i get",
      "what can i get", "what's in the trunk", "what's in the box",
      "what items", "what kind of items", "what type of stuff",
      "what products", "what things", "kya milega", "andar kya hai",
      "what categories", "item categories",
    ],
    keywords: [
      "inside", "items", "stuff", "things", "products", "contents",
      "categories", "category", "get", "receive", "contain",
      "fashion", "tech", "collectibles", "gaming", "lifestyle",
      "sports", "experiences", "adult", "cash", "finance",
    ],
    question: "What's inside a trunk?",
    answer:
      "Every trunk is packed with surprises from 9 categories:\n\n👗 Fashion — designer kicks, streetwear, accessories\n💻 Tech — gadgets, audio gear, screens\n🎴 Collectibles — signed memorabilia, limited drops\n✨ Lifestyle — jewelry, fragrances, leather goods\n🏏 Sports — cricket, cycling, pro gear\n🎤 Experiences — VIP access, concert tickets\n🎮 Gaming — controllers, gift cards, figurines\n🔥 Adult Fun — discreetly packed, zero judgement\n💸 Cash & Finance — cash vouchers, gold, crypto\n\nNo two trunks are the same!",
  },
  {
    id: "how-many-items",
    category: "items",
    patterns: [
      "how many items", "how many things", "number of items",
      "how many products", "how much stuff", "kitne items",
    ],
    keywords: [
      "many", "number", "count", "quantity", "items",
    ],
    question: "How many items are in a trunk?",
    answer:
      "The number of items depends on the tier:\n\n🥈 Silver — 3 to 5 items\n🥇 Gold — 4 to 6 items\n💎 Diamond — 5 to 7 items\n👑 Elite — 6 to 8 items\n🔥 Mega — 7 to 9 items\n⚡ Ultra Vault — 8 to 10 items\n\nHigher tiers = more items AND better rarity odds!",
  },

  // ─── Shipping & Delivery ─────────────────────────────────
  {
    id: "shipping",
    category: "shipping",
    patterns: [
      "how long does delivery take", "how long does shipping take",
      "when will i get", "when will it arrive", "when will it come",
      "when will my order arrive", "delivery time", "shipping time",
      "how many days", "kitne din", "kab milega", "kab aayega",
      "where is my order", "where is my trunk", "track my order",
      "order status", "shipping status", "has it shipped",
      "delivery date", "estimated delivery",
    ],
    keywords: [
      "shipping", "delivery", "deliver", "ship", "arrive", "arrive",
      "long", "days", "time", "track", "tracking", "dispatch",
      "courier", "order", "status", "when",
    ],
    question: "How long does delivery take?",
    answer:
      "Delivery takes 7-10 days — but it's worth the wait! Every trunk is handpicked and customized just for you. Shipping is FREE on all orders. Once your trunk ships, you'll get a tracking link via email/SMS.\n\nTo track your existing order, check your Dashboard for real-time updates!",
  },
  {
    id: "free-shipping",
    category: "shipping",
    patterns: [
      "is shipping free", "free shipping", "shipping cost",
      "shipping charges", "delivery charges", "delivery fee",
      "any extra charge", "hidden charges", "hidden fees",
      "additional cost", "extra cost",
    ],
    keywords: [
      "free", "shipping", "charge", "charges", "fee", "fees",
      "extra", "hidden", "additional",
    ],
    question: "Is shipping free?",
    answer:
      "Yes! Shipping is 100% free on all trunks. The price you see is the price you pay — no hidden fees, no surprises (except the good kind inside the trunk 😉).",
  },
  {
    id: "location",
    category: "shipping",
    patterns: [
      "do you deliver outside india", "international shipping",
      "deliver to usa", "deliver to uk", "deliver abroad",
      "outside india", "other countries", "which countries",
      "delivery locations", "where do you deliver", "delivery area",
      "my city", "my pin code", "my pincode", "available in my city",
      "do you deliver to", "can you deliver to",
    ],
    keywords: [
      "india", "international", "country", "countries", "abroad",
      "location", "city", "pincode", "area", "deliver to",
    ],
    question: "Do you deliver outside India?",
    answer:
      "Currently, we deliver across India only — all pin codes covered! We're working on expanding internationally soon. Stay tuned and follow us for updates.",
  },

  // ─── Returns & Refunds ───────────────────────────────────
  {
    id: "returns",
    category: "returns",
    patterns: [
      "return policy", "refund policy", "can i return", "can i get refund",
      "money back", "want refund", "want my money back",
      "cancel order", "cancel my order", "cancellation",
      "exchange", "can i exchange", "damaged item", "broken item",
      "wrong item", "defective", "item broken", "received damaged",
      "not satisfied", "don't like", "didn't like",
      "paisa wapas", "return kaise kare",
    ],
    keywords: [
      "return", "refund", "exchange", "cancel", "cancellation",
      "money back", "damaged", "broken", "wrong", "defective",
      "complaint", "issue", "problem", "dissatisfied",
    ],
    question: "What's the return/refund policy?",
    answer:
      "All sales are final — that's the nature of mystery boxes! But we've got you covered on quality:\n\n📦 Received a damaged/defective item? Report within 48 hours via WhatsApp with photos\n🔄 We'll replace or resolve it — guaranteed\n📱 WhatsApp: +91 98765 43210\n\nWe take quality seriously. Every trunk is packed with care!",
  },

  // ─── Gems System ─────────────────────────────────────────
  {
    id: "gems-what",
    category: "gems",
    patterns: [
      "what are gems", "what is gems", "how do gems work",
      "how gems work", "gem system", "explain gems",
      "how to earn gems", "how to get gems", "how do i earn gems",
      "how do i get gems", "gems kaise milte hain",
      "tell me about gems", "gem currency",
    ],
    keywords: [
      "gems", "gem", "currency", "points", "earn", "coins",
    ],
    question: "What are gems and how do I earn them?",
    answer:
      "Gems are MYSTERYX's in-app currency! Here's how to earn them:\n\n🎡 Spin the Wheel — costs 21 gems, win up to 500+\n📅 Daily Login — streak rewards give up to 150 gems\n🎁 Welcome Bonus — new users get free gems\n🛒 Purchases — earn gems with every trunk order\n🎯 Secret Box — find hidden easter eggs on the site\n\nSpend gems on online boxes, the gem store, and exclusive deals. Note: gems have no cash value and can't be transferred.",
  },
  {
    id: "gems-spend",
    category: "gems",
    patterns: [
      "how to spend gems", "how to use gems", "where to spend gems",
      "where to use gems", "what can i buy with gems", "gem store",
      "what do gems do", "gems ka kya kare", "redeem gems",
      "convert gems", "gems to money", "gems to cash",
    ],
    keywords: [
      "spend", "use", "redeem", "convert", "store", "buy with gems",
    ],
    question: "How do I spend gems?",
    answer:
      "You can spend gems on:\n\n🎰 Online Boxes — open instantly for digital rewards (99-7,999 gems)\n🏪 Gem Store — exclusive items, discounts, and power-ups\n🎡 Spin Wheel — 21 gems per spin for prizes\n\nGems convert at a 60% rate (e.g., 100 gems ≈ ₹60 in value). They have no cash value and can't be sold or transferred.",
  },

  // ─── Spin Wheel ──────────────────────────────────────────
  {
    id: "spin-wheel",
    category: "spin",
    patterns: [
      "spin wheel", "spin the wheel", "lucky wheel", "how to spin",
      "spinning wheel", "how does spin work", "spin page",
      "spin cost", "how much to spin", "spin prize", "spin prizes",
      "what can i win spinning", "wheel prizes",
    ],
    keywords: [
      "spin", "wheel", "lucky", "spinning", "rotate",
    ],
    question: "How does the spin wheel work?",
    answer:
      "The Spin Wheel costs 21 gems per spin — no limit on spins!\n\nPrizes include:\n• 50, 100, 200, or 500 Gems\n• Free Silver Trunk 🎁\n• 2x Gem Boost\n• 10% Discount Code\n• Better luck next time!\n\nHead to the Spin page from the navigation bar and try your luck! 🎡",
  },

  // ─── Daily Rewards ───────────────────────────────────────
  {
    id: "daily-rewards",
    category: "rewards",
    patterns: [
      "daily reward", "daily rewards", "daily bonus", "daily login",
      "login streak", "login rewards", "daily check in",
      "check in rewards", "streak rewards", "streak bonus",
      "what do i get for logging in", "login daily",
    ],
    keywords: [
      "daily", "streak", "login", "check in", "checkin", "reward",
    ],
    question: "How do daily rewards work?",
    answer:
      "Log in every day to earn rewards! Your streak builds up:\n\n• Day 1: 10 gems\n• Day 3: 25 gems\n• Day 5: 50 gems\n• Day 7: 100 gems + bonus\n\nMiss a day and the streak resets. Keep it going for the best rewards! Check your Dashboard to claim daily rewards.",
  },

  // ─── Odds & Rarity ───────────────────────────────────────
  {
    id: "odds",
    category: "trust",
    patterns: [
      "what are the odds", "rarity odds", "drop rates", "drop rate",
      "chance of getting", "probability", "chances of winning",
      "is it rigged", "are the odds fair", "how rare",
      "common rare epic legendary", "legendary chance",
      "what rarity", "rarity tiers", "rarity system", "loot odds",
    ],
    keywords: [
      "odds", "chance", "chances", "probability", "rarity", "rare",
      "epic", "legendary", "common", "rigged", "fair", "drop",
      "rate", "luck", "lucky",
    ],
    question: "What are the odds/rarity chances?",
    answer:
      "We're fully transparent! Each item has a rarity tier:\n\n🟢 Common • 🔵 Rare • 🟣 Epic • 🟡 Legendary\n\nOdds vary by trunk tier — here are the Legendary chances:\n• Silver: 0.5% • Gold: 3% • Diamond: 7%\n• Elite: 13% • Mega: 20% • Ultra: 25%\n\nHigher-priced trunks have MUCH better odds for rare and legendary items. Full breakdown on our blog!",
  },

  // ─── Trust & Legitimacy ──────────────────────────────────
  {
    id: "legit",
    category: "trust",
    patterns: [
      "is this legit", "is it legit", "is this real", "is it real",
      "is this a scam", "is it scam", "are you scam", "scam hai kya",
      "can i trust", "is it safe", "is this safe", "is it genuine",
      "fraud", "fake", "trustworthy", "reliable",
      "will i actually get items", "will i actually receive",
      "is this genuine", "legit hai kya",
    ],
    keywords: [
      "scam", "legit", "legitimate", "real", "fake", "trust", "safe",
      "fraud", "genuine", "reliable", "trustworthy", "honest",
    ],
    question: "Is MYSTERYX legit? Can I trust you?",
    answer:
      "100% legit! Here's our word:\n\n🔒 Sealed Tight — trunks are randomized and sealed, untouched until you crack them\n💰 Always Pays More — items inside are ALWAYS worth more than what you paid\n🚀 Real Delivery — physical trunks shipped to your door in 7-10 days\n📱 Real Support — reach us anytime on WhatsApp\n👥 Real Community — check our community wall and winner highlights\n\nThousands of trunks delivered. Real people, real unboxings!",
  },

  // ─── Payment ─────────────────────────────────────────────
  {
    id: "payment",
    category: "payment",
    patterns: [
      "payment methods", "how to pay", "how do i pay", "payment options",
      "can i pay with", "do you accept", "upi payment", "card payment",
      "net banking", "wallet payment", "paytm", "gpay", "phonepe",
      "credit card", "debit card", "visa", "mastercard",
      "kaise pay kare", "payment kaise kare", "online payment",
      "cod", "cash on delivery",
    ],
    keywords: [
      "payment", "pay", "upi", "card", "credit", "debit", "banking",
      "wallet", "paytm", "gpay", "phonepe", "razorpay", "cod", "cash",
    ],
    question: "What payment methods do you accept?",
    answer:
      "We accept all major payment methods:\n\n💳 Credit & Debit Cards (Visa, Mastercard, Rupay)\n📱 UPI (GPay, PhonePe, Paytm, etc.)\n🏦 Net Banking\n💰 Digital Wallets\n\nAll payments are secure and processed through trusted gateways. You'll get an instant confirmation after checkout!",
  },

  // ─── Age Requirement ─────────────────────────────────────
  {
    id: "age",
    category: "policy",
    patterns: [
      "age requirement", "age limit", "how old do i have to be",
      "minimum age", "can kids buy", "can children buy",
      "is it for kids", "18 plus", "18+", "am i old enough",
      "underage", "minor",
    ],
    keywords: [
      "age", "old", "minor", "underage", "kid", "kids", "children",
      "child", "18", "adult",
    ],
    question: "Is there an age requirement?",
    answer:
      "Yes — you must be 18 or older to purchase trunks on MYSTERYX. This is because some trunks may contain age-restricted items. By placing an order, you confirm you meet this requirement.",
  },

  // ─── Contact ─────────────────────────────────────────────
  {
    id: "contact",
    category: "support",
    patterns: [
      "how to contact", "how do i contact", "contact support",
      "customer service", "customer support", "talk to someone",
      "talk to human", "talk to a person", "speak to someone",
      "need help", "i need help", "contact number", "phone number",
      "email address", "whatsapp number", "call you",
      "support team", "help me", "connect with",
    ],
    keywords: [
      "contact", "support", "help", "reach", "phone", "email",
      "whatsapp", "call", "number", "human", "person", "agent",
      "team", "service",
    ],
    question: "How do I contact support?",
    answer:
      "The fastest way to reach us is WhatsApp!\n\n📱 WhatsApp: +91 98765 43210\n⏰ We usually reply within a few hours\n\nFor order issues, have your order details ready and we'll help you out ASAP! You can also use the 'Talk to a human' option right here in this chat.",
  },

  // ─── Value Guarantee ─────────────────────────────────────
  {
    id: "value",
    category: "trust",
    patterns: [
      "is it worth it", "is it worth", "worth the money",
      "worth buying", "value for money", "money's worth",
      "do i get my money", "will i get value", "guaranteed value",
      "paisa vasool", "value guarantee",
    ],
    keywords: [
      "worth", "value", "guarantee", "guaranteed", "money",
    ],
    question: "Is it worth the money?",
    answer:
      "Always! Every trunk is guaranteed to contain items worth MORE than what you paid. That's our #1 promise:\n\n🥈 ₹999 Silver → ₹1,499+ worth of items\n🥇 ₹2,499 Gold → ₹3,999+ worth\n💎 ₹4,999 Diamond → ₹7,999+ worth\n👑 ₹7,999 Elite → ₹12,999+ worth\n🔥 ₹9,999 Mega → ₹16,999+ worth\n⚡ ₹24,999 Ultra → ₹39,999+ worth\n\nYou literally can't lose!",
  },

  // ─── Customization ───────────────────────────────────────
  {
    id: "customization",
    category: "about",
    patterns: [
      "can i choose", "can i pick", "can i select", "customize",
      "customise", "personalize", "personalise", "choose items",
      "pick items", "select items", "specific items", "choose what i get",
      "can i decide", "preference",
    ],
    keywords: [
      "choose", "pick", "select", "customize", "customise",
      "personalize", "preference", "specific",
    ],
    question: "Can I customize my trunk?",
    answer:
      "Not exactly — the mystery is the whole point! However, every trunk is handpicked and curated with care. We mix items across categories to make sure there's something exciting for everyone. The surprise is what makes it special!\n\nIf you have specific preferences, reach out on WhatsApp and we'll do our best.",
  },

  // ─── Gift ────────────────────────────────────────────────
  {
    id: "gift",
    category: "about",
    patterns: [
      "gift a trunk", "gift a box", "buy for someone", "buy for friend",
      "birthday gift", "gifting", "send as gift", "gift option",
      "can i gift", "surprise someone", "present for",
    ],
    keywords: [
      "gift", "gifting", "birthday", "present", "surprise", "friend",
      "someone", "send to",
    ],
    question: "Can I gift a trunk to someone?",
    answer:
      "Absolutely! Mystery trunks make the PERFECT gift 🎁\n\nJust enter the recipient's shipping address at checkout — we'll deliver it straight to them. Imagine their face when they open a box full of surprises they weren't expecting!\n\nPro tip: The Gold or Diamond tier makes an amazing birthday gift.",
  },

  // ─── Dashboard ───────────────────────────────────────────
  {
    id: "dashboard",
    category: "account",
    patterns: [
      "my dashboard", "my account", "my orders", "my order",
      "order history", "track my order", "order tracking",
      "my gems", "gem balance", "my profile", "account settings",
      "where are my orders", "check my order",
    ],
    keywords: [
      "dashboard", "account", "profile", "orders", "history",
      "tracking", "balance", "settings",
    ],
    question: "Where can I see my orders and gems?",
    answer:
      "Head to your Dashboard! You'll find:\n\n📦 Order history & tracking\n💎 Gem balance & transaction history\n🏆 Your unboxing stats\n📅 Daily reward streaks\n🎯 Achievement badges\n\nJust click 'Dashboard' in the navigation bar at the top.",
  },

  // ─── Blog ────────────────────────────────────────────────
  {
    id: "blog",
    category: "about",
    patterns: [
      "do you have a blog", "blog", "articles", "read more",
      "unboxing stories", "tips and tricks", "more info",
      "learn more", "read about",
    ],
    keywords: [
      "blog", "article", "articles", "read", "tips", "guide", "story",
      "stories", "unboxing", "learn",
    ],
    question: "Do you have a blog?",
    answer:
      "Yes! Our blog has unboxing stories, tips to maximize your trunk value, full transparency on our loot system, and community highlights. Check it out by clicking 'Blog' in the navigation bar!",
  },

  // ─── Secret Box ──────────────────────────────────────────
  {
    id: "secret-box",
    category: "rewards",
    patterns: [
      "secret box", "easter egg", "hidden feature", "hidden gem",
      "secret feature", "hidden reward", "bonus reward",
      "what's the secret", "any secrets", "hidden stuff",
    ],
    keywords: [
      "secret", "easter", "hidden", "bonus", "surprise",
    ],
    question: "What's the Secret Box?",
    answer:
      "There's a hidden Secret Box easter egg on the site! If you find it, you can crack it open for bonus gems. It resets every 24 hours, so keep your eyes peeled. Hint: explore the pages carefully... 👀",
  },

  // ─── Welcome Bonus ───────────────────────────────────────
  {
    id: "welcome-bonus",
    category: "rewards",
    patterns: [
      "welcome bonus", "new user bonus", "sign up bonus",
      "joining bonus", "first time bonus", "registration bonus",
      "free gems for new user", "do i get free gems",
      "how to sign up", "how to register", "create account",
    ],
    keywords: [
      "welcome", "new", "sign up", "signup", "register", "join",
      "first time", "free gems", "bonus", "create account",
    ],
    question: "Do new users get anything special?",
    answer:
      "Yes! New users get a Welcome Bonus — free gems to get you started! Use them to:\n\n🎡 Spin the wheel for prizes\n🎰 Open online boxes instantly\n🏪 Shop the gem store\n\nJust sign up and your bonus is credited automatically!",
  },

  // ─── Misc ────────────────────────────────────────────────
  {
    id: "multiple-trunks",
    category: "about",
    patterns: [
      "can i buy more than one", "buy multiple", "order multiple",
      "more than one trunk", "two trunks", "multiple boxes",
      "bulk order", "buy many",
    ],
    keywords: [
      "multiple", "many", "more than one", "several", "bulk", "two",
      "three", "few",
    ],
    question: "Can I buy more than one trunk?",
    answer:
      "Of course! Buy as many trunks as you want — same tier or mix different tiers. Each trunk is independently packed with unique items, so no two will be the same. Stack them up and unbox them all! 🔥",
  },
  {
    id: "safety-secure",
    category: "trust",
    patterns: [
      "is my payment safe", "is payment secure", "secure payment",
      "is my data safe", "privacy", "data protection",
      "will you steal my data", "is it secure",
    ],
    keywords: [
      "secure", "safety", "safe", "privacy", "data", "protection",
      "ssl", "encrypted",
    ],
    question: "Is my payment and data safe?",
    answer:
      "Absolutely! Your security is our top priority:\n\n🔐 SSL encrypted payments\n💳 Processed through trusted payment gateways\n🛡️ We never store your card details\n🔒 Your data is kept private and secure\n\nShop with confidence!",
  },
];
