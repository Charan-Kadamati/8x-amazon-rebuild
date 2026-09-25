import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";
    const categoryParam = searchParams.get("category") || "";
    const minPrice = parseFloat(searchParams.get("minPrice") || "0");
    const maxPrice = parseFloat(searchParams.get("maxPrice") || "9999999");
    const minRating = parseFloat(searchParams.get("minRating") || "0");
    const sort = searchParams.get("sort") || "featured";
    const featured = searchParams.get("featured") === "true";
    const bestSeller = searchParams.get("bestseller") === "true";

    // Build Prisma where clause
    const where: any = {
      price: {
        gte: minPrice,
        lte: maxPrice,
      },
      rating: {
        gte: minRating,
      },
    };

    if (featured) {
      where.isApexChoice = true;
    }

    if (bestSeller) {
      where.isBestSeller = true;
    }

    if (categoryParam && categoryParam !== "All Categories") {
      where.category = {
        name: {
          equals: categoryParam,
        },
      };
    }

    if (q) {
      where.OR = [
        { title: { contains: q } },
        { brand: { contains: q } },
        { description: { contains: q } },
      ];
    }

    // Build orderBy clause
    let orderBy: any = { createdAt: "desc" };
    if (sort === "price_low") {
      orderBy = { price: "asc" };
    } else if (sort === "price_high") {
      orderBy = { price: "desc" };
    } else if (sort === "rating") {
      orderBy = { rating: "desc" };
    } else if (sort === "bestseller") {
      orderBy = { isBestSeller: "desc" };
    }

    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: {
        category: true,
      },
    });

    // Parse JSON string fields for clean frontend payload
    const formattedProducts = products.map((prod) => ({
      ...prod,
      category: prod.category.name,
      images: JSON.parse(prod.images),
      features: JSON.parse(prod.features),
      specs: JSON.parse(prod.specs),
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
