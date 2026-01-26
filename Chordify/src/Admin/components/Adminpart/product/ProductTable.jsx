// src/components/ProductTable.jsx
import React from "react";
import axios from "axios";

export default function ProductTable({ products, fetchPendingProducts }) {

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/product/approve/${id}`);
      alert("Product approved!");
      fetchPendingProducts();
    } catch (err) {
      console.error("Failed to approve product:", err);
      alert("Failed to approve product");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:5000/product/reject/${id}`);
      alert("Product rejected!");
      fetchPendingProducts();
    } catch (err) {
      console.error("Failed to reject product:", err);
      alert("Failed to reject product");
    }
  };

  return (
    <div className="bg-zinc-800 rounded-lg p-6">
      {/* <h2 className="text-xl font-semibold mb-4 text-orange-400">
        Pending Products
      </h2> */}

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-zinc-700">
              <th className="py-3 px-4 text-orange-400">Name</th>
              <th className="py-3 px-4 text-orange-400">Category</th>
              <th className="py-3 px-4 text-orange-400">Price</th>
              <th className="py-3 px-4 text-orange-400">Stock</th>
              <th className="py-3 px-4 text-orange-400">Status</th>
              <th className="py-3 px-4 text-orange-400">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-zinc-700 hover:bg-zinc-700"
              >
                <td className="py-4 px-4 font-medium">{product.name}</td>
                <td className="py-4 px-4 text-gray-400">{product.category}</td>
                <td className="py-4 px-4">Rs. {product.price}</td>
                <td className="py-4 px-4">{product.stock}</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded text-sm ${
                      product.status === "In Stock"
                        ? "bg-green-900 text-green-300"
                        : "bg-yellow-900 text-yellow-300"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="py-4 px-4 flex gap-2">
                  <button
                    onClick={() => handleApprove(product.id)}
                    className="bg-lime-500 text-black px-3 py-1 rounded font-bold"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(product.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded font-bold"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
