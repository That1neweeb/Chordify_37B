import React from "react";
import { Edit2, Trash2, Package } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="bg-zinc-700 rounded-lg p-4">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <Package className="text-white" size={24} />
        </div>

        <div className="flex-1">
          <h4 className="font-semibold">{product.name}</h4>
          <p className="text-sm text-gray-400">{product.category}</p>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-gray-400">Stock: {product.stock}</span>
            <span
              className={`px-2 py-1 rounded text-xs ${
                product.status === "In Stock"
                  ? "bg-green-900 text-green-300"
                  : "bg-yellow-900 text-yellow-300"
              }`}
            >
              {product.status}
            </span>
          </div>
        </div>

        <div className="text-right">
          <p className="font-semibold">{product.price}</p>
          <p className="text-sm text-gray-400">{product.sold}</p>

          <div className="flex gap-2 mt-2">
            <button className="text-blue-400 hover:text-blue-300">
              <Edit2 size={16} />
            </button>
            <button className="text-orange-500 hover:text-orange-400">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
