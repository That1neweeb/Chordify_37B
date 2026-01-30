// src/pages/ProductListing.jsx
import React, { useState, useEffect } from "react";
import ProductTable from "../../components/Adminpart/product/ProductTable";
import useApi from "../../hooks/useApi";
import toast from "react-hot-toast";

export default function ProductListing() {
  const { callApi, loading, error } = useApi();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch pending products
  const fetchPendingProducts = async () => {
    try {
      const data = await callApi("get", "/product/pending");
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      setProducts([]);
      toast.error("Failed to fetch products!");
    }
  };

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-white mb-4">
        Product Listing
      </h1>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 rounded bg-zinc-700 text-white mb-4"
      />

      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Conditional rendering */}
      {filteredProducts.length === 0 ? (
        <p className="text-white">No products found</p>
      ) : (
      <ProductTable
        products={filteredProducts}
        fetchPendingProducts={fetchPendingProducts}
      />
      )}
    </div>
  );
}

