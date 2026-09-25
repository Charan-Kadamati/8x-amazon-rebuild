import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CATEGORIES_DATA = [
  { name: "Electronics", slug: "electronics", description: "High-performance headphones, laptops, TVs & wearables" },
  { name: "Smart Home", slug: "smart-home", description: "Security cameras, robot vacuums & intelligent ambient lighting" },
  { name: "Fashion & Apparel", slug: "fashion-apparel", description: "Weatherproof outerwear, performance footwear & travel gear" },
  { name: "Home & Kitchen", slug: "home-kitchen", description: "Chef-grade cutlery, automatic espresso machines & air fryers" },
  { name: "Books & Kindle", slug: "books-kindle", description: "Technical bestsellers, e-readers & digital publishing" },
  { name: "Fitness & Sports", slug: "fitness-sports", description: "Adjustable dumbbells, biometric trackers & eco yoga mats" },
];

const PRODUCTS_DATA = [
  {
    id: "prod-101",
    title: "Apex SoundPulse Wireless Active Noise Cancelling Headphones",
    brand: "ApexAudio",
    categorySlug: "electronics",
    price: 199.99,
    listPrice: 299.99,
    discountPercent: 33,
    rating: 4.8,
    reviewCount: 4820,
    inStock: true,
    stockCount: 15,
    isBestSeller: true,
    isApexChoice: true,
    primeEligible: true,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
    ]),
    description: "Experience high-fidelity audio with world-class active noise cancellation. Custom 40mm acoustic drivers deliver deep bass, crisp highs, and immersive spatial sound audio balance.",
    features: JSON.stringify([
      "Advanced Active Noise Cancellation (ANC) with Transparency Mode",
      "Up to 40 hours of continuous wireless playback on a single charge",
      "Ultra-soft memory foam ear cushions for all-day comfort",
      "Multipoint Bluetooth 5.3 technology connects to two devices simultaneously",
      "Fast charging: 10 minutes charge gives 4 hours playback",
    ]),
    specs: JSON.stringify({
      Connectivity: "Bluetooth 5.3 / 3.5mm Aux",
      "Battery Life": "40 Hours (ANC On)",
      Weight: "250g",
      "Noise Cancellation": "Hybrid Active Noise Cancellation",
      Warranty: "2 Years Manufacturer Warranty",
    }),
  },
  {
    id: "prod-102",
    title: "UltraBook Pro 15.6\" OLED Laptop - Intel Core i9, 32GB RAM, 1TB NVMe SSD",
    brand: "OmniTech",
    categorySlug: "electronics",
    price: 1299.99,
    listPrice: 1599.99,
    discountPercent: 19,
    rating: 4.7,
    reviewCount: 1240,
    inStock: true,
    stockCount: 8,
    isBestSeller: false,
    isApexChoice: true,
    primeEligible: true,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80",
    ]),
    description: "Unleash productivity and creative power with the UltraBook Pro. Features a stunning 3.5K OLED touch display, ultra-slim aluminum chassis, and peak multi-core processing performance.",
    features: JSON.stringify([
      "15.6-inch 3.5K (3456 x 2160) OLED Touch Display with 100% DCI-P3 Color",
      "Intel Core i9-13900H 14-core Processor with Turbo Boost up to 5.4GHz",
      "32GB LPDDR5 RAM and fast 1TB PCIe 4.0 NVMe SSD Storage",
      "Backlit Keyboard, Precision Glass Touchpad, Thunderbolt 4 Ports",
    ]),
    specs: JSON.stringify({
      Display: "15.6-inch 3.5K OLED Touch",
      Processor: "Intel Core i9-13900H",
      RAM: "32GB LPDDR5",
      Storage: "1TB PCIe Gen4 SSD",
      OS: "Windows 11 Pro",
    }),
  },
  {
    id: "prod-103",
    title: "Apex Vision 65\" 4K Ultra HD QLED Smart TV (HDR10+, Dolby Vision)",
    brand: "ApexVision",
    categorySlug: "electronics",
    price: 649.99,
    listPrice: 899.99,
    discountPercent: 28,
    rating: 4.6,
    reviewCount: 3150,
    inStock: true,
    stockCount: 12,
    isBestSeller: true,
    isApexChoice: false,
    primeEligible: true,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&auto=format&fit=crop&q=80",
    ]),
    description: "Transform your home theater experience with quantum dot technology, delivering over a billion shades of realistic color and ultra-sharp contrast.",
    features: JSON.stringify([
      "Quantum Dot QLED 4K Panel with 120Hz Native Refresh Rate",
      "Dolby Vision IQ and HDR10+ Adaptive Brightness Sensing",
      "Built-in Voice Assistant & Smart TV Hub with all major streaming apps",
      "Game Accelerator Mode with HDMI 2.1 VRR & FreeSync Premium",
    ]),
    specs: JSON.stringify({
      "Screen Size": "65 Inches",
      Display: "QLED 4K UHD",
      "Refresh Rate": "120Hz",
      HDMI: "4 Ports (2x HDMI 2.1)",
      Sound: "Dolby Atmos 40W 2.1 Speaker System",
    }),
  },
  {
    id: "prod-104",
    title: "FitPulse Pro Smartwatch & Fitness Tracker with AMOLED & ECG Monitor",
    brand: "PulseTech",
    categorySlug: "electronics",
    price: 149.99,
    listPrice: 199.99,
    discountPercent: 25,
    rating: 4.5,
    reviewCount: 2190,
    inStock: true,
    stockCount: 22,
    isBestSeller: false,
    isApexChoice: true,
    primeEligible: true,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80",
    ]),
    description: "Track your health, workouts, and stay connected with a vibrant always-on AMOLED display and precision biometric sensors.",
    features: JSON.stringify([
      "Continuous Heart Rate, SpO2 Oxygen, and Sleep Stage Tracking",
      "Built-in Multi-System GPS for precise outdoor distance tracking",
      "5 ATM Water Resistance rating (safe for swimming up to 50 meters)",
      "Up to 12 days battery life on a single fast wireless magnetic charge",
    ]),
    specs: JSON.stringify({
      Display: '1.43" Always-On AMOLED',
      "Water Resistance": "5 ATM (50m)",
      "Battery Life": "Up to 12 Days",
      Compatibility: "iOS & Android",
    }),
  },
  {
    id: "prod-105",
    title: "Apex Home Smart Hub & HD Security Camera 2-Pack",
    brand: "ApexHome",
    categorySlug: "smart-home",
    price: 89.99,
    listPrice: 129.99,
    discountPercent: 31,
    rating: 4.6,
    reviewCount: 3890,
    inStock: true,
    stockCount: 30,
    isBestSeller: true,
    isApexChoice: true,
    primeEligible: true,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop&q=80",
    ]),
    description: "Keep watch over your home with crystal-clear 1080p Full HD video, color night vision, motion alerts, and two-way audio.",
    features: JSON.stringify([
      "1080p Full HD Video Recording with Color Night Vision",
      "Smart Motion Detection with customizable activity zones",
      "Two-Way Audio with noise-canceling microphone",
      "Works with Alexa and Google Assistant voice commands",
    ]),
    specs: JSON.stringify({
      Resolution: "1080p Full HD",
      "Field of View": "130 Degrees",
      Power: "Plug-in / Solar Capable",
      Storage: "Cloud & Local MicroSD Card Slot",
    }),
  },
  {
    id: "prod-106",
    title: "RoboClean X9 Self-Emptying Robot Vacuum & Sonic Mop",
    brand: "CleanTech",
    categorySlug: "smart-home",
    price: 399.99,
    listPrice: 599.99,
    discountPercent: 33,
    rating: 4.7,
    reviewCount: 1840,
    inStock: true,
    stockCount: 14,
    isBestSeller: true,
    isApexChoice: false,
    primeEligible: true,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&auto=format&fit=crop&q=80",
    ]),
    description: "Hands-free cleaning for up to 60 days. LiDAR laser navigation builds precise 3D floor maps for deep carpet vacuuming and hard floor mopping.",
    features: JSON.stringify([
      "Automatic Self-Emptying Station holds 60 days of dust & debris",
      "LiDAR Laser 3D Obstacle Avoidance & Multi-Floor Mapping",
      "5000Pa Extreme Suction Power handles pet hair effortlessly",
      "Sonic Mopping mops up to 3000 times per minute for stubborn spots",
    ]),
    specs: JSON.stringify({
      "Suction Power": "5000Pa",
      Dustbin: "Self-Emptying 2.5L Base",
      Runtime: "180 Minutes",
      Mapping: "LiDAR 3D Laser",
    }),
  },
  {
    id: "prod-107",
    title: "Smart Wi-Fi LED Light Strip 32.8ft - RGBIC Color Chasing",
    brand: "Lumina",
    categorySlug: "smart-home",
    price: 29.99,
    listPrice: 44.99,
    discountPercent: 33,
    rating: 4.4,
    reviewCount: 5120,
    inStock: true,
    stockCount: 50,
    isBestSeller: false,
    isApexChoice: false,
    primeEligible: true,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    ]),
    description: "Illuminate your living room or gaming setup with segmented RGBIC colors, music sync modes, and smart phone app customization.",
    features: JSON.stringify([
      "Segmented RGBIC Technology displays multiple colors on one strip",
      "Music Sync Mode flashes colors in rhythm with ambient audio",
      "Voice Control via Alexa & Google Assistant",
      "Easy peel-and-stick installation on TV backs, desks, or ceilings",
    ]),
    specs: JSON.stringify({
      Length: "32.8 Feet (10m)",
      Connectivity: "2.4GHz Wi-Fi / Bluetooth",
      "Color Options": "16 Million Colors",
    }),
  },
  {
    id: "prod-108",
    title: "Men's WeatherShield All-Season Insulated Waterproof Jacket",
    brand: "ApexOutfit",
    categorySlug: "fashion-apparel",
    price: 89.99,
    listPrice: 129.99,
    discountPercent: 31,
    rating: 4.6,
    reviewCount: 1560,
    inStock: true,
    stockCount: 25,
    isBestSeller: true,
    isApexChoice: true,
    primeEligible: true,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80",
    ]),
    description: "Engineered for outdoor durability and urban style. Windproof shell, thermal reflective lining, and sealed storm zippers.",
    features: JSON.stringify([
      "10,000mm Waterproof & Breathable Membrane Fabric",
      "Removable Fleece Inner Layer for multi-season versatility",
      "Adjustable Hood, Storm Cuffs, and Internal Security Pockets",
    ]),
    specs: JSON.stringify({
      Material: "100% Nylon Shell / Polyester Fleece",
      Fit: "Regular Outdoor Fit",
      Care: "Machine Washable",
    }),
  },
  {
    id: "prod-109",
    title: "Women's AirStride Lightweight Breathable Running Shoes",
    brand: "Strider",
    categorySlug: "fashion-apparel",
    price: 64.99,
    listPrice: 89.99,
    discountPercent: 28,
    rating: 4.7,
    reviewCount: 3410,
    inStock: true,
    stockCount: 18,
    isBestSeller: true,
    isApexChoice: false,
    primeEligible: true,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
    ]),
    description: "Featherweight knit mesh running sneakers with responsive memory foam cushioning for maximum joint comfort during road runs or gym workouts.",
    features: JSON.stringify([
      "Engineered Breathable Mesh Upper keeps feet cool and dry",
      "High-Density Cloud Foam Midsole delivers springy energy return",
      "Durable Non-slip Rubber Outsole with multidirectional traction",
    ]),
    specs: JSON.stringify({
      Upper: "Knit Fabric",
      Sole: "EVA & Non-Marking Rubber",
      Weight: "210g per shoe",
    }),
  },
  {
    id: "prod-110",
    title: "UrbanExplorer Anti-Theft Water-Resistant Travel Laptop Backpack 17\"",
    brand: "TravelPro",
    categorySlug: "fashion-apparel",
    price: 49.99,
    listPrice: 79.99,
    discountPercent: 38,
    rating: 4.8,
    reviewCount: 6890,
    inStock: true,
    stockCount: 40,
    isBestSeller: true,
    isApexChoice: true,
    primeEligible: true,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    ]),
    description: "Spacious 35L capacity travel backpack with padded laptop sleeve, USB charging port passthrough, and hidden anti-theft back pocket.",
    features: JSON.stringify([
      "TSA-Friendly 180-degree opening design for quick security checks",
      "Built-in External USB Port for convenient phone charging",
      "Ergonomic padded shoulder straps with breathable mesh back panel",
    ]),
    specs: JSON.stringify({
      Capacity: "35 Liters",
      "Laptop Size": "Up to 17.3 Inches",
      Dimensions: '19.5" x 13.5" x 7.5"',
    }),
  },
  {
    id: "prod-111",
    title: "ChefPro 15-Piece German Stainless Steel Knife Block Set",
    brand: "CulinaryCraft",
    categorySlug: "home-kitchen",
    price: 119.99,
    listPrice: 179.99,
    discountPercent: 33,
    rating: 4.8,
    reviewCount: 4120,
    inStock: true,
    stockCount: 16,
    isBestSeller: true,
    isApexChoice: true,
    primeEligible: true,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&auto=format&fit=crop&q=80",
    ]),
    description: "Forged high-carbon German stainless steel knife blades with ergonomic full-tang handles and an acacia wooden storage block with built-in sharpener.",
    features: JSON.stringify([
      "15 Essential Pieces including 8\" Chef Knife, Santoku, Bread, and Steak Knives",
      "Precision-honed edges stay sharp up to 5x longer",
      "Built-in Ceramic Blade Sharpener right inside the hardwood block",
    ]),
    specs: JSON.stringify({
      Steel: "German High-Carbon X50Cr15",
      Block: "Natural Hardwood Acacia",
      Pieces: "15 Pieces",
    }),
  },
  {
    id: "prod-112",
    title: "BaristaTouch Automatic Espresso Machine with Milk Frother",
    brand: "AuraCoffee",
    categorySlug: "home-kitchen",
    price: 349.99,
    listPrice: 499.99,
    discountPercent: 30,
    rating: 4.7,
    reviewCount: 2980,
    inStock: true,
    stockCount: 10,
    isBestSeller: false,
    isApexChoice: true,
    primeEligible: true,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80",
    ]),
    description: "Craft cafe-quality lattes, cappuccinos, and espresso shots right at home with 20-bar Italian pump pressure and microfoam steam wand.",
    features: JSON.stringify([
      "20-Bar Professional Italian Pump for rich espresso crema extraction",
      "Adjustable Precision Stainless Steel Steam Wand for micro-foam milk texturing",
      "Pre-Infusion Function ensures smooth and balanced coffee flavors",
    ]),
    specs: JSON.stringify({
      Pressure: "20 Bar",
      "Water Tank": "1.8 Liter Removable",
      Heater: "Thermo-block Fast Heating",
    }),
  },
  {
    id: "prod-113",
    title: "AirFryer Deluxe 6.5-Quart Digital Touchscreen Oven",
    brand: "ChefTech",
    categorySlug: "home-kitchen",
    price: 79.99,
    listPrice: 119.99,
    discountPercent: 33,
    rating: 4.6,
    reviewCount: 7850,
    inStock: true,
    stockCount: 35,
    isBestSeller: true,
    isApexChoice: false,
    primeEligible: true,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&auto=format&fit=crop&q=80",
    ]),
    description: "Enjoy crispy, fried favorites with up to 85% less fat than traditional deep frying. 8 one-touch cooking presets for effortless family meals.",
    features: JSON.stringify([
      "360-degree Rapid Air Circulation technology cooks food evenly and fast",
      "Nonstick, BPA-Free Dishwasher Safe Basket",
      "8 One-Touch Cooking Presets: Fries, Chicken, Steak, Seafood, Bake & more",
    ]),
    specs: JSON.stringify({
      Capacity: "6.5 Quarts",
      Power: "1700 Watts",
      Temperature: "170°F - 400°F",
    }),
  },
  {
    id: "prod-114",
    title: "Designing Data-Intensive Applications (Hardcover)",
    brand: "O'Reilly Media",
    categorySlug: "books-kindle",
    price: 38.99,
    listPrice: 59.99,
    discountPercent: 35,
    rating: 4.9,
    reviewCount: 9420,
    inStock: true,
    stockCount: 45,
    isBestSeller: true,
    isApexChoice: true,
    primeEligible: true,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    ]),
    description: "The definitive guide to the architecture, trade-offs, and principles of modern data systems. Learn how to process, store, and scale distributed applications.",
    features: JSON.stringify([
      "Comprehensive deep dive into relational DBs, NoSQL, stream processing & consensus",
      "Written by Martin Kleppmann",
      "Essential reading for software architects and senior engineers",
    ]),
    specs: JSON.stringify({
      Format: "Hardcover / Kindle",
      Pages: "616 Pages",
      Language: "English",
      Publisher: "O'Reilly Media",
    }),
  },
  {
    id: "prod-115",
    title: "Apex Paperwhite E-Reader 6.8\" Display with Adjustable Warm Light",
    brand: "ApexRead",
    categorySlug: "books-kindle",
    price: 139.99,
    listPrice: 169.99,
    discountPercent: 18,
    rating: 4.8,
    reviewCount: 11200,
    inStock: true,
    stockCount: 20,
    isBestSeller: true,
    isApexChoice: true,
    primeEligible: true,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=800&auto=format&fit=crop&q=80",
    ]),
    description: "Read comfortably anywhere with a glare-free 300 ppi Paperwhite display that looks like real paper, even in bright sunlight.",
    features: JSON.stringify([
      "6.8\" Glare-Free 300 ppi Display with flush-front design",
      "Adjustable Warm Light shifts screen shade from white to amber",
      "IPX8 Waterproof rating for pool and bath reading",
      "Single USB-C charge lasts up to 10 weeks of reading",
    ]),
    specs: JSON.stringify({
      Screen: '6.8" 300 ppi Glare-Free',
      Storage: "16GB (holds thousands of books)",
      "Battery Life": "Up to 10 Weeks",
      Waterproofing: "IPX8 Rated",
    }),
  },
  {
    id: "prod-116",
    title: "ProGrip Adjustable Dumbbell Set (10 lbs to 50 lbs)",
    brand: "FitIron",
    categorySlug: "fitness-sports",
    price: 249.99,
    listPrice: 349.99,
    discountPercent: 29,
    rating: 4.7,
    reviewCount: 2150,
    inStock: true,
    stockCount: 12,
    isBestSeller: true,
    isApexChoice: true,
    primeEligible: true,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80",
    ]),
    description: "Replace 5 sets of weights with one compact adjustable dumbbell. Quick-turn dial mechanism shifts weight instantly between 10 to 50 pounds.",
    features: JSON.stringify([
      "Rapid Dial Weight Selection in 5 lb increments",
      "Heavy-Duty Molded Steel Weight Plates for quiet lifting",
      "Space-saving design ideal for home gym workout spaces",
    ]),
    specs: JSON.stringify({
      "Weight Range": "10 to 50 lbs per dumbbell",
      Material: "Machined Alloy Steel",
      Increments: "5 lb steps",
    }),
  },
  {
    id: "prod-117",
    title: "EcoZen Non-Slip Premium Extra Thick Yoga & Pilates Mat",
    brand: "EcoZen",
    categorySlug: "fitness-sports",
    price: 34.99,
    listPrice: 49.99,
    discountPercent: 30,
    rating: 4.6,
    reviewCount: 3840,
    inStock: true,
    stockCount: 60,
    isBestSeller: false,
    isApexChoice: false,
    primeEligible: true,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop&q=80",
    ]),
    description: "Dual-sided textured surface provides exceptional grip and floor traction. 6mm thick eco-friendly TPE cushioning protects knees and joints.",
    features: JSON.stringify([
      "High-Density 6mm TPE Material is non-toxic and tear-resistant",
      "Includes Carrying Strap for easy gym transport",
      "Sweat-resistant surface wipes clean effortlessly",
    ]),
    specs: JSON.stringify({
      Thickness: "6mm",
      Dimensions: '72" L x 24" W',
      Material: "Eco-Friendly TPE",
    }),
  },
];

async function main() {
  console.log("🌱 Starting ApexMart database seeding...");

  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  const categoryMap: Record<string, string> = {};
  for (const cat of CATEGORIES_DATA) {
    const createdCat = await prisma.category.create({
      data: cat,
    });
    categoryMap[cat.slug] = createdCat.id;
    console.log(`Created Category: ${cat.name} (${createdCat.id})`);
  }

  for (const prod of PRODUCTS_DATA) {
    const { categorySlug, ...prodDetails } = prod;
    const categoryId = categoryMap[categorySlug];
    
    if (!categoryId) {
      console.warn(`Category slug not found: ${categorySlug}`);
      continue;
    }

    const createdProd = await prisma.product.create({
      data: {
        ...prodDetails,
        categoryId,
      },
    });
    console.log(`Created Product: ${createdProd.title.slice(0, 30)}... (${createdProd.id})`);
  }

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
