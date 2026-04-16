import bcrypt from "bcryptjs";
import clientPromise from "./db";

const artisans = [
  {
    artisanKey: "vesquivel",
    name: "Valeria Esquivel",
    country: "El Salvador",
    nickname: "Chiky",
    image: "/images/Esquivel.jpg",
    birthday: "11/03/1999",
    rating: "5",
    reviews: "90",
    email: "vesquivelorellana@byupathway.edu",
    categories: ["Art & Paintings", "Textiles"],
    description: "A visual storyteller working across painting, illustration, and textiles, weaving narratives through color, pattern, and composition. Their art captures moments, emotions, and identities in ways that feel both intimate and universal.",
  },
  {
    artisanKey: "yeva04",
    name: "Favour Ojobor",
    country: "Nigeria",
    nickname: "Yeva",
    image: "/images/Yeva.jpg",
    birthday: "01/05/2005",
    rating: "5",
    reviews: "87",
    email: "fojobor@byupathway.edu",
    categories: ["Textiles", "Candles & Soaps", "Art & Paintings"],
    description: "A creator who explores jewelry, ceramics, and candles as extensions of personal expression, crafting pieces that engage both the senses and the soul. Each creation reflects a balance between beauty, intention, and storytelling.",
  },
  {
    artisanKey: "chinedu-k-amuji",
    name: "Chinedu Kingsley Amuji",
    country: "Nigeria",
    nickname: "Amuji",
    image: "/images/Chinedu.jpg",
    birthday: "21/09/1994",
    rating: "5",
    reviews: "113",
    email: "camuji@byupathway.edu",
    categories: ["Textiles", "Woodcraft", "Art & Paintings"],
    description: "A multidisciplinary artist who moves seamlessly between textiles, woodcraft, and visual art, transforming raw materials into expressive pieces. Their work blends tradition and experimentation, creating a unique dialogue between texture, form, and emotion.",
  },
  {
    artisanKey: "pzimondi",
    name: "Pastor Munashe Zimondi",
    country: "Zimbabwe",
    nickname: "Zimondi",
    image: "/images/Pastor.jpg",
    birthday: "19/11/1992",
    rating: "5",
    reviews: "66",
    email: "pzimondi@byupathway.edu",
    categories: ["Art & Paintings", "Jewelry", "Textiles", "Woodcraft", "Candles & Soaps"],
    description: "An emerging multidisciplinary artist exploring different mediums—from visual art to handcrafted pieces—constantly evolving their voice and style. Each creation is a step in their journey of discovery and expression.",
  },
  {
    artisanKey: "eddiedhin",
    name: "Kironde T Edward",
    country: "Nigeria",
    nickname: "Eddie",
    image: "/images/Edward.jpg",
    birthday: "30/06/2002",
    rating: "5",
    reviews: "120",
    email: "ksekirangi@byupathway.edu",
    categories: ["Jewelry", "Art & Paintings", "Candles & Soaps"],
    description: "A versatile artist blending jewelry, painting, and handmade goods to create meaningful objects that connect with everyday life. Their work reflects a deep sense of identity, creativity, and attention to detail.",
  },
];

const categories = [
  { slug: "pottery",   label: "Pottery & Ceramics", icon: "Hammer",   description: "Hand-thrown and sculpted ceramics from skilled potters worldwide." },
  { slug: "jewelry",   label: "Jewelry",             icon: "Gem",      description: "Handcrafted necklaces, bracelets, and earrings using natural materials." },
  { slug: "textiles",  label: "Textiles",            icon: "Scissors", description: "Woven, dyed, and stitched fabric art and accessories." },
  { slug: "woodcraft", label: "Woodcraft",           icon: "Trees",    description: "Hand-carved and shaped wooden goods for home and kitchen." },
  { slug: "candles",   label: "Candles & Soaps",     icon: "Flame",    description: "Natural beeswax and soy candles with botanical scents." },
  { slug: "art",       label: "Art & Paintings",     icon: "Palette",  description: "Original paintings, drawings, and prints by independent artists." },
];

