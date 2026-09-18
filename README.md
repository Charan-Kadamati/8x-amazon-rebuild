# ApexMart — Amazon E-Commerce Rebuild (8x Assignment)

**ApexMart** is a full-featured, responsive e-commerce web application inspired by Amazon. Built with Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, and Lucide Icons, it reproduces the core shopping journey from discovery to checkout with rich aesthetics, real-time cart persistence, and dynamic filtering.

> **Note:** This project is an original Amazon-inspired e-commerce rebuild created for the 8x assignment demonstration.

---

## 🚀 Key Features

- **Dynamic Homepage**: High-impact promotional hero carousel, value proposition highlights, category quick selection grid, Today's Super Deals, Best Sellers, and Apex Choice sections.
- **Advanced Search & Filtering**: Multi-facet search page supporting department filters, customer star ratings (1-5 stars), price range presets, Prime shipping toggle, and dynamic sorting (Price low/high, ratings, best sellers).
- **Rich Product Detail Pages**: Breadcrumb navigation, interactive thumbnail image gallery, discount badge calculations (`-33%`), key bullet points, technical specs table, live stock status, and customer review distributions.
- **Shopping Cart & Persistence**: Full cart state powered by React Context and `localStorage`. Includes quantity controls (1-10+), item deletion, subtotal calculations, estimated 8% tax, and a dynamic Free Shipping progress indicator.
- **Seamless Multi-Step Checkout**: Full checkout experience with shipping address input, payment method selection (credit card / Apex Pay), order summary breakdown, and order placement.
- **Order Confirmation**: Order success page with randomized order numbers (`114-XXXXXXX`), guaranteed delivery date estimates, and summary of purchased items.
- **Responsive & Accessible UI**: Responsive layout for mobile, tablet, and desktop viewports, complete with a slide-out mobile drawer menu.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI & Logic**: React 19, TypeScript
- **Styling**: Tailwind CSS, Vanilla CSS
- **Icons**: [Lucide React](https://lucide.react.dev/)
- **State Management**: React Context API (`CartContext`) + LocalStorage
- **Deployment**: Vercel ready

---

## 🛍️ Main User Flow

1. **Home (`/`)**: Browse curated deals, hero promotions, and top categories.
2. **Search (`/search`)**: Search items by keyword (`?q=`), filter by department, price, rating, or Prime eligibility, and sort results.
3. **Product Details (`/product/[id]`)**: Preview product gallery, read technical specifications, select quantity, and add to cart.
4. **Shopping Cart (`/cart`)**: View cart contents, adjust quantities, verify free shipping status, and view tax/subtotal summaries.
5. **Checkout (`/checkout`)**: Enter shipping address, payment credentials, and place order.
6. **Confirmation (`/confirmation`)**: Receive order number and delivery date confirmation.

---

## 💻 Local Setup Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Charan-Kadamati/8x-amazon-rebuild.git
   cd 8x-amazon-rebuild
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Start production server:**
   ```bash
   npm run start
   ```

---

## 🌐 Production Deployment (Vercel)

This application is optimized for zero-configuration deployment on **Vercel**:

1. Push your changes to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Framework Preset: **Next.js**.
4. Build Command: `npm run build`.
5. Deploy.

---

## 📊 Verification & Logs Capture

This repository includes full session transcript logging for the 8x capture verification:
- Real-time agent session logs are preserved in `.agent-logs/`.
- Log aggregator script available at `scripts/sync_logs.py`.
- Verification notes recorded in `CAPTURE-TEST.md`.
