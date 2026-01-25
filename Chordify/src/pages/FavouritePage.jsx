import { useEffect, useState } from "react";
import GuitarCard from "../components/GuitarCard";
import { useApi } from "../hooks/useAPi";

function FavouritePage() {
    const[favourites, setFavourites] = useState([]);
    const {loading, error, callApi} = useApi();

    const fetchFavourties = async() => {
        try {
            const res = await callApi("GET", "/favourites", {});
            console.log(res.favourites);
            setFavourites(res.favourites)
            
        } catch(e) {
            console.log("Error fetching favourites : ", e);
        }
    }
    useEffect(()=> {
        fetchFavourties();
    }, []);

    return(

        <div className="p-20">
            <h1 className="text-3xl font-bold">Your favourites</h1>
            <div className="grid grid-cols-4 gap-y-16 mt-16">
                {
                    favourites.map(favourite => {
                        return (
                            <GuitarCard
                                guitarName={favourite.Product.name}
                                brand={favourite.Product.brand}
                                rating={favourite.Product.rating}
                                image={`http://localhost:5000${favourite.Product.image_urls[0]}`}
                                price={favourite.Product.price}
                                page="buying"
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default FavouritePage;