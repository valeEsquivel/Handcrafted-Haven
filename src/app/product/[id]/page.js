"use client";

import { use } from "react";
import Link from "next/link";
import { useCart } from "@/app/store/cart";
import { products } from "@/app/data/products";
import { Button } from "@/app/components/ui/Button";
import { Badge } from "@/app/components/ui/Badge";
import { ProductCard } from "@/app/components/ProductCard";
import {
  ArrowLeft, Star, MapPin, ShoppingCart, Package, Tag, Weight,
} from "lucide-react";

export default function ProductPage({ params }) {
  const { id } = use(params);
  const { addToCart, items } = useCart();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <h2 className="text-3xl font-bold text-foreground">Product Not Found</h2>
        <Link href="/" className="text-primary hover:underline">← Back to Home</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const cartItem = items.find((i) => i.product.id === product.id);

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href={`/category/${product.category}`} className="hover:text-primary capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground line-clamp-1">{product.name}</span>
        </nav>

        {/* Product Detail */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Image */}
          <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `https://placehold.co/600x600/E8D5B0/7A5C3A?text=${encodeURIComponent(product.name)}`;
              }}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h1 className="text-3xl font-bold text-foreground leading-tight">{product.name}</h1>
              {!product.in_stock && <Badge variant="danger">Out of Stock</Badge>}
              {product.in_stock && <Badge variant="success">In Stock</Badge>}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= Math.round(product.rating) ? "fill-accent text-accent" : "text-border"}`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            <p className="text-3xl font-bold text-primary mb-6">${product.price.toFixed(2)}</p>

            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-muted/40 rounded-xl text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{product.artisan}, {product.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Weight className="w-4 h-4 text-primary" />
                <span>{product.weight}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Package className="w-4 h-4 text-primary" />
                <span className="capitalize">{product.category}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Tag className="w-4 h-4 text-primary" />
                <span>{product.tags?.slice(0, 2).join(", ")}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags?.map((tag) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>

            {/* Add to Cart */}
            <div className="flex gap-3 mt-auto">
              <Button
                size="lg"
                className="flex-1 gap-2"
                onClick={() => addToCart(product)}
                disabled={!product.in_stock}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItem ? `Add More (${cartItem.quantity} in cart)` : "Add to Cart"}
              </Button>
              <Link href="/cart">
                <Button size="lg" variant="outline">View Cart</Button>
              </Link>
            </div>

            <p className="text-xs text-muted-foreground mt-4 text-center">
              🚚 Free shipping on orders over $75
            </p>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">More from this Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={() => addToCart(p)} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
