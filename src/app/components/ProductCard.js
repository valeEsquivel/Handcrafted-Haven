"use client";

import Link from "next/link";
import { Star, ShoppingCart, MapPin } from "lucide-react";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import Image from "next/image";

export function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image */}
      <Link href={`/product/${product.id}`} className="relative block aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          width={96}
          height={96}
          onError={(e) => {
            e.target.src = `https://placehold.co/500x500/E8D5B0/7A5C3A?text=${encodeURIComponent(product.name)}`;
          }}
        />
        {!product.in_stock && (
          <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
            <Badge variant="danger" className="text-sm px-3 py-1">Out of Stock</Badge>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold text-foreground text-sm leading-snug hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center gap-1 mb-2">
          <MapPin className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{product.artisan} · {product.location}</span>
        </div>

        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3.5 h-3.5 fill-accent text-accent" />
          <span className="text-xs font-medium text-foreground">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
          <Button
            size="sm"
            onClick={() => onAddToCart(product)}
            disabled={!product.in_stock}
            className="gap-1.5"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
