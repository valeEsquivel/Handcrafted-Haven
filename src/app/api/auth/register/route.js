import clientPromise from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { name, email, password, role, artisanKey } = body;

  if (!name || !email || !password || !role) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!["artisan", "customer"].includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("handcrafted-haven");

    const existing = await db.collection("users").findOne({
      email: email.toLowerCase(),
    });

    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      artisanKey: role === "artisan" ? (artisanKey || null) : null,
      createdAt: new Date(),
    };

    await db.collection("users").insertOne(user);

    return NextResponse.json({ message: "Account created successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
  }
}