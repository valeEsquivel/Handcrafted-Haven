import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const artisanKey = searchParams.get("artisanKey");

  try {
    const client = await clientPromise;
    const db = client.db("handcrafted-haven");

    const query = {};
    if (artisanKey) query.artisanKey = artisanKey;
    const artisans = await db
      .collection("artisans")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    const result = artisans.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("DB error:", error);
    return NextResponse.json(
      { error: "Failed to fetch artisans" },
      { status: 500 },
    );
  }
}
