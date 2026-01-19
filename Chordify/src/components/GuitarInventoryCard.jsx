import React from "react";
import { Music } from "lucide-react";
import { approveGuitar, rejectGuitar } from "../api.js";

export default function GuitarInventoryCard({ guitar, refreshGuitars }) {
  const handleApprove = (id) => {
    approveGuitar(id)
      .then(() => {
        alert("Guitar approved!");
        refreshGuitars(); // refresh parent list
      })
      .catch((err) => console.error(err));
  };

  const handleReject = (id) => {
    rejectGuitar(id)
      .then(() => {
        alert("Guitar rejected!");
        refreshGuitars(); // refresh parent list
      })
      .catch((err) => console.error(err));
  };

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
            <button
              className="bg-lime-500 text-black px-3 py-1 rounded font-bold"
              onClick={() => handleApprove(guitar.id)}
            >
              Approve
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded font-bold"
              onClick={() => handleReject(guitar.id)}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
