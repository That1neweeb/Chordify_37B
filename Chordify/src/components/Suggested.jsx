import GuitarCard from "./GuitarCard.jsx";
import { useEffect, useState } from "react";
import { useApi } from "../hooks/useAPI.js";
import { useAuth } from "../context/AuthContext.jsx"; 

function Suggested() {
  const { callApi, loading, error } = useApi();
  const [products, setProducts] = useState([]);
  const { user } = useAuth(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await callApi("GET", "/products/suggested");
        setProducts(res.data || []);
      } catch (err) {
        console.error("Fetch error:", err.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="mt-16 sm:mt-20 md:mt-28 px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col gap-4">
      <h2 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-3xl">
        Suggested for you
      </h2>

      {loading && <p>Loading suggested products...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {products.map((product) => (
          <GuitarCard
            key={product.id}
            id={product.id}
            image={`http://localhost:5000${product.image_urls[0]}`}
            guitarName={product.name}
            price={product.price}
            page="landing"
            isLoggedIn={!!user}
          />
        ))}
      </div>
    </div>
  );
}

export default Suggested;
