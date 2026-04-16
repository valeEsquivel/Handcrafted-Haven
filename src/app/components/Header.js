"use client";

import Link from "next/link";
import { ShoppingCart, Scissors, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { useCart } from "../store/cart";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { items } = useCart();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/category/pottery", label: "Pottery" },
    { href: "/category/jewelry", label: "Jewelry" },
    { href: "/category/textiles", label: "Textiles" },
    { href: "/category/woodcraft", label: "Woodcraft" },
    { href: "/category/candles", label: "Candles" },
    { href: "/category/art", label: "Art" },
  ];

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Scissors className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-xl font-bold text-primary font-serif tracking-wide">
            Handcrafted Haven
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/85 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Menu */}
          {session ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-md text-sm text-foreground hover:bg-muted transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{session.user.name?.split(" ")[0]}</span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-10 bg-card border border-border rounded-xl shadow-lg w-48 z-50">
                  <Link
                    href="/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors rounded-t-xl"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <button
                    onClick={() => { setUserMenuOpen(false); signOut({ callbackUrl: "/" }); }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-muted transition-colors rounded-b-xl"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-md text-sm text-foreground hover:bg-muted transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-primary"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="md:hidden bg-card border-t border-border px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {session ? (
            <>
              <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors">
                Dashboard
              </Link>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="text-left px-3 py-2 text-sm text-destructive hover:bg-muted rounded-md transition-colors">
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors">
              Sign In
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}