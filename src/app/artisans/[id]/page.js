"use client";

import { use, useEffect, useState } from "react";
import { useCart } from "@/app/store/cart";
import { ProductCard } from "@/app/components/ProductCard";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";

export default function CategoryPage({ params }) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [artisanInfo, setArtisanInfo] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products?artisanKey=" + id);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error: Loading products:", error);
    }
  };

  const fetchArtisanInfo = async () => {
    try {
      const res = await fetch("/api/artisans?artisanKey=" + id);
      const data = await res.json();
      setArtisanInfo(data);
    } catch (error) {
      console.error("Error: Loading artisan info:", error);
    }
  };

  useEffect(() => {
    fetchArtisanInfo();
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-primary text-primary-foreground py-12 px-4">
        <div className="container mx-auto">
          <Link
            href="/artisans"
            className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Artisans
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Package className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold font-serif">
                {artisanInfo[0]?.name}
              </h1>
              {artisanInfo && (
                <p className="text-primary-foreground/75 mt-1">
                  {artisanInfo[0]?.email}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {products.length} {products.length === 1 ? "product" : "products"}{" "}
            found
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-lg mb-6">
              No products found for this artisan yet.
            </p>
            <Link
              href="/artisans"
              className="text-primary hover:underline font-medium"
            >
              ← Back to all artisans
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
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
