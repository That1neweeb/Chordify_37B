import { useState, useEffect } from "react";
import ProductTable from "../../components/ProductTable";
import useApi from "../../hooks/useAPI";
import {toast} from "react-toastify";

export default function ProductListing() {
  const { callApi, loading, error } = useApi();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


    const handleApprove = async (id) => {
    try {
      await callApi("PATCH", `/admin/products/${id}/approve`);
      toast.success("Product approved!");
      fetchPendingProducts(); // refresh the table
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to approve product");
    }
  };

  const handleReject = async (id) => {
    try {
      await callApi("PATCH", `/admin/products/${id}/reject`);
      toast.success("Product rejected!");
      fetchPendingProducts(); // refresh the table
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to reject product");
    }
  };


 // Fetch pending products
  const fetchPendingProducts = async () => {
    try {
      const res = await callApi("GET", "/admin/products/pending");
      setProducts(res.data);
      
      
    } catch (err) {
      setProducts([]);
      toast.error("Failed to fetch pending products:", err);
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
        onApprove={handleApprove}
        onReject={handleReject}
      />
      )}
    </div>
  );
}

