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

  // Use useRef for debounce to persist timeout across renders
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

  // Fetch products by search query
  const fetchSearchResults = async (query) => {
    if (!query) {
      fetchProducts(); // If search is empty, fetch all
      return;
    }

    try {
      const data = await callApi("GET", `/products/search`, {
        params: { search: query },
      });
      setProducts(data);
    } catch (err) {
      console.error("Search error:", err.message);
    }
  };

  // Fetch products by filters
  const applyFilters = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const data = await callApi("GET", `/products/filter?${query}`);
      setProducts(data.data);
    } catch (err) {
      console.error("Filter error:", err.message);
    }
  };

  // Search input change with debounce
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear previous timeout
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // Set new timeout
    debounceRef.current = setTimeout(() => {
      fetchSearchResults(value);
    }, 500);
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="pb-10">
      {/* Search area */}
      <div className="flex items-center m-10 gap-2 bg-[#393328] border border-[#374151] rounded-xl hover:border-[#393328]">
        <img src={searchIcon} alt="" className="size-6 ml-4" />
        <input
          type="text"
          placeholder="Search product by name ...."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full m-2 h-10 focus:outline-none bg-[#393328] text-white"
        />
      </div>

      <div className="flex justify-around mr-8 mt-20">
        {/* Sidebar filters */}
        <div className="bg-[#393328] w-64 h-[800px] rounded-2xl ml-5 p-4">
          <h2 className="text-xl font-bold mb-4 text-white">Filters</h2>

          {/* Category filter */}
          <label className="block mb-2 text-white">Category</label>
          <select
            className="w-full mb-4 p-2 rounded bg-[#4F3D18] text-white"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option value="">All</option>
            <option value="guitar">Guitar</option>
            <option value="accessories">Accessories</option>
          </select>

          {/* Brand filter */}
          <label className="block mb-2 text-white">Brand</label>
          <input
            type="text"
            placeholder="Brand name"
            value={filters.brand}
            onChange={(e) =>
              setFilters({ ...filters, brand: e.target.value })
            }
            className="w-full mb-4 p-2 rounded bg-[#4F3D18] text-white"
          />

          {/* Condition filter */}
          <label className="block mb-2 text-white">Condition</label>
          <select
            value={filters.condition}
            onChange={(e) =>
              setFilters({ ...filters, condition: e.target.value })
            }
            className="w-full mb-4 p-2 rounded bg-[#4F3D18] text-white"
          >
            <option value="">All</option>
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>

          {/* Price range */}
          <label className="block mb-2 text-white">Price Range</label>
          <div className="flex gap-2 mb-4">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({ ...filters, minPrice: e.target.value })
              }
              className="w-1/2 p-2 rounded bg-[#4F3D18] text-white"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: e.target.value })
              }
              className="w-1/2 p-2 rounded bg-[#4F3D18] text-white"
            />
          </div>

          <button
            onClick={applyFilters}
            className="w-full bg-[#4F3D18] text-[#F2A60D] py-2 rounded"
          >
            Apply Filters
          </button>
        </div>

        {/* Product grid */}
        <div className="ml-12 flex-1">
          <h1 className="text-4xl font-bold text-white">Products</h1>
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
