"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { Badge } from "@/app/components/ui/Badge";
import { Plus, Pencil, Trash2, Package, ShoppingBag, LogOut } from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "", category: "pottery", price: "", description: "", weight: "", in_stock: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.role === "artisan") {
      fetchMyProducts();
    } else if (session?.user?.role === "customer") {
      fetchMyOrders();
    }
  }, [session]);

  const fetchMyProducts = async () => {
    try {
      const res = await fetch(`/api/products?artisanKey=${session.user.artisanKey}`);
      const data = await res.json();
      setProducts(data);
    } catch (error) { console.error(error); }
  };

  const fetchMyOrders = async () => {
    try {
      const res = await fetch(`/api/orders?email=${session.user.email}`);
      const data = await res.json();
      setOrders(data);
    } catch (error) { console.error(error); }
  };

  const update = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    const method = editProduct ? "PUT" : "POST";
    const body = editProduct ? { ...formData, id: editProduct.id } : formData;

    const res = await fetch("/api/products/manage", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    setSubmitting(false);

    if (res.ok) {
      setMessage(data.message);
      setShowAddForm(false);
      setEditProduct(null);
      setFormData({ name: "", category: "pottery", price: "", description: "", weight: "", in_stock: true });
      fetchMyProducts();
    } else {
      setMessage(data.error || "Something went wrong.");
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      weight: product.weight || "",
      in_stock: product.in_stock,
    });
    setShowAddForm(true);
  };

  const handleDelete = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const res = await fetch(`/api/products/manage?id=${productId}`, { method: "DELETE" });
    const data = await res.json();

    if (res.ok) {
      setMessage(data.message);
      fetchMyProducts();
    } else {
      setMessage(data.error || "Failed to delete.");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!session) return null;

  const categories = ["pottery", "jewelry", "textiles", "woodcraft", "candles", "art"];

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-serif">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {session.user.name} —{" "}
              <Badge variant={session.user.role === "artisan" ? "success" : "default"}>
                {session.user.role}
              </Badge>
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>

        {message && (
          <div className="bg-green-100 text-green-800 text-sm px-4 py-3 rounded-md mb-6">
            {message}
          </div>
        )}

        {/* Artisan Dashboard */}
        {session.user.role === "artisan" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Package className="w-6 h-6 text-primary" /> My Products
              </h2>
              <Button
                onClick={() => { setShowAddForm(!showAddForm); setEditProduct(null); setFormData({ name: "", category: "pottery", price: "", description: "", weight: "", in_stock: true }); }}
                className="gap-2"
              >
                <Plus className="w-4 h-4" /> Add Product
              </Button>
            </div>

            {/* Add/Edit Form */}
            {showAddForm && (
              <Card className="p-6 mb-8">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  {editProduct ? "Edit Product" : "Add New Product"}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Product Name</label>
                      <Input required value={formData.name} onChange={update("name")} placeholder="e.g. Hand-Thrown Ceramic Bowl" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                      <select
                        value={formData.category}
                        onChange={update("category")}
                        className="w-full px-3 py-2 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                      >
                        {categories.map((c) => (
                          <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Price ($)</label>
                      <Input required type="number" min="0" step="0.01" value={formData.price} onChange={update("price")} placeholder="0.00" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Weight</label>
                      <Input value={formData.weight} onChange={update("weight")} placeholder="e.g. 320g" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                    <textarea
                      required
                      className="w-full px-3 py-2 rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors resize-none"
                      rows={4}
                      value={formData.description}
                      onChange={update("description")}
                      placeholder="Describe your product..."
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="in_stock"
                      checked={formData.in_stock}
                      onChange={(e) => setFormData((p) => ({ ...p, in_stock: e.target.checked }))}
                      className="w-4 h-4"
                    />
                    <label htmlFor="in_stock" className="text-sm font-medium text-foreground">In Stock</label>
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit" disabled={submitting}>
                      {submitting ? "Saving..." : editProduct ? "Update Product" : "Add Product"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => { setShowAddForm(false); setEditProduct(null); }}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Products List */}
            {products.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">You haven&apos;t added any products yet.</p>
                <Button onClick={() => setShowAddForm(true)} className="gap-2">
                  <Plus className="w-4 h-4" /> Add Your First Product
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">{product.name}</h3>
                      <Badge variant={product.in_stock ? "success" : "danger"}>
                        {product.in_stock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1 capitalize">{product.category}</p>
                    <p className="text-lg font-bold text-primary mb-3">${Number(product.price).toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{product.description}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(product)} className="gap-1.5">
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)} className="gap-1.5">
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Customer Dashboard */}
        {session.user.role === "customer" && (
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-6">
              <ShoppingBag className="w-6 h-6 text-primary" /> My Orders
            </h2>

            {orders.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">You haven&apos;t placed any orders yet.</p>
                <Link href="/">
                  <Button>Start Shopping</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Order ID</p>
                        <p className="font-mono text-sm text-foreground">{order.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="text-sm text-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="text-lg font-bold text-primary">${Number(order.total).toFixed(2)}</p>
                      </div>
                      <Badge variant="success">{order.status}</Badge>
                    </div>
                    <div className="space-y-2">
                      {order.items?.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm text-muted-foreground">
                          <span>{item.productName} × {item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}