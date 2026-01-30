import { useEffect, useState } from "react";
import GuitarCard from "../components/GuitarCard";
import useApi from "../hooks/useAPI.js";
import { toast } from "react-toastify";

function MyListingPage() {
    const { loading, callApi } = useApi();
    const [myListings, setMyListings] = useState([]);

    const fetchMyListings = async () => {
        try {
            const mylistings = await callApi("GET", "/products/mylistings", {});
            console.log(mylistings);
        
            
            setMyListings(mylistings.data);
        } catch (error) {
            if (!error.response) {
                toast.error("Network error. Please check your internet.");
            } else {
                toast.error(error.response.data?.message || "Something went wrong");
            }
        }
    };

    useEffect(() => {
        fetchMyListings();
    }, []);

    return (
        <div className="p-10">
            <h1 className="font-bold text-3xl text-white mt-10 mb-10">Your listings</h1>

            {loading && <p className="text-white">Loading...</p>}

            {!loading && myListings.length === 0 && (
                <p className="text-white">You don’t have any listings yet.</p>
            )}

            <div className="grid grid-cols-4 gap-10">
                {myListings.map(product => (
                    <GuitarCard 
                        key={product.id} 
                        id={product.id}
                        guitarName={product.name}
                        brand={product.brand}
                        image={`http://localhost:5000${product.image_urls[0]}`}
                        price={product.price} 
                        page="mylistings"
                        status={product.status}
                         onDelete={(deletedId) => {
                            setMyListings(prev => prev.filter(p => p.id !== deletedId));
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default MyListingPage;
