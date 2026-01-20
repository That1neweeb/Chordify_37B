import GuitarCard from "../components/GuitarCard";
import acoustic from "../assets/images/acoustic.png";
import search from "../assets/images/search.png";
import { useEffect, useState } from "react";

function Buy() {

    //for products data
    const [products, setProducts] = useState([]);

    //for search texts
    const[searchTerm, setSearchTerm] = useState("");

    async function fetchProducts() {
        try {
            const response = await fetch("http://localhost:5000/products/buy"); //calling the backend api to getch the products
            const result = await response.json();
            setProducts(result.data);
        } catch(err) {
            console.log("Fetch error : "+err);
        }

    }
    //to fetch the products
    useEffect(()=>{        
        fetchProducts();
    }, [])

    // for debouncing (when the user stops typing , it calls the search api)
    let debounceTimeout;
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Clear previous timeout
        if (debounceTimeout) clearTimeout(debounceTimeout);

        // Set new timeout
        debounceTimeout = setTimeout(() => {
            //here im passing the value to the function fetchSearchResults
            fetchSearchResults(value);
        }, 500); // wait 500ms after user stops typing
    };

    //for fetching the actual product which was searched
    const fetchSearchResults = async (query) => {

        //if search field is empty return all the products
        if(!query) {
            fetchProducts();
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/products/search?search=${query}`);
            const result = await res.json();
            setProducts(result);
        } catch(e) {
            console.error("Search error:", e);
        }
    }



    //UI part
    return( 
    <div>

        {/* search area */}
        <div className="flex items-center m-10 gap-2 bg-[#393328] border border-[#374151] rounded-xl hover:border-[#393328]">
            <img src={search} alt="" className='size-6 ml-4'/>
            <input 
            onChange={handleSearchChange}
            type="text" 
            placeholder='Search product by name ....'
            className='w-full m-2 h-10 focus:outline-none bg-[#393328] text-white'
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
                            guitarName= {product.name}
                            image={`http://localhost:5000${product.image_urls[0]}`}
                            price= {product.price}
                            rating= {product.rating}
                            brand= {product.brand}
                            page= "buying"
                         />
                    ))}
               
                    
                 
                </div>
            </div>
        </div>

    </div>
    );
}

export default Buy;