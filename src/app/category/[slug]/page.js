"use client";

import { use } from "react";
import { useCart } from "@/app/store/cart";
import { ProductCard } from "@/app/components/ProductCard";
import { products, categories } from "@/app/data/products";
import Link from "next/link";
import { ArrowLeft, Hammer, Gem, Scissors, Trees, Flame, Palette } from "lucide-react";

const categoryIcons = { Hammer, Gem, Scissors, Trees, Flame, Palette };

export default function CategoryPage({ params }) {
  const { slug } = use(params);
  const { addToCart } = useCart();

  const category = categories.find((c) => c.slug === slug);
  const filtered = products.filter((p) => p.category === slug);
  const Icon = category ? categoryIcons[category.icon] : null;

  const title = category?.label ?? slug?.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-primary text-primary-foreground py-12 px-4">
        <div className="container mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-4">
            {Icon && (
              <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Icon className="w-7 h-7 text-primary-foreground" />
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold font-serif">{title}</h1>
              {category && <p className="text-primary-foreground/75 mt-1">{category.description}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "product" : "products"} found
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-lg mb-6">No products found in this category yet.</p>
            <Link href="/" className="text-primary hover:underline font-medium">← Back to all products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
