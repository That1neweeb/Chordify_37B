import { useEffect, useState } from "react";
import GuitarCard from "../components/GuitarCard";
import SongCard from "../components/SongCard";
import useApi from "../hooks/useAPI";

function FavouritePage() {
  const { callApi } = useApi();

  const [activeTab, setActiveTab] = useState("products");
  const [productFavourites, setProductFavourites] = useState([]);
  const [songFavourites, setSongFavourites] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchProductFavourites = async () => {
    try {
      const res = await callApi("GET", "/favourites");
      setProductFavourites(res?.favourites || []);
    } catch (err) {
      console.error("Fetch product favourites error:", err);
    }
  };

  const fetchSongFavourites = async () => {
    try {
      const res = await callApi("GET", "/favourites/songs");
      console.log("This is the response : ", res);
      
      setSongFavourites(res?.favourites || []);
    } catch (err) {
      console.error("Fetch song favourites error:", err);
    }
  };

 useEffect(() => {
  const load = async () => {
    await fetchProductFavourites();
    await fetchSongFavourites();
    setLoading(false);
  };

  load();
}, []);



  if (loading) {
  return (
    <div className="p-20 text-center text-gray-400">
      Loading favourites...
    </div>
  );
}


  return (
    <div className="p-20">
      <h1 className="text-3xl font-bold mb-6">Your favourites</h1>

      {/* Toggle */}
      <div className="flex gap-6 mb-10">
        <button
          onClick={() => setActiveTab("products")}
          className={`px-6 py-2 rounded-full ${
            activeTab === "products"
              ? "bg-[#F2A60D] text-black"
              : "bg-[#393328] text-white"
          }`}
        >
          Products
        </button>

        <button
          onClick={() => setActiveTab("songs")}
          className={`px-6 py-2 rounded-full ${
            activeTab === "songs"
              ? "bg-[#F2A60D] text-black"
              : "bg-[#393328] text-white"
          }`}
        >
          Songs
        </button>
      </div>

      {/* Content */}
        {activeTab === "products" ? (
            productFavourites.length === 0 ? (
                <p className="text-gray-400 text-center mt-20 text-lg">
                You have no favourite products yet.
                </p>
            ) : (
                <div className="grid grid-cols-4 gap-y-16">
                {productFavourites.map((fav) => (
                    <GuitarCard
                    key={fav.id}
                    id={fav.Product.id}  
                    guitarName={fav.Product.name}
                    brand={fav.Product.brand}
                    rating={fav.Product.rating}
                    image={`http://localhost:5000${fav.Product.image_urls[0]}`}
                    price={fav.Product.price}
                    page="buying"
                    />
                ))}
                </div>
            )
                ) : songFavourites.length === 0 ? (
                <p className="text-gray-400 text-center mt-20 text-lg">
                    You have no favourite songs yet.
                </p>
                ) : (
                <div className="grid grid-cols-4 gap-y-16">
                    {songFavourites.map((fav) => (
                    <SongCard
                        key={fav.id}
                        id={fav.song_id}
                        cover_image={fav.Song.cover_image}
                        song_name={fav.Song.title}
                        artist={fav.Song.artist}
                        onRemoveFavourite={() => {
                            setSongFavourites(prev => prev.filter(f => f.song_id !== fav.song_id));
                        }}
                    />
                    ))}
                </div>
                )}

    </div>
  );
}

export default FavouritePage;
