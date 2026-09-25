import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const formattedProduct = {
      ...product,
      category: product.category.name,
      images: JSON.parse(product.images),
      features: JSON.parse(product.features),
      specs: JSON.parse(product.specs),
    };

    return NextResponse.json(formattedProduct);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
