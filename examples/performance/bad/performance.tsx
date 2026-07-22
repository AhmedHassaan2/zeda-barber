// WHY WRONG: No lazy loading, no memoization, no image optimization.
// Every re-render re-sorts and re-renders everything.

"use client";

export function ProductList({ products, sortBy }: any) {
  const sorted = [...products].sort((a: any, b: any) => {
    if (sortBy === "price") return a.price - b.price;
    return a.name.localeCompare(b.name);
  });

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {sorted.map((product: any) => (
          <div key={product.id} style={{ padding: "16px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
            <h3 style={{ fontWeight: 500, marginTop: "8px" }}>{product.name}</h3>
            <p style={{ color: "#1565c0", fontWeight: 600 }}>${product.price}</p>
          </div>
        ))}
      </div>
      {/* Heavy component loaded eagerly — blocks initial render */}
      <HeavyChart data={sorted} />
    </div>
  );
}
