-- Handcrafted Haven Database Schema

CREATE TABLE IF NOT EXISTS artisans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  bio TEXT,
  location VARCHAR(100),
  avatar VARCHAR(255),
  specialty VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('pottery','jewelry','textiles','woodcraft','candles','art')),
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR(255),
  description TEXT,
  artisan_name VARCHAR(100),
  artisan_location VARCHAR(100),
  weight VARCHAR(20),
  in_stock BOOLEAN DEFAULT TRUE,
  rating DECIMAL(3,1) DEFAULT 0,
  reviews_count INT DEFAULT 0,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  zip VARCHAR(20),
  subtotal DECIMAL(10,2),
  shipping DECIMAL(10,2),
  total DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id) ON DELETE CASCADE,
  product_id INT REFERENCES products(id),
  product_name VARCHAR(255),
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

-- Seed data
INSERT INTO products (name, category, price, image, description, artisan_name, artisan_location, weight, in_stock, rating, reviews_count, tags) VALUES
('Hand-Thrown Ceramic Bowl', 'pottery', 48.00, 'https://picsum.photos/seed/pottery1/500/500', 'A beautifully hand-thrown ceramic bowl with a warm earth glaze.', 'Maria Santos', 'Oaxaca, Mexico', '320g', true, 4.8, 24, ARRAY['ceramic','handmade','kitchen']),
('Glazed Stoneware Vase', 'pottery', 65.00, 'https://picsum.photos/seed/pottery2/500/500', 'A stunning glazed stoneware vase with a layered blue-to-brown drip glaze.', 'James Owusu', 'Accra, Ghana', '480g', true, 4.9, 18, ARRAY['stoneware','vase','home decor']),
('Copper Wire Wrapped Pendant', 'jewelry', 32.00, 'https://picsum.photos/seed/jewelry1/500/500', 'An intricate copper wire-wrapped pendant featuring a natural labradorite stone.', 'Amara Diallo', 'Dakar, Senegal', '15g', true, 4.7, 41, ARRAY['copper','pendant','wire-wrapped']),
('Beaded Linen Bracelet Set', 'jewelry', 24.00, 'https://picsum.photos/seed/jewelry2/500/500', 'A set of three handmade linen and wooden bead bracelets.', 'Sofia Reyes', 'Lima, Peru', '30g', true, 4.6, 57, ARRAY['bracelet','beaded','linen']),
('Woven Wall Hanging', 'textiles', 78.00, 'https://picsum.photos/seed/textiles1/500/500', 'A large hand-woven wall hanging using natural cotton and wool yarns.', 'Keiko Tanaka', 'Kyoto, Japan', '450g', true, 4.9, 33, ARRAY['wall hanging','woven','home decor']),
('Hand-Dyed Linen Tote Bag', 'textiles', 55.00, 'https://picsum.photos/seed/textiles2/500/500', 'A durable linen tote bag hand-dyed with natural indigo and botanical pigments.', 'Priya Nair', 'Jaipur, India', '210g', true, 4.8, 29, ARRAY['tote','linen','hand-dyed']),
('Live Edge Oak Serving Board', 'woodcraft', 95.00, 'https://picsum.photos/seed/wood1/500/500', 'A stunning live edge oak serving board with natural bark edges preserved.', 'Henrik Larsson', 'Stockholm, Sweden', '680g', true, 5.0, 12, ARRAY['oak','serving board','food-safe']),
('Hand-Carved Wooden Spoon Set', 'woodcraft', 42.00, 'https://picsum.photos/seed/wood2/500/500', 'A set of three hand-carved wooden spoons made from cherry wood.', 'Tomás Herrera', 'Guadalajara, Mexico', '180g', false, 4.7, 38, ARRAY['spoon','cherry wood','carved']),
('Beeswax Taper Candles (Pair)', 'candles', 28.00, 'https://picsum.photos/seed/candle1/500/500', 'A pair of hand-dipped pure beeswax taper candles with a honey aroma.', 'Claire Dubois', 'Provence, France', '160g', true, 4.9, 64, ARRAY['beeswax','taper','natural']),
('Soy Lavender Jar Candle', 'candles', 22.00, 'https://picsum.photos/seed/candle2/500/500', 'A hand-poured soy wax candle scented with French lavender essential oil.', 'Nadia Kowalski', 'Kraków, Poland', '220g', true, 4.8, 89, ARRAY['soy','lavender','aromatherapy']),
('Watercolor Botanical Print', 'art', 85.00, 'https://picsum.photos/seed/art1/500/500', 'An original watercolor painting of wild botanicals on 300gsm cold-press paper.', 'Yuki Mori', 'Osaka, Japan', '80g', true, 4.9, 15, ARRAY['watercolor','botanical','original art']),
('Charcoal Landscape Drawing', 'art', 120.00, 'https://picsum.photos/seed/art2/500/500', 'A detailed charcoal drawing of a mountain landscape on fine art paper.', 'Elias Nkosi', 'Cape Town, South Africa', '90g', true, 4.8, 9, ARRAY['charcoal','landscape','original art']);
