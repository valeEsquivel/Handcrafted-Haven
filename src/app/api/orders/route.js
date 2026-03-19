import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { email, firstName, lastName, address, city, state, zip, items, subtotal, shipping, total } = body;

  try {
    // Create the order
    const orderResult = await query(
      `INSERT INTO orders (email, first_name, last_name, address, city, state, zip, subtotal, shipping, total, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'confirmed') RETURNING id`,
      [email, firstName, lastName, address, city, state, zip, subtotal, shipping, total]
    );

    const orderId = orderResult.rows[0].id;

    // Insert order items
    for (const item of items) {
      await query(
        `INSERT INTO order_items (order_id, product_id, product_name, quantity, price)
         VALUES ($1, $2, $3, $4, $5)`,
        [orderId, item.product.id, item.product.name, item.quantity, item.product.price]
      );
    }

    return NextResponse.json({ orderId, message: "Order placed successfully" }, { status: 201 });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}
