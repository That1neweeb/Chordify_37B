import React from "react";
import { Edit2, Trash2, Music } from "lucide-react";

export default function GuitarInventoryCard({ guitar }) {
  return (
    <div className="bg-zinc-700 rounded-lg p-4">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <Music className="text-white" size={24} />
        </div>

        <div className="flex-1">
          <h4 className="font-semibold">{guitar.name}</h4>
          <p className="text-sm text-gray-400">{guitar.brand}</p>

          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-400">Stock: {guitar.stock}</span>
            <span className="text-sm text-gray-400">{guitar.condition}</span>
          </div>
        </div>

        <div className="text-right">
          <p className="font-semibold">{guitar.price}</p>
          <p className="text-sm text-gray-400">{guitar.sold}</p>
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
