// WHY: Lazy loading reduces initial bundle, memoization prevents
// unnecessary re-renders, and optimized images improve Core Web Vitals.

"use client";

import { lazy, Suspense, memo, useMemo } from "react";
import Image from "next/image";

const HeavyChart = lazy(() => import("./heavy-chart"));

interface ProductListProps {
  products: Array<{ id: string; name: string; price: number; image: string }>;
  sortBy: "price" | "name";
}

function ProductCard({ product }: { product: ProductListProps["products"][number] }) {
  return (
    <div className="p-4 border rounded-lg">
      <Image
        src={product.image}
        alt={product.name}
        width={200}
        height={200}
        sizes="(max-width: 768px) 100vw, 200px"
        placeholder="blur"
        blurDataURL="/placeholder.png"
        className="rounded-md"
      />
      <h3 className="font-medium mt-2">{product.name}</h3>
      <p className="text-primary font-semibold">${product.price.toFixed(2)}</p>
    </div>
  );
}

const MemoizedProductCard = memo(ProductCard);

export function ProductList({ products, sortBy }: ProductListProps) {
  const sorted = useMemo(
    () => [...products].sort((a, b) => (sortBy === "price" ? a.price - b.price : a.name.localeCompare(b.name))),
    [products, sortBy]
  );

  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sorted.map((product) => (
          <MemoizedProductCard key={product.id} product={product} />
        ))}
      </section>
      <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
        <HeavyChart data={sorted} />
      </Suspense>
    </div>
  );
}
