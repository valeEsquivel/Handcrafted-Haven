import clientPromise from "./db";

const products = [
  {
    name: "Hand-Thrown Ceramic Bowl",
    category: "pottery",
    price: 48.00,
    image: "https://picsum.photos/seed/pottery1/500/500",
    description: "A beautifully hand-thrown ceramic bowl with a warm earth glaze. Each piece is unique, reflecting the individual touch of the artisan. Perfect for serving salads, soups, or as a decorative centerpiece.",
    artisan: "Maria Santos",
    location: "Oaxaca, Mexico",
    weight: "320g",
    in_stock: true,
    rating: 4.8,
    reviews: 24,
    tags: ["ceramic", "handmade", "kitchen", "earth tones"],
    createdAt: new Date(),
  },
  {
    name: "Glazed Stoneware Vase",
    category: "pottery",
    price: 65.00,
    image: "https://picsum.photos/seed/pottery2/500/500",
    description: "A stunning glazed stoneware vase with a layered blue-to-brown drip glaze. Wheel-thrown and fired at high temperature for durability. Makes a perfect gift or home accent.",
    artisan: "James Owusu",
    location: "Accra, Ghana",
    weight: "480g",
    in_stock: true,
    rating: 4.9,
    reviews: 18,
    tags: ["stoneware", "vase", "glazed", "home decor"],
    createdAt: new Date(),
  },
  {
    name: "Copper Wire Wrapped Pendant",
    category: "jewelry",
    price: 32.00,
    image: "https://picsum.photos/seed/jewelry1/500/500",
    description: "An intricate copper wire-wrapped pendant featuring a natural labradorite stone. Handcrafted using traditional wire-wrapping techniques. Comes on an 18-inch copper chain.",
    artisan: "Amara Diallo",
    location: "Dakar, Senegal",
    weight: "15g",
    in_stock: true,
    rating: 4.7,
    reviews: 41,
    tags: ["copper", "pendant", "labradorite", "wire-wrapped"],
    createdAt: new Date(),
  },
  {
    name: "Beaded Linen Bracelet Set",
    category: "jewelry",
    price: 24.00,
    image: "https://picsum.photos/seed/jewelry2/500/500",
    description: "A set of three handmade linen and wooden bead bracelets. Earthy natural tones complement any outfit. Adjustable sizing fits most wrists.",
    artisan: "Sofia Reyes",
    location: "Lima, Peru",
    weight: "30g",
    in_stock: true,
    rating: 4.6,
    reviews: 57,
    tags: ["bracelet", "beaded", "linen", "natural", "set"],
    createdAt: new Date(),
  },
  {
    name: "Woven Wall Hanging",
    category: "textiles",
    price: 78.00,
    image: "https://picsum.photos/seed/textiles1/500/500",
    description: "A large hand-woven wall hanging using natural cotton and wool yarns in warm earthy tones. Mounted on a driftwood rod. Adds texture and warmth to any living space.",
    artisan: "Keiko Tanaka",
    location: "Kyoto, Japan",
    weight: "450g",
    in_stock: true,
    rating: 4.9,
    reviews: 33,
    tags: ["wall hanging", "woven", "cotton", "wool", "home decor"],
    createdAt: new Date(),
  },
  {
    name: "Hand-Dyed Linen Tote Bag",
    category: "textiles",
    price: 55.00,
    image: "https://picsum.photos/seed/textiles2/500/500",
    description: "A durable linen tote bag hand-dyed with natural indigo and botanical pigments. Each bag has a unique pattern from the dyeing process. Strong cotton handles. Perfect for everyday use.",
    artisan: "Priya Nair",
    location: "Jaipur, India",
    weight: "210g",
    in_stock: true,
    rating: 4.8,
    reviews: 29,
    tags: ["tote", "linen", "hand-dyed", "indigo", "eco-friendly"],
    createdAt: new Date(),
  },
  {
    name: "Live Edge Oak Serving Board",
    category: "woodcraft",
    price: 95.00,
    image: "https://picsum.photos/seed/wood1/500/500",
    description: "A stunning live edge oak serving board with natural bark edges preserved. Finished with food-safe walnut oil. Perfect for cheese boards, charcuterie, or bread serving.",
    artisan: "Henrik Larsson",
    location: "Stockholm, Sweden",
    weight: "680g",
    in_stock: true,
    rating: 5.0,
    reviews: 12,
    tags: ["oak", "serving board", "live edge", "food-safe", "kitchen"],
    createdAt: new Date(),
  },
  {
    name: "Hand-Carved Wooden Spoon Set",
    category: "woodcraft",
    price: 42.00,
    image: "https://picsum.photos/seed/wood2/500/500",
    description: "A set of three hand-carved wooden spoons made from cherry wood. Each spoon is shaped by hand using traditional carving tools. Smooth finish, lightweight, and comfortable to hold.",
    artisan: "Tomás Herrera",
    location: "Guadalajara, Mexico",
    weight: "180g",
    in_stock: false,
    rating: 4.7,
    reviews: 38,
    tags: ["spoon", "cherry wood", "carved", "kitchen", "set"],
    createdAt: new Date(),
  },
  {
    name: "Beeswax Taper Candles (Pair)",
    category: "candles",
    price: 28.00,
    image: "https://picsum.photos/seed/candle1/500/500",
    description: "A pair of hand-dipped pure beeswax taper candles. Naturally scented with a faint honey aroma. Burns cleaner and longer than paraffin. Approximately 10 inches tall.",
    artisan: "Claire Dubois",
    location: "Provence, France",
    weight: "160g",
    in_stock: true,
    rating: 4.9,
    reviews: 64,
    tags: ["beeswax", "taper", "natural", "honey scent", "pair"],
    createdAt: new Date(),
  },
  {
    name: "Soy Lavender Jar Candle",
    category: "candles",
    price: 22.00,
    image: "https://picsum.photos/seed/candle2/500/500",
    description: "A hand-poured soy wax candle scented with French lavender essential oil. Packaged in a reusable amber glass jar. Approximately 40-hour burn time. Perfect for relaxation and gifting.",
    artisan: "Nadia Kowalski",
    location: "Kraków, Poland",
    weight: "220g",
    in_stock: true,
    rating: 4.8,
    reviews: 89,
    tags: ["soy", "lavender", "jar candle", "aromatherapy", "gift"],
    createdAt: new Date(),
  },
  {
    name: "Watercolor Botanical Print",
    category: "art",
    price: 85.00,
    image: "https://picsum.photos/seed/art1/500/500",
    description: "An original watercolor painting of wild botanicals on 300gsm cold-press paper. Unframed, 8×10 inches. Each piece is one-of-a-kind, signed and dated by the artist.",
    artisan: "Yuki Mori",
    location: "Osaka, Japan",
    weight: "80g",
    in_stock: true,
    rating: 4.9,
    reviews: 15,
    tags: ["watercolor", "botanical", "original art", "painting", "wall art"],
    createdAt: new Date(),
  },
  {
    name: "Charcoal Landscape Drawing",
    category: "art",
    price: 120.00,
    image: "https://picsum.photos/seed/art2/500/500",
    description: "A detailed charcoal drawing of a mountain landscape on fine art paper. 11×14 inches, unframed. Rich tonal range achieved with traditional charcoal techniques. Ready to frame.",
    artisan: "Elias Nkosi",
    location: "Cape Town, South Africa",
    weight: "90g",
    in_stock: true,
    rating: 4.8,
    reviews: 9,
    tags: ["charcoal", "landscape", "drawing", "original art", "wall art"],
    createdAt: new Date(),
  },
];

export async function seedDatabase() {
  const client = await clientPromise;
  const db = client.db("handcrafted-haven");

  const productsCol = db.collection("products");
  const existingCount = await productsCol.countDocuments();
  if (existingCount === 0) {
    await productsCol.insertMany(products);
    console.log("✅ Products seeded!");
  } else {
    console.log("ℹ️ Products already exist, skipping seed.");
  }

  await productsCol.createIndex({ category: 1 });
  await productsCol.createIndex({ rating: -1 });
  await productsCol.createIndex({ in_stock: 1 });
  console.log("✅ Indexes created!");

  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map((c) => c.name);

  if (!collectionNames.includes("orders")) {
    await db.createCollection("orders");
    console.log("✅ Orders collection created!");
  }

  if (!collectionNames.includes("artisans")) {
    await db.createCollection("artisans");
    console.log("✅ Artisans collection created!");
  }

  console.log("🎉 Database setup complete!");
}