import GuitarCard from "../components/GuitarCard";
import searchIcon from "../assets/images/search.png";
import { useEffect, useState, useRef } from "react";
import { useApi } from "../hooks/useAPI.js";

function Buy() {
  const { loading, error, callApi } = useApi();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    condition: "",
    minPrice: "",
    maxPrice: "",
  });

  const debounceRef = useRef(null);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const req = await callApi("GET", "/products/buy", {});
      setProducts(req.data);
    } catch (err) {
      console.error("Fetch products error:", err.message);
    }
  };

  // Fetch products by search
  const fetchSearchResults = async (query) => {
    if (!query) {
      fetchProducts();
      return;
    }

    try {
      const res = await callApi("GET", "/products/search", {
        params: { search: query },
      });
      setProducts(res);
    } catch (err) {
      console.error("Search error:", err.message);
    }
  };

  // Apply filters
  const applyFilters = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await callApi("GET", `/products/filter?${query}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Filter error:", err.message);
    }
  };

  // Debounced search
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchSearchResults(value);
    }, 500);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="pb-10">
      {/* Search Bar */}
      <div
        className="flex items-center m-10 gap-2 rounded-xl border"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--border-color)",
        }}
      >
        <img src={searchIcon} alt="search" className="size-6 ml-4 icon" />
        <input
          type="text"
          placeholder="Search product by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full m-2 h-10 bg-transparent focus:outline-none"
          style={{ color: "var(--text-color)" }}
        />
      </div>

      <div className="flex justify-around mr-8 mt-20">
        {/* Filters Sidebar */}
        <div
          className="w-64 h-[800px] rounded-2xl ml-5 p-4 border"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
          }}
        >
          <h2 className="text-xl font-bold mb-4">Filters</h2>

          {/* Category */}
          <label className="block mb-2">Category</label>
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="w-full mb-4 p-2 rounded border"
            style={{
              backgroundColor: "var(--button-bg)",
              color: "var(--text-color)",
              borderColor: "var(--border-color)",
            }}
          >
            <option value="">All</option>
            <option value="guitar">Guitar</option>
            <option value="accessories">Accessories</option>
          </select>

          {/* Brand */}
          <label className="block mb-2">Brand</label>
          <input
            type="text"
            placeholder="Brand name"
            value={filters.brand}
            onChange={(e) =>
              setFilters({ ...filters, brand: e.target.value })
            }
            className="w-full mb-4 p-2 rounded border"
            style={{
              backgroundColor: "var(--button-bg)",
              color: "var(--text-color)",
              borderColor: "var(--border-color)",
            }}
          />

          {/* Condition */}
          <label className="block mb-2">Condition</label>
          <select
            value={filters.condition}
            onChange={(e) =>
              setFilters({ ...filters, condition: e.target.value })
            }
            className="w-full mb-4 p-2 rounded border"
            style={{
              backgroundColor: "var(--button-bg)",
              color: "var(--text-color)",
              borderColor: "var(--border-color)",
            }}
          >
            <option value="">All</option>
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>

          {/* Price */}
          <label className="block mb-2">Price Range</label>
          <div className="flex gap-2 mb-4">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({ ...filters, minPrice: e.target.value })
              }
              className="w-1/2 p-2 rounded border"
              style={{
                backgroundColor: "var(--button-bg)",
                color: "var(--text-color)",
                borderColor: "var(--border-color)",
              }}
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: e.target.value })
              }
              className="w-1/2 p-2 rounded border"
              style={{
                backgroundColor: "var(--button-bg)",
                color: "var(--text-color)",
                borderColor: "var(--border-color)",
              }}
            />
          </div>

          <button
            onClick={applyFilters}
            className="w-full py-2 rounded font-semibold"
            style={{
              color: "var(--link-hover)",
              borderColor: "var(--link-hover)",
              backgroundColor: "transparent",
            }}
          >
            Apply Filters
          </button>
        </div>

        {/* Products */}
        <div className="ml-12 flex-1">
          <h1 className="text-4xl font-bold mb-6">Products</h1>

          <div className="grid grid-cols-3 gap-x-20 gap-y-20">
            {products.map((product) => (
              <GuitarCard
                key={product.id}
                id={product.id}
                guitarName={product.name}
                image={`http://localhost:5000${product.image_urls[0]}`}
                price={product.price}
                rating={product.rating}
                brand={product.brand}
                page="buying"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buy;
