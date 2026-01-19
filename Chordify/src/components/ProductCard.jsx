// src/components/ProductCard.jsx
import React from "react";
import { Package } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="bg-zinc-700 rounded-lg p-4">
      <div className="flex gap-4">
        <div className="w-12 h-12 bg-pink-500 rounded flex items-center justify-center">
          <Package className="text-white" />
        </div>

        <div className="flex-1">
          <h4 className="font-semibold">{product.name}</h4>
          <p className="text-sm text-gray-400">{product.category}</p>

          <div className="mt-2 text-sm text-gray-300">
            Stock: {product.stock}
          </div>

          <div className="mt-1 font-semibold">
            Rs. {product.price}
          </div>
        </div>
      </div>
    </div>
  );
}
