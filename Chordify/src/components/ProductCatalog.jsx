import React from "react";
import ProductCard from "./ProductCard";

export default function ProductCatalog({ products }) {
  return (
    <div className="bg-zinc-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Product Catalog</h3>
        <button className="text-orange-500 hover:text-orange-400 text-sm">View All &gt;</button>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