const products = [
  {
    name: "Hand-Thrown Ceramic Bowl",
    category: "pottery",
    price: 48.00,
    image: "/images/Hand-Thrown-Ceramic-Bowl.jpg",
    description: "A beautifully hand-thrown ceramic bowl with a warm earth glaze. Each piece is unique, reflecting the individual touch of the artisan. Perfect for serving salads, soups, or as a decorative centerpiece.",
    artisan: "Maria Santos",
    location: "Oaxaca, Mexico",
    weight: "320g",
    in_stock: true,
    rating: 4.8,
    reviews: 24,
    tags: ["ceramic", "handmade", "kitchen", "earth tones"],
    artisanKey: "vesquivel",
    createdAt: new Date(),
  },
  {
    name: "Glazed Stoneware Vase",
    category: "pottery",
    price: 65.00,
    image: "/images/Glazed-Stoneware-Vase.jpg",
    description: "A stunning glazed stoneware vase with a layered blue-to-brown drip glaze. Wheel-thrown and fired at high temperature for durability. Makes a perfect gift or home accent.",
    artisan: "James Owusu",
    location: "Accra, Ghana",
    weight: "480g",
    in_stock: true,
    rating: 4.9,
    reviews: 18,
    tags: ["stoneware", "vase", "glazed", "home decor"],
    artisanKey: "chinedu-k-amuji",
    createdAt: new Date(),
  },
  {
    name: "Copper Wire Wrapped Pendant",
    category: "jewelry",
    price: 32.00,
    image: "/images/Copper-Wire-Wrapped-Pendant.jpg",
    description: "An intricate copper wire-wrapped pendant featuring a natural labradorite stone. Handcrafted using traditional wire-wrapping techniques. Comes on an 18-inch copper chain.",
    artisan: "Amara Diallo",
    location: "Dakar, Senegal",
    weight: "15g",
    in_stock: true,
    rating: 4.7,
    reviews: 41,
    tags: ["copper", "pendant", "labradorite", "wire-wrapped"],
    artisanKey: "yeva04",
    createdAt: new Date(),
  },
  {
    name: "Beaded Linen Bracelet Set",
    category: "jewelry",
    price: 24.00,
    image: "/images/Beaded_Linen_Bracelet_Set.webp",
    description: "A set of three handmade linen and wooden bead bracelets. Earthy natural tones complement any outfit. Adjustable sizing fits most wrists.",
    artisan: "Sofia Reyes",
    location: "Lima, Peru",
    weight: "30g",
    in_stock: true,
    rating: 4.6,
    reviews: 57,
    tags: ["bracelet", "beaded", "linen", "natural", "set"],
    artisanKey: "pzimondi",
    createdAt: new Date(),
  },
  {
    name: "Woven Wall Hanging",
    category: "textiles",
    price: 78.00,
    image: "/images/Woven_Wall_Hanging.webp",
    description: "A large hand-woven wall hanging using natural cotton and wool yarns in warm earthy tones. Mounted on a driftwood rod. Adds texture and warmth to any living space.",
    artisan: "Keiko Tanaka",
    location: "Kyoto, Japan",
    weight: "450g",
    in_stock: true,
    rating: 4.9,
    reviews: 33,
    tags: ["wall hanging", "woven", "cotton", "wool", "home decor"],
    artisanKey: "vesquivel",
    createdAt: new Date(),
  },
  {
    name: "Hand-Dyed Linen Tote Bag",
    category: "textiles",
    price: 55.00,
    image: "/images/Hand_DyedTote_Bag.webp",
    description: "A durable linen tote bag hand-dyed with natural indigo and botanical pigments. Each bag has a unique pattern from the dyeing process. Strong cotton handles. Perfect for everyday use.",
    artisan: "Priya Nair",
    location: "Jaipur, India",
    weight: "210g",
    in_stock: true,
    rating: 4.8,
    reviews: 29,
    tags: ["tote", "linen", "hand-dyed", "indigo", "eco-friendly"],
    artisanKey: "pzimondi",
    createdAt: new Date(),
  },
  {
    name: "Live Edge Oak Serving Board",
    category: "woodcraft",
    price: 95.00,
    image: "/images/LiveEgdeOakBoard.jpg",
    description: "A stunning live edge oak serving board with natural bark edges preserved. Finished with food-safe walnut oil. Perfect for cheese boards, charcuterie, or bread serving.",
    artisan: "Henrik Larsson",
    location: "Stockholm, Sweden",
    weight: "680g",
    in_stock: true,
    rating: 5.0,
    reviews: 12,
    tags: ["oak", "serving board", "live edge", "food-safe", "kitchen"],
    artisanKey: "chinedu-k-amuji",
    createdAt: new Date(),
  },
  {
    name: "Hand-Carved Wooden Spoon Set",
    category: "woodcraft",
    price: 42.00,
    image: "/images/Hand-Carved-Wooden-Spoon-Set.jpg",
    description: "A set of three hand-carved wooden spoons made from cherry wood. Each spoon is shaped by hand using traditional carving tools. Smooth finish, lightweight, and comfortable to hold.",
    artisan: "Tomás Herrera",
    location: "Guadalajara, Mexico",
    weight: "180g",
    in_stock: false,
    rating: 4.7,
    reviews: 38,
    tags: ["spoon", "cherry wood", "carved", "kitchen", "set"],
    artisanKey: "chinedu-k-amuji",
    createdAt: new Date(),
  },
  {
    name: "Beeswax Taper Candles (Pair)",
    category: "candles",
    price: 28.00,
    image: "/images/Beeswax_Taper_Candles_(Pair).webp",
    description: "A pair of hand-dipped pure beeswax taper candles. Naturally scented with a faint honey aroma. Burns cleaner and longer than paraffin. Approximately 10 inches tall.",
    artisan: "Claire Dubois",
    location: "Provence, France",
    weight: "160g",
    in_stock: true,
    rating: 4.9,
    reviews: 64,
    tags: ["beeswax", "taper", "natural", "honey scent", "pair"],
    artisanKey: "eddiedhin",
    createdAt: new Date(),
  },
  {
    name: "Soy Lavender Jar Candle",
    category: "candles",
    price: 22.00,
    image: "/images/Soy_Lavender_Jar_Candle.webp",
    description: "A hand-poured soy wax candle scented with French lavender essential oil. Packaged in a reusable amber glass jar. Approximately 40-hour burn time. Perfect for relaxation and gifting.",
    artisan: "Nadia Kowalski",
    location: "Kraków, Poland",
    weight: "220g",
    in_stock: true,
    rating: 4.8,
    reviews: 89,
    tags: ["soy", "lavender", "jar candle", "aromatherapy", "gift"],
    artisanKey: "eddiedhin",
    createdAt: new Date(),
  },
  {
    name: "Watercolor Botanical Print",
    category: "art",
    price: 85.00,
    image: "/images/Watercolor_Botanical_print.jpg",
    description: "An original watercolor painting of wild botanicals on 300gsm cold-press paper. Unframed, 8×10 inches. Each piece is one-of-a-kind, signed and dated by the artist.",
    artisan: "Yuki Mori",
    location: "Osaka, Japan",
    weight: "80g",
    in_stock: true,
    rating: 4.9,
    reviews: 15,
    tags: ["watercolor", "botanical", "original art", "painting", "wall art"],
    artisanKey: "yeva04",
    createdAt: new Date(),
  },
  {
    name: "Charcoal Landscape Drawing",
    category: "art",
    price: 120.00,
    image: "/images/Charcoal_Landscape_Drawing.webp",
    description: "A detailed charcoal drawing of a mountain landscape on fine art paper. 11×14 inches, unframed. Rich tonal range achieved with traditional charcoal techniques. Ready to frame.",
    artisan: "Elias Nkosi",
    location: "Cape Town, South Africa",
    weight: "90g",
    in_stock: true,
    rating: 4.8,
    reviews: 9,
    tags: ["charcoal", "landscape", "drawing", "original art", "wall art"],
    artisanKey: "yeva04",
    createdAt: new Date(),
  },
];

