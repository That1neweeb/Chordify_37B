import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import useApi from "../hooks/useAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SongCard({ cover_image, song_name, artist, id, onRemoveFavourite }) {
  const { callApi } = useApi();
  const navigate = useNavigate();
  const [isFavourite, setIsFavourite] = useState(false);

  // Fetch song favourites
  const fetchSongFavourites = async () => {
    try {
      const res = await callApi("GET", "/favourites/songs");

      const favArray =
        res?.data?.favourites ||
        res?.favourites ||
        [];

      const favIds = favArray.map(fav => fav.song_id);
      setIsFavourite(favIds.includes(Number(id)));
    } catch (err) {
      console.error("Error fetching song favourites:", err);
    }
  };
  useEffect(() => {
    fetchSongFavourites();
  }, [id]);

  // Toggle favourite
  const toggleFavourite = async (e) => {
    e.stopPropagation(); // <-- prevent navigating when clicking heart
    try {
      if (isFavourite) {
        await callApi("DELETE", `/favourites/songs/${id}`);
        toast.success("Removed from favourites");
        setIsFavourite(false);

        // Tell parent to remove this card immediately
        if (onRemoveFavourite) onRemoveFavourite();
      } else {
        await callApi("POST", `/favourites/songs/${id}`);
        toast.success("Added to favourites");
        setIsFavourite(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      onClick={() => navigate(`/songs/${id}`)} // <-- make the card clickable
      className="song-card bg-[#27231B] w-[350px] h-[500px] rounded-2xl flex flex-col items-center justify-around cursor-pointer"
    >
      <img
        src={`http://localhost:5000${cover_image}`}
        alt={song_name}
        className="rounded-2xl mt-6 w-60"
      />

      <h2 className="font-bold text-lg">{song_name}</h2>
      <h6 className="text-[#B7B3B3] text-sm">{artist}</h6>

      <div className="buttons bg-[#393328] rounded-2xl h-12 w-[90%] flex items-center justify-center">
        <button
          onClick={toggleFavourite}
          className="p-2 rounded flex items-center justify-center border-none outline-none focus:border-none focus:outline-none bg-transparent"
        >
          <Heart
            size={34}
            color={isFavourite ? "red" : "gray"}
            fill={isFavourite ? "red" : "none"}
            strokeWidth={2}
            className="transition-transform duration-200 hover:scale-110 cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
}

export default SongCard;
