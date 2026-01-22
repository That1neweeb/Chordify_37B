import GuitarCard from "../components/GuitarCard";
import search from "../assets/images/search.png";
import { useEffect, useState, useRef } from "react";
import { useApi } from "../hooks/useAPI.js";

function Buy() {
    const { loading, error, callApi } = useApi();

    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Use useRef for debounce to persist timeout across renders
    const debounceRef = useRef(null);

    // Fetch all products
    const fetchProducts = async () => {
        try {
            const data = await callApi("GET", "/products/buy");
            setProducts(data);
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
        <div>
            {/* Search area */}
            <div className="flex items-center m-10 gap-2 bg-[#393328] border border-[#374151] rounded-xl hover:border-[#393328]">
                <img src={search} alt="" className="size-6 ml-4" />
                <input
                    type="text"
                    placeholder="Search product by name ...."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full m-2 h-10 focus:outline-none bg-[#393328] text-white"
                />
            </div>

            <div className="flex justify-around mr-8 mt-20">
                <div className="bg-[#393328] w-64 h-[800px] rounded-2xl ml-5"></div>

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
