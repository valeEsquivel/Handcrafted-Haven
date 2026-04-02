"use client";

import Link from "next/link";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Trash2, ArrowLeft, ShoppingBag, Package } from "lucide-react";
import { useCart } from "../store/cart";
import Image from "next/image";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCart();

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal > 75 ? 0 : 8.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 py-24 px-4 text-center">
        <ShoppingBag className="w-16 h-16 text-muted-foreground/50" />
        <h2 className="text-3xl font-bold text-foreground">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground max-w-sm">
          Looks like you haven&apos;t added anything yet. Start browsing our
          handcrafted goods!
        </p>
        <Link href="/">
          <Button size="lg">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>

        <h1 className="text-4xl font-bold mb-8 text-foreground">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.product.id} className="p-4">
                <div className="flex gap-4">
                  <Link href={`/product/${item.product.id}`}>
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={96}
                      height={96}
                      className="w-24 h-24 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = `https://placehold.co/200x200/E8D5B0/7A5C3A?text=${encodeURIComponent(item.product.name)}`;
                      }}
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.product.id}`}>
                      <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      By {item.product.artisan} · {item.product.weight}
                    </p>
                    <p className="text-primary font-semibold mt-1">
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <div className="flex items-center gap-1 border border-border rounded-md overflow-hidden">
                      <button
                        className="px-2.5 py-1 text-sm hover:bg-muted transition-colors"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        className="px-2.5 py-1 text-sm hover:bg-muted transition-colors"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <div>
            <Card className="p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                Order Summary
              </h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Subtotal ({items.length} item{items.length > 1 ? "s" : ""})
                  </span>
                  <span className="text-foreground font-medium">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600 font-semibold">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {subtotal < 75 && (
                  <p className="text-xs text-muted-foreground bg-muted/50 px-3 py-2 rounded-md">
                    <Package className="w-3.5 h-3.5 inline mr-1" />
                    Add ${(75 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>
              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
              <Link href="/checkout">
                <Button size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>
              <p className="text-xs text-center text-muted-foreground mt-3">
                🔒 Secure checkout — your data is protected
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
