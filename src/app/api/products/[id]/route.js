import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("handcrafted-haven");

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const { _id, ...rest } = product;
    return NextResponse.json({ id: _id.toString(), ...rest });
  } catch (error) {
    console.error("DB error:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}