export interface ProductOption {
  name: string;
  values: string[];
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  bestFor: string;
  price: number | null;
  salePrice: number | null;
  onSale: boolean;
  stock: string;
  category: string;
  tags: string[];
  options: ProductOption[];
  visible: boolean;
  isInquiryOnly: boolean;
  images: string[];
}

export const products: Product[] = [
  {
    id: "baby-arrangement",
    slug: "baby-arrangement",
    title: "Baby Arrangement",
    subtitle: "Small but mighty.",
    description:
      'Our Baby Arrangement is small but mighty. Designed in signature Pollen style, this piece is perfect for desks, nightstands, coffee tables, or sending a little "thinking of you" moment. Expect a curated mix of seasonal blooms, sculptural movement, and thoughtful color stories — never filler, never generic. She\'s compact, elevated, and effortlessly cool.',
    bestFor: "Birthdays, thank-yous, first dates, just-because energy.",
    price: 50,
    salePrice: null,
    onSale: false,
    stock: "unlimited",
    category: "arrangements",
    tags: ["arrangements", "gift", "everyday", "small"],
    options: [],
    visible: true,
    isInquiryOnly: false,
    images: ["/images/products/baby-arrangement.png"],
  },
  {
    id: "signature-arrangement",
    slug: "signature-arrangement",
    title: "Signature Arrangement",
    subtitle: "Bold, artful, and unmistakably Pollen.",
    description:
      "This is our core design — bold, artful, and unmistakably Pollen. Our Signature Arrangement is a medium-to-large design featuring premium seasonal blooms, layered textures, and intentional negative space. We focus on shape, movement, and color harmony to create something that feels modern, sculptural, and alive. Each piece is one-of-a-kind, designed with sustainability and longevity in mind.",
    bestFor: "Celebrations, hosting, anniversaries, or when you want the flowers to be the moment.",
    price: 120,
    salePrice: null,
    onSale: false,
    stock: "unlimited",
    category: "arrangements",
    tags: ["signature", "arrangement", "bold", "bouquet", "nashville florist"],
    options: [],
    visible: true,
    isInquiryOnly: false,
    images: ["/images/products/signature-arrangement.png", "/images/products/signature-arrangement-2.png"],
  },
  {
    id: "xl-arrangement",
    slug: "xl-arrangement",
    title: "XL Arrangement",
    subtitle: "Go big.",
    description:
      "Our largest arrangement — designed to fill a room, anchor a table, or become the centerpiece of the moment. All the sculptural movement and bold color stories of our Signature, scaled up.",
    bestFor: "Statement pieces, large events, grand gestures.",
    price: 160,
    salePrice: null,
    onSale: false,
    stock: "unlimited",
    category: "arrangements",
    tags: ["arrangement", "xl", "large", "statement"],
    options: [],
    visible: true,
    isInquiryOnly: false,
    images: ["/images/products/xl-arrangement.png"],
  },
  {
    id: "scattered-set",
    slug: "scattered-set",
    title: "The Scattered Set",
    subtitle: "Small stems. Big energy.",
    description:
      "The Scattered Set is a curated collection of bud vases designed to shift a space without overwhelming it. Each vase holds a single stem or petite floral moment, chosen for shape, movement, and color impact. Style them down a long table. Dot them across a bar. Line them along a windowsill. They're minimal but intentional — for dinner parties, brand gatherings, or people who know the details are the whole point.",
    bestFor: "Dinner parties, brand gatherings, hosting moments where details matter.",
    price: 60,
    salePrice: null,
    onSale: false,
    stock: "unlimited",
    category: "arrangements",
    tags: ["bud vase", "set", "table", "minimal", "event"],
    options: [{ name: "Size", values: ["Set of 3", "Set of 5", "Set of 10"] }],
    visible: false,
    isInquiryOnly: false,
    images: [],
  },
  {
    id: "monthly-subscription",
    slug: "monthly-bouquet-subscription",
    title: "Monthly Bouquet Subscription",
    subtitle: "Fresh flowers, but make it a ritual.",
    description:
      "Our monthly bouquet subscription is your built-in excuse to romanticize your space — no special occasion required. Each arrangement is designed with what's in season (and what we're currently obsessed with), bringing together color, texture, and movement in a way that feels effortless but looks very put together. No two months are the same. Some will be soft and airy, others bold and a little dramatic — but all of them are unmistakably Pollen: artful, organic, and just the right amount of undone.",
    bestFor: "Yourself, or as a recurring gift. No vase included — see our arrangements if you'd like one.",
    price: null,
    salePrice: null,
    onSale: false,
    stock: "unlimited",
    category: "subscriptions",
    tags: ["subscription", "monthly", "recurring", "gift"],
    options: [],
    visible: false,
    isInquiryOnly: true,
    images: [],
  },
  {
    id: "the-pollen-bar",
    slug: "the-pollen-bar",
    title: "The Pollen Bar",
    subtitle: "Not your average flower station.",
    description:
      "The Pollen Bar is an interactive, design-forward floral experience where guests build custom bouquets from a curated selection of bold, seasonal blooms. Our team finishes each bouquet on-site, wrapped in our signature sustainable paper for a takeaway that feels intentional, artful, and anything but ordinary. Perfect for weddings, brand activations, and celebrations that deserve more than basic décor, The Pollen Bar turns flowers into a moment — styled, photographed, and remembered.",
    bestFor: "Weddings, brand activations, showers, birthdays, and events with hosts who want to curate an experience.",
    price: 1000,
    salePrice: null,
    onSale: false,
    stock: "unlimited",
    category: "events",
    tags: ["event", "wedding", "activation", "interactive", "bar", "experience"],
    options: [],
    visible: true,
    isInquiryOnly: true,
    images: ["/images/products/pollen-bar.png"],
  },
  {
    id: "bridal-bouquet",
    slug: "bridal-bouquet",
    title: "The Bridal Bouquet",
    subtitle: "Not just a bouquet — the bouquet.",
    description:
      "Designed to move with you, photographed from every angle, and remembered long after the day is over, our bridal bouquets are anything but expected. Each one is thoughtfully composed using seasonal blooms, layered textures, and intentional color stories that feel like you — elevated, effortless, and a little unforgettable. We don't do stiff or overly traditional. Think organic shapes, artful movement, and florals that feel alive in your hands.",
    bestFor: "Weddings — brides and grooms who care about the entire aesthetic.",
    price: 150,
    salePrice: null,
    onSale: false,
    stock: "unlimited",
    category: "weddings",
    tags: ["wedding", "bridal", "bouquet", "bride"],
    options: [{ name: "Size", values: ["Mini", "Standard", "Lush"] }],
    visible: true,
    isInquiryOnly: true,
    images: ["/images/products/bridal-bouquet.png"],
  },
  {
    id: "custom-concept",
    slug: "custom-concept",
    title: "Custom Concept",
    subtitle: "Have something bigger in mind? We love that.",
    description:
      "Our Custom Concept offering is for brands, events, creative collaborations, styled shoots, pop-ups, and installations. Whether you're launching a product, hosting a dinner party, designing a moment, or transforming a space — we'll create a floral story that aligns with your aesthetic and vision. This is where we push scale, color, texture, and concept. Expect mood boards, intentional sourcing, and florals that feel immersive and design-forward.",
    bestFor: "Brand activations, styled shoots, installations, events, pop-ups.",
    price: null,
    salePrice: null,
    onSale: false,
    stock: "unlimited",
    category: "events",
    tags: ["custom", "event", "brand", "installation", "concept", "collaboration"],
    options: [],
    visible: true,
    isInquiryOnly: true,
    images: [],
  },
];

export const visibleProducts = products.filter((p) => p.visible);

export const categoryLabels: Record<string, string> = {
  arrangements: "Arrangements",
  events: "Events",
  weddings: "Weddings",
  subscriptions: "Subscriptions",
};
