# NovaTech E-Commerce Platform

NovaTech is a modern, high-performance e-commerce application built with Next.js 14, TypeScript, and Tailwind CSS. This repository contains the source code for the frontend application, API routes, and database integration.

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (via Mongoose)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure & Key Files

This section explains the responsibility of major files and directories in the codebase.

### Core Configuration

- **`package.json`**: Defines project dependencies, scripts (dev, build, start), and metadata.
- **`next.config.js`**: Configuration for Next.js, including image domain whitelisting (e.g., `images.unsplash.com`) and experimental features.
- **`tailwind.config.ts`**: Configuration for Tailwind CSS, including custom theme extensions, colors, and animation keyframes.
- **`tsconfig.json`**: TypeScript compiler options and path aliases.

### App Router (`/app`)

The `app` directory contains the application's routes and page logic.

- **`layout.tsx`**: The root layout component that wraps the entire application. It handles:
  - Global font loading (Inter).
  - Metadata (SEO titles and descriptions).
  - Global providers (e.g., Toast notifications).
  - Structure (Navbar and Footer).
- **`page.tsx`**: The homepage of the application. It features:
  - Hero section with cinematic video background.
  - Infinite scrolling marquee of featured products.
  - Featured product grid.
- **`globals.css`**: Global CSS styles, including Tailwind directives and custom CSS variables for theming.

#### Routes
- **`shop/page.tsx`**: The main shop page displaying a grid of all available products.
- **`shop/[id]/page.tsx`**: Dynamic route for individual product details. Fetches and displays specific product information based on the ID.
- **`cart/page.tsx`**: The shopping cart page where users can review added items and proceed to checkout.
- **`about/page.tsx`**: Information about the NovaTech brand.
- **`admin/`**: Administrative dashboard routes (protected).

#### API Routes (`/app/api`)
- **`api/products/route.ts`**: Handles GET requests to fetch products from the MongoDB database. Used by the frontend to populate product lists.

### Components (`/components`)

Reusable UI building blocks.

#### Layout (`/components/layout`)
- **`Navbar.tsx`**: The top navigation bar. Includes links to pages, the logo, and the cart icon with a dynamic item count.
- **`Footer.tsx`**: The site footer containing links, newsletter signup, and copyright info.
- **`CommandMenu.tsx`**: A "Command+K" style modal for quick search and navigation across the site.

#### Shop (`/components/shop`)
- **`AddToCartButton.tsx`**: A client component that handles adding items to the global cart state. Includes interaction feedback.
- **`ProductImages.tsx`**: Handles the display of product images, likely including gallery features or zoom capabilities.

#### UI (`/components/ui`)
- Contains generic, reusable UI elements like buttons, inputs, and cards.

### Data & State Management

- **`lib/db.ts`**: Manages the connection to the MongoDB database. It ensures a cached connection is reused in serverless environments to prevent connection exhaustion.
- **`models/Product.ts`**: Defines the Mongoose schema and model for `Product` documents. Specifies fields like name, price, description, images, and category.
- **`store/useCartStore.ts`**: A global state store built with Zustand. It manages:
  - The list of items in the cart.
  - Actions to add, remove, and update quantities.
  - Persisting cart data to local storage.

### Scripts (`/scripts`)

- **`seed.ts`**: A utility script to populate the database with initial sample data. It clears existing products and inserts a predefined set of high-quality demo products. Run via `npx ts-node scripts/seed.ts`.

## 🚀 Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Set up environment variables**:
    Create a `.env.local` file with your MongoDB connection string:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    ```

3.  **Seed the database**:
    ```bash
    npx ts-node scripts/seed.ts
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
