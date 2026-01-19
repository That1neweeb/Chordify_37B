// src/pages/ProductListing.jsx
import React, { useState, useEffect } from "react";
import ProductTable from "../components/ProductTable";
import axios from "axios";

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch pending products for admin
  const fetchPendingProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/product/pending");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  // Filter based on search
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-white mb-4">
        Product Listing (Admin)
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 rounded bg-zinc-700 text-white mb-4"
      />

      {/* Product Table */}
      <ProductTable products={filteredProducts} fetchPendingProducts={fetchPendingProducts} />
    </div>
  );
}
