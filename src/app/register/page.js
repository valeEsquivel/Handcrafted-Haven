"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Card } from "@/app/components/ui/Card";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    artisanKey: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        artisanKey: formData.role === "artisan" ? formData.artisanKey : null,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Registration failed.");
    } else {
      router.push("/login?registered=true");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 font-serif">Create Account</h1>
        <p className="text-muted-foreground mb-6">Join the Handcrafted Haven community</p>

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
            <Input
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={update("name")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email</label>
            <Input
              type="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={update("email")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Password</label>
            <Input
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={update("password")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Confirm Password</label>
            <Input
              type="password"
              required
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={update("confirmPassword")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">I am a...</label>
            <select
              value={formData.role}
              onChange={update("role")}
              className="w-full px-3 py-2 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
            >
              <option value="customer">Customer</option>
              <option value="artisan">Artisan / Seller</option>
            </select>
          </div>
          {formData.role === "artisan" && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Artisan Key <span className="text-muted-foreground">(provided by admin)</span>
              </label>
              <Input
                placeholder="e.g. vesquivel"
                value={formData.artisanKey}
                onChange={update("artisanKey")}
              />
            </div>
          )}
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="text-sm text-center text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}