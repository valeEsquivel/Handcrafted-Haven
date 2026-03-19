import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  try {
    let sql = "SELECT * FROM products ORDER BY created_at DESC";
    let params = [];

    if (category) {
      sql = "SELECT * FROM products WHERE category = $1 ORDER BY created_at DESC";
      params = [category];
    }

    const result = await query(sql, params);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("DB error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
