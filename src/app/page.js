"use client";

import Link from "next/link";
import { Hammer, Gem, Scissors, Trees, Flame, Palette, ArrowRight, Star, Heart } from "lucide-react";
import { ProductCard } from "./components/ProductCard";
import { useCart } from "./store/cart";
import { products, categories } from "./data/products";

const categoryIcons = {
  Hammer, Gem, Scissors, Trees, Flame, Palette,
};

export default function HomePage() {
  const { addToCart } = useCart();
  const featured = products.filter((p) => p.in_stock).slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative py-24 px-4 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #5C3A1E 0%, #8B6914 50%, #D4A96A 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="container mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm px-4 py-1.5 rounded-full mb-6">
            <Heart className="w-4 h-4 fill-white" />
            Made with love by skilled artisans
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-serif">
            Discover the Art of<br />
            <span className="text-accent">Handcrafted</span> Goods
          </h1>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Shop one-of-a-kind pieces made by skilled artisans from around the world. Every item tells a story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#featured"
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-3 rounded-md hover:bg-accent hover:text-white transition-colors"
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#categories"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-8 py-3 rounded-md hover:bg-white/10 transition-colors"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "1,200+", label: "Unique Products" },
            { value: "340+", label: "Skilled Artisans" },
            { value: "50+", label: "Countries" },
            { value: "4.8★", label: "Avg. Rating" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-accent">{stat.value}</div>
              <div className="text-sm opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-foreground mb-3">Shop by Craft</h2>
            <p className="text-muted-foreground text-lg">Explore our curated categories of handmade goods</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat.icon];
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="group flex flex-col items-center gap-3 p-5 bg-card border border-border rounded-xl hover:border-primary hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary transition-colors">
                    {Icon && <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />}
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {cat.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-2">Featured Pieces</h2>
              <p className="text-muted-foreground">Handpicked works from our best artisans</p>
            </div>
            <Link
              href="/category/pottery"
              className="hidden md:flex items-center gap-1 text-primary font-medium hover:underline"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Handcrafted */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-3">Why Choose Handcrafted?</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Every item in our marketplace is made by hand, with care, skill, and intention.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "✦", title: "Truly Unique", desc: "No two pieces are identical. Each item carries the individual mark of its maker." },
              { icon: "♻", title: "Sustainable", desc: "Artisans use natural, locally sourced materials and traditional techniques that respect the environment." },
              { icon: "❤", title: "Direct Support", desc: "Your purchase goes directly to the artisan, supporting livelihoods and preserving traditional crafts." },
            ].map((item) => (
              <div key={item.title} className="text-center p-8 bg-card border border-border rounded-xl">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-3 font-serif">Top Rated This Month</h2>
          <p className="opacity-80 mb-10 text-lg">Our customers&apos; absolute favourites</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products
              .filter((p) => p.rating >= 4.8 && p.in_stock)
              .slice(0, 4)
              .map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl p-4 hover:bg-primary-foreground/20 transition-colors text-left group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover rounded-lg mb-3"
                  />
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                    <span className="text-sm font-bold text-accent">{product.rating}</span>
                    <span className="text-xs opacity-60">({product.reviews} reviews)</span>
                  </div>
                  <h3 className="font-semibold group-hover:text-accent transition-colors line-clamp-1">{product.name}</h3>
                  <p className="text-sm opacity-70">${product.price.toFixed(2)}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 bg-accent/20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-3 font-serif">Are You an Artisan?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Join Handcrafted Haven and reach customers who genuinely value your craft.
          </p>
          <Link
            href="#"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-md hover:bg-primary/85 transition-colors"
          >
            Start Selling Today <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
