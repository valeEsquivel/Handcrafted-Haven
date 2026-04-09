"use client";

import { use } from "react";
import Link from "next/link";
import { useCart } from "@/app/store/cart";
import { artisans } from "@/app/data/artisans";
import { Button } from "@/app/components/ui/Button";
import { Badge } from "@/app/components/ui/Badge";
import { ProductCard } from "@/app/components/ProductCard";
import {
  Star, MapPin, ShoppingCart, Cake
} from "lucide-react";
import Image from "next/image";

export default function ArtisanProfilePage({ params }) {
  const { id } = use(params);
  const { addToCart, items } = useCart();

  const artisan = artisans.find((p) => p.artisanKey === id);

  if (!artisan) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <h2 className="text-3xl font-bold text-foreground">Artisan Not Found</h2>
        <Link href="/" className="text-primary hover:underline">← Back to Home</Link>
      </div>
    );
  }

//   const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href={`/artisans`} className="hover:text-primary capitalize">
            Artisans
          </Link>
          <span>/</span>
          <span className="text-foreground line-clamp-1">{artisan.name}</span>
        </nav>

        {/* Artisan Profile */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Image */}
          <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
            <Image
              src={artisan.image}
              alt={artisan.name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `https://placehold.co/600x600/E8D5B0/7A5C3A?text=${encodeURIComponent(artisan.name)}`;
              }}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h1 className="text-3xl font-bold text-foreground leading-tight">{artisan.name}</h1>
              <Badge variant="success">Active</Badge>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= Math.round(artisan.rating) ? "fill-accent text-accent" : "text-border"}`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{artisan.rating || 0}</span>
              <span className="text-sm text-muted-foreground">({artisan.reviews || 0} reviews)</span>
            </div>

            <p className="text-3xl font-bold text-primary mb-6">{artisan.nickname}</p>

            <p className="text-muted-foreground leading-relaxed mb-6">{artisan.description}</p>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-muted/40 rounded-xl text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{artisan.country}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Cake className="w-4 h-4 text-primary" />
                <span>{artisan.birthday}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {artisan.categories?.map((tag) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {/* {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">More from this Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={() => addToCart(p)} />
              ))}
            </div>
          </section>
        )} */}
      </div>
    </div>
  );
}
