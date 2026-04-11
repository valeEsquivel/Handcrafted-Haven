import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("handcrafted-haven");

    const categories = await db
      .collection("categories")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const result = categories.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("DB error:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}
