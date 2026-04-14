import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const artisanKey = searchParams.get("artisanKey");
  const id = searchParams.get("id");

  try {
    const client = await clientPromise;
    const db = client.db("handcrafted-haven");

    const query = {};
    if (category) query.category = category;
    if (artisanKey) query.artisanKey = artisanKey;
    // El JSON expone `id` desde `_id`; en la BD suele existir solo `_id`, no un campo `id`.
    if (id) {
      if (ObjectId.isValid(id)) {
        query.$or = [{ _id: new ObjectId(id) }, { id }];
      } else {
        query.id = id;
      }
    }
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