import GuitarCard from "../components/GuitarCard";
import search from "../assets/images/search.png";
import { useEffect, useState, useRef } from "react";

function Buy() {
  // Products data
  const [products, setProducts] = useState([]);

  // Search term
  const [searchTerm, setSearchTerm] = useState("");

  // Filters
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  // Debounce ref
  const debounceTimeout = useRef(null);

  // Fetch products with optional filters
  async function fetchProducts(filters = {}) {
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await fetch(
        `http://localhost:5000/products/buy?${params}`
      );
      const result = await response.json();
      setProducts(result.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setProducts([]); // fallback
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchProducts();
  }, []);

  // Refetch products when filters change
  useEffect(() => {
    const filters = {};
    if (selectedBrand) filters.brand = selectedBrand;
    if (priceRange.min !== "" && priceRange.max !== "") {
      filters.minPrice = priceRange.min;
      filters.maxPrice = priceRange.max;
    }
    fetchProducts(filters);
  }, [selectedBrand, priceRange]);

  // Handle search input with debounce
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      fetchSearchResults(value);
    }, 500);
  };

  // Fetch search results
  const fetchSearchResults = async (query) => {
    if (!query) {
      fetchProducts();
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/products/search?search=${query}`
      );
      const result = await res.json();
      setProducts(result?.data || result || []);
    } catch (e) {
      console.error("Search error:", e);
      setProducts([]);
    }
  };

  return (
    <div>
      {/* Search area */}
      <div className="flex items-center m-10 gap-2 bg-[#393328] border border-[#374151] rounded-xl hover:border-[#393328]">
        <img src={search} alt="" className="size-6 ml-4" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search product by name ...."
          className="w-full m-2 h-10 focus:outline-none bg-[#393328] text-white"
        />
      </div>

      <div className="flex justify-around mr-8 mt-20">
        {/* Filters */}
        <div className="bg-[#393328] w-64 h-[800px] rounded-2xl ml-5">
          <h1 className="text-2xl font-bold m-6">Filter</h1>

          {/* Brand filter */}
          <div className="m-6">
            <h2 className="text-xl font-semibold mb-4">Brands</h2>
            <ul className="space-y-2">
              {["Fender", "Gibson", "Ibanez", "Yamaha", "Epiphone"].map(
                (brand) => (
                  <li key={brand}>
                    <label className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
                      <input
                        type="radio"
                        name="brand"
                        onChange={() => setSelectedBrand(brand)}
                        className="w-4 h-4 accent-black cursor-pointer"
                      />
                      <span className="font-medium text-white text-base">
                        {brand}
                      </span>
                    </label>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Price filter */}
          <div className="m-6">
            <h2 className="text-xl font-semibold mb-4">Price Range</h2>
            <ul className="space-y-2">
              {[
                { label: "0 – 5,000", min: 0, max: 5000 },
                { label: "5,000 – 10,000", min: 5000, max: 10000 },
                { label: "10,000 – 20,000", min: 10000, max: 20000 },
                { label: "20,000 – 30,000", min: 20000, max: 30000 },
                { label: "30,000 – 50,000", min: 30000, max: 50000 },
              ].map((price) => (
                <li key={price.label}>
                  <label className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
                    <input
                      type="radio"
                      name="price"
                      onChange={() =>
                        setPriceRange({ min: price.min, max: price.max })
                      }
                      className="w-4 h-4 accent-black cursor-pointer"
                    />
                    <span className="font-medium text-white text-base">
                      {price.label}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Products */}
        <div className="ml-12">
          <h1 className="text-4xl font-bold">Products</h1>
          <div className="grid grid-cols-3 gap-y-20 gap-x-20 mt-4">
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
