"use client";

import { use, useEffect, useState } from "react";
import { useCart } from "@/app/store/cart";
import { ProductCard } from "@/app/components/ProductCard";
import Link from "next/link";
import { Star, MapPin, ShoppingCart, Package, Tag, Weight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/components/ui/Button";
import { Badge } from "@/app/components/ui/Badge";
import { Input } from "@/app/components/ui/Input";
import { Card } from "@/app/components/ui/Card";
import { products } from "@/app/data/products";

export default function ProductPage({ params }) {
  const { id } = use(params);
  const { addToCart, items } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ name: "", rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      if (!res.ok || data?.error) { setProduct(null); return; }
      setProduct(data);
    } catch { setProduct(null); }
    finally { setLoading(false); }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?productId=${id}`);
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch { setReviews([]); }
  };

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, ...reviewForm }),
      });
      if (res.ok) {
        setSubmitted(true);
        setReviewForm({ name: "", rating: 5, comment: "" });
        fetchReviews();
      }
    } catch { }
    finally { setSubmitting(false); }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-muted-foreground">Loading product…</p>
      </div>
    );
  }

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
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : product.rating;

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href={`/category/${product.category}`} className="hover:text-primary capitalize">{product.category}</Link>
          <span>/</span>
          <span className="text-foreground line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = `https://placehold.co/600x600/E8D5B0/7A5C3A?text=${encodeURIComponent(product.name)}`; }}
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h1 className="text-3xl font-bold text-foreground leading-tight">{product.name}</h1>
              {!product.in_stock && <Badge variant="danger">Out of Stock</Badge>}
              {product.in_stock && <Badge variant="success">In Stock</Badge>}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`w-4 h-4 ${star <= Math.round(avgRating) ? "fill-accent text-accent" : "text-border"}`} />
                ))}
              </div>
              <span className="text-sm font-medium">{avgRating}</span>
              <span className="text-sm text-muted-foreground">({reviews.length > 0 ? reviews.length : product.reviews} reviews)</span>
            </div>

            <p className="text-3xl font-bold text-primary mb-6">${Number(product.price ?? 0).toFixed(2)}</p>
            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

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

            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags?.map((tag) => <Badge key={tag} variant="outline">{tag}</Badge>)}
            </div>

            <div className="flex gap-3 mt-auto">
              <Button size="lg" className="flex-1 gap-2" onClick={() => addToCart(product)} disabled={!product.in_stock}>
                <ShoppingCart className="w-5 h-5" />
                {cartItem ? `Add More (${cartItem.quantity} in cart)` : "Add to Cart"}
              </Button>
              <Link href="/cart"><Button size="lg" variant="outline">View Cart</Button></Link>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">🚚 Free shipping on orders over $75</p>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Customer Reviews</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
              ) : (
                reviews.map((review) => (
                  <Card key={review.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground">{review.name}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={`w-3.5 h-3.5 ${star <= review.rating ? "fill-accent text-accent" : "text-border"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                    <p className="text-xs text-muted-foreground mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
                  </Card>
                ))
              )}
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Leave a Review</h3>
              {submitted ? (
                <p className="text-green-600 font-medium">Thank you for your review!</p>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Your Name</label>
                    <Input
                      required
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" onClick={() => setReviewForm((p) => ({ ...p, rating: star }))}>
                          <Star className={`w-6 h-6 ${star <= reviewForm.rating ? "fill-accent text-accent" : "text-border"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Comment</label>
                    <textarea
                      className="w-full px-3 py-2 rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors resize-none"
                      rows={4}
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm((p) => ({ ...p, comment: e.target.value }))}
                      placeholder="Share your experience..."
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </section>

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