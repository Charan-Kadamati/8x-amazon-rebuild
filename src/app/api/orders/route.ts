import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, address, city, state, zipCode, paymentMethod, subtotal, shipping, tax, total, items } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Order must contain at least one item" }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        customerName: customerName || "Customer",
        customerEmail: customerEmail || null,
        address: address || "N/A",
        city: city || "N/A",
        state: state || "N/A",
        zipCode: zipCode || "N/A",
        paymentMethod: paymentMethod || "card",
        subtotal: parseFloat(subtotal) || 0,
        shipping: parseFloat(shipping) || 0,
        tax: parseFloat(tax) || 0,
        total: parseFloat(total) || 0,
        items: {
          create: items.map((item: { product: { id: string; price: number }; quantity: number }) => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
