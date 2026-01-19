// src/components/ProductCatalog.jsx
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { setActiveMenu } = useOutletContext();

  // Fetch approved products for user
  useEffect(() => {
    axios
      .get("http://localhost:5000/product/approved")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-zinc-800 rounded-lg p-6">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-semibold">Product Catalog</h3>
        <button
          onClick={() => {
            setActiveMenu("Product Listing");
            navigate("/products");
          }}
          className="text-orange-500"
        >
          View All &gt;
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-400">No approved products yet</p>
      ) : (
        <div className="space-y-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
