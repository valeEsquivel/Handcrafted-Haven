import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  try {
    const client = await clientPromise;
    const db = client.db("handcrafted-haven");

    const query = category ? { category } : {};
    const products = await db
      .collection("products")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    const result = products.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("DB error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}