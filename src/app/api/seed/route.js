import { seedDatabase } from "@/lib/seed";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await seedDatabase();
    return NextResponse.json({ message: "✅ Database seeded successfully!" });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Seeding failed", details: error.message }, { status: 500 });
  }
}