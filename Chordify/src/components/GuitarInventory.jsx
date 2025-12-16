import React from "react";
import GuitarInventoryCard from "./GuitarInventoryCard";

export default function GuitarInventory({ guitars }) {
  return (
    <div className="bg-zinc-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Guitar Inventory</h3>
        <button className="text-orange-500 hover:text-orange-400 text-sm">View All &gt;</button>
      </div>

      <div className="space-y-4">
        {guitars.map((guitar) => (
          <GuitarInventoryCard key={guitar.id} guitar={guitar} />
        ))}
      </div>
    </div>
  );
}
