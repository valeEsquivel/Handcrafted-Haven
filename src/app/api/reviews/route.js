import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json({ error: "productId is required" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("handcrafted-haven");
    const reviews = await db
      .collection("reviews")
      .find({ productId })
      .sort({ createdAt: -1 })
      .toArray();

    const result = reviews.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Reviews fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request) {
  const body = await request.json();
  const { productId, name, rating, comment } = body;

  if (!productId || !name || !rating) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("handcrafted-haven");

    const review = {
      productId,
      name,
      rating: Number(rating),
      comment: comment || "",
      createdAt: new Date(),
    };

    await db.collection("reviews").insertOne(review);

    return NextResponse.json({ message: "Review added successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Review error:", error);
    return NextResponse.json({ error: "Failed to add review" }, { status: 500 });
  }
}