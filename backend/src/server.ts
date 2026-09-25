import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from "./lib/prisma.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check route
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "OK", timestamp: new Date(), service: "ApexMart Express Backend" });
});

// GET /api/categories
app.get("/api/categories", async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// GET /api/products
app.get("/api/products", async (req: Request, res: Response) => {
  try {
    const q = (req.query.q as string) || "";
    const categoryParam = (req.query.category as string) || "";
    const minPrice = parseFloat((req.query.minPrice as string) || "0");
    const maxPrice = parseFloat((req.query.maxPrice as string) || "9999999");
    const minRating = parseFloat((req.query.minRating as string) || "0");
    const sort = (req.query.sort as string) || "featured";
    const featured = req.query.featured === "true";
    const bestSeller = req.query.bestseller === "true";

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

    const formattedProducts = products.map((prod) => ({
      ...prod,
      category: prod.category.name,
      images: JSON.parse(prod.images),
      features: JSON.parse(prod.features),
      specs: JSON.parse(prod.specs),
    }));

    res.json(formattedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET /api/products/:id
app.get("/api/products/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const formattedProduct = {
      ...product,
      category: product.category.name,
      images: JSON.parse(product.images),
      features: JSON.parse(product.features),
      specs: JSON.parse(product.specs),
    };

    res.json(formattedProduct);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// GET /api/orders
app.get("/api/orders", async (req: Request, res: Response) => {
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
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// POST /api/orders
app.post("/api/orders", async (req: Request, res: Response) => {
  try {
    const {
      customerName,
      customerEmail,
      address,
      city,
      state,
      zipCode,
      paymentMethod,
      subtotal,
      shipping,
      tax,
      total,
      items,
    } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Order must contain at least one item" });
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

    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 ApexMart Express Backend running at http://localhost:${PORT}`);
});
