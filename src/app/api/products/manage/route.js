import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "artisan") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, category, price, description, weight, tags, in_stock } = body;

  if (!name || !category || !price || !description) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("handcrafted-haven");

    const artisan = await db.collection("artisans").findOne({
      artisanKey: session.user.artisanKey,
    });

    const product = {
      name,
      category,
      price: Number(price),
      description,
      weight: weight || "",
      tags: tags || [],
      in_stock: in_stock !== false,
      artisanKey: session.user.artisanKey,
      artisan: artisan?.name || session.user.name,
      location: artisan?.country || "",
      image: "/images/placeholder.jpg",
      rating: 0,
      reviews: 0,
      createdAt: new Date(),
    };

    const result = await db.collection("products").insertOne(product);

    return NextResponse.json(
      { id: result.insertedId.toString(), message: "Product added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Add product error:", error);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}

export async function PUT(request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "artisan") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, name, category, price, description, weight, tags, in_stock } = body;

  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("handcrafted-haven");

    const existing = await db.collection("products").findOne({
      _id: new ObjectId(id),
      artisanKey: session.user.artisanKey,
    });

    if (!existing) {
      return NextResponse.json({ error: "Product not found or unauthorized" }, { status: 404 });
    }

    await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          category,
          price: Number(price),
          description,
          weight: weight || "",
          tags: tags || [],
          in_stock: in_stock !== false,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ message: "Product updated successfully!" });
  } catch (error) {
    console.error("Update product error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "artisan") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("handcrafted-haven");

    const existing = await db.collection("products").findOne({
      _id: new ObjectId(id),
      artisanKey: session.user.artisanKey,
    });

    if (!existing) {
      return NextResponse.json({ error: "Product not found or unauthorized" }, { status: 404 });
    }

    await db.collection("products").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: "Product deleted successfully!" });
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}