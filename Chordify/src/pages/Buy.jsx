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

  // apply filters
  const applyFilters = async (searchValue = searchTerm) => {
  try {
    let res;

    if (searchValue && searchValue.trim() !== "") {
      // Call search endpoint if user typed something
      const query = new URLSearchParams({ search: searchValue }).toString();
      res = await callApi("GET", `/products/search?${query}`);
    } else {
      // Only call filter endpoint if no search term
      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== "")
      );
      const query = new URLSearchParams(activeFilters).toString();
      res = await callApi("GET", `/products/filter?${query}`);
    }

    console.log("Products fetched:", res.data);

    setProducts(Array.isArray(res.data) ? res.data : []);
  } catch (err) {
    console.error("Error fetching products:", err.message);
    setProducts([]);
  }
};


  
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      applyFilters(value);
    }, 500);
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      brand: "",
      condition: "",
      minPrice: "",
      maxPrice: "",
    });
    setSearchTerm("");
    applyFilters(""); // fetch all products
  };


  useEffect(() => {
    applyFilters();
  }, [filters]);

  return (
    <div>
    

      <div className="flex ">
        {/* FILTER SIDEBAR */}
        <div
          className="w-64 p-4 py-20 sticky top-20 bg-[#27231B] flex flex-col gap-2"
        >
          <h2 className="text-xl font-bold mb-1">Filters</h2>

          <div className="h-px w-full bg-gray-400"></div>

          {/* CATEGORY */}
          <label className="block mb-2 mt-4">Category</label>
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="w-full mb-4 p-2 rounded border"
          >
            <option value="">All</option>
            <option value="guitar">Guitar</option>
            <option value="accessories">Accessories</option>
          </select>

          {/* BRAND */}
          <label className="block mb-2">Brand</label>
          <input
            type="text"
            placeholder="Brand name"
            value={filters.brand}
            onChange={(e) =>
              setFilters({ ...filters, brand: e.target.value })
            }
            className="w-full mb-4 p-2 rounded border"
          />

          {/* CONDITION */}
          <label className="block mb-2">Condition</label>
          <select
            value={filters.condition}
            onChange={(e) =>
              setFilters({ ...filters, condition: e.target.value })
            }
            className="w-full mb-4 p-2 rounded border"
          >
            <option value="">All</option>
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>

          {/* PRICE */}
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
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: e.target.value })
              }
              className="w-1/2 p-2 rounded border"
            />
          </div>

          <button
            onClick={resetFilters}
            className="w-full py-2 rounded font-semibold border"
          >
            Reset Filters
          </button>
        </div>

        {/* PRODUCTS GRID */}
            <div className="ml-32 pb-10">
                {/* SEARCH */}
        <div className="flex items-center m-10 gap-2 bg-[#393328] border border-[#374151] rounded-xl">
            <img src={searchIcon} alt="search" className="size-6 ml-4" />
            <input
            type="text"
            placeholder="Search product by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full m-2 h-10 focus:outline-none bg-[#393328] text-white"
            />
        </div>
          <h1 className="text-4xl font-bold">Products</h1>

          {loading ? (
            <p className="mt-10 text-gray-400">Loading...</p>
          ) : !products || products.length === 0 ? (
            <p className="mt-10 text-gray-400 text-xl">No products available</p>
          ) : (
            <div className="grid grid-cols-3 gap-y-20 gap-x-20 mt-4">
              {products.map((product) => (
                <GuitarCard
                  key={product.id}
                  id={product.id}
                  guitarName={product.name}
                  image={`http://localhost:5000${product.image_urls?.[0]}`}
                  price={product.price}
                  rating={product.rating}
                  brand={product.brand}
                  page="buying"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Buy;