export async function seedDatabase() {
  const client = await clientPromise;
  const db = client.db("handcrafted-haven");

  // Seed products
  const productsCol = db.collection("products");
  const productsCount = await productsCol.countDocuments();
  if (productsCount === 0) {
    await productsCol.insertMany(products);
    console.log("✅ Products seeded!");
  } else {
    console.log("ℹ️ Products already exist, skipping.");
  }
  await productsCol.createIndex({ category: 1 });
  await productsCol.createIndex({ artisanKey: 1 });
  await productsCol.createIndex({ rating: -1 });
  await productsCol.createIndex({ in_stock: 1 });

  // Seed artisans
  const artisansCol = db.collection("artisans");
  const artisansCount = await artisansCol.countDocuments();
  if (artisansCount === 0) {
    await artisansCol.insertMany(artisans);
    console.log("✅ Artisans seeded!");
  } else {
    console.log("ℹ️ Artisans already exist, skipping.");
  }
  await artisansCol.createIndex({ artisanKey: 1 });

  // Seed categories
  const categoriesCol = db.collection("categories");
  const categoriesCount = await categoriesCol.countDocuments();
  if (categoriesCount === 0) {
    await categoriesCol.insertMany(categories);
    console.log("✅ Categories seeded!");
  } else {
    console.log("ℹ️ Categories already exist, skipping.");
  }
  await categoriesCol.createIndex({ slug: 1 });

  // Seed users
  const usersCol = db.collection("users");
  const usersCount = await usersCol.countDocuments();
  if (usersCount === 0) {
    const password = await bcrypt.hash("password123", 12);
    await usersCol.insertMany([
      { name: "Valeria Esquivel", email: "vesquivelorellana@byupathway.edu", password, role: "artisan", artisanKey: "vesquivel", createdAt: new Date() },
      { name: "Favour Ojobor", email: "fojobor@byupathway.edu", password, role: "artisan", artisanKey: "yeva04", createdAt: new Date() },
      { name: "Chinedu Kingsley Amuji", email: "camuji@byupathway.edu", password, role: "artisan", artisanKey: "chinedu-k-amuji", createdAt: new Date() },
      { name: "Pastor Munashe Zimondi", email: "pzimondi@byupathway.edu", password, role: "artisan", artisanKey: "pzimondi", createdAt: new Date() },
      { name: "Kironde T Edward", email: "ksekirangi@byupathway.edu", password, role: "artisan", artisanKey: "eddiedhin", createdAt: new Date() },
    ]);
    console.log("✅ Users seeded!");
  } else {
    console.log("ℹ️ Users already exist, skipping.");
  }
  await usersCol.createIndex({ email: 1 }, { unique: true });

  console.log("🎉 Database setup complete!");
}