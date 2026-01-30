import { Link } from "react-router-dom";
import heart from "../assets/images/heart.png";
import addtoplaylist from "../assets/images/addtoplaylist.png";
import chatbubble from "../assets/images/chat-bubble.png";
import filledheart from "../assets/images/filledhheart.png";
import useApi from "../hooks/useAPI";
import { toast } from "react-toastify";
import { use, useEffect, useState } from "react";

function SongCard({ song }) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [favChanged, setFavChanged] = useState(false);

  const {callApi} = useApi();

  useEffect(() => {
    const checkFavouriteStatus = async () => {
      try {
        const res = await callApi("GET",`/songs/${song.id}/isFavourite`);
        console.log("Favourite status: ", res.data);
        console.log(res.message);
        setIsFavourite(res.data ? true : false);
        // toast.success(res.message);
      }
      catch(err){
        console.error("Error checking favourite status: ", err);
      }
    }
    
    checkFavouriteStatus();

  },[favChanged]);

  const addToFavourite = async() => {
    try{
      const res = await callApi("POST",`/songs/${song.id}/addFavourite`);
      console.log("Song added to favourite",res.data);
      setFavChanged(prev => !prev);
      toast.success(res.message);
    }
    catch(err){
      toast.error("Error adding to favourite: " + err.message);
    }

    
  };
  return(
   
      <div className="song-card bg-[var(--card-bg)] border border-gray-300 border-[var(--border-color)] w-[550px] h-[330px] rounded-2xl flex flex-col items-center justify-around text-[var(--text-color)]">

         <Link to={`/lyrics/${song.id}`}>
        <img
          src={`http://localhost:5000${song.cover_image}`}
          alt={song.title}
          className="rounded-2xl mt-6 w-60"
        />

        <h2 className="font-bold text-[var(--text-color)]">{song.title}</h2>
        <h6 className="text-[var(--text-color)] opacity-70 text-sm">Artist: {song.artist}</h6>
        <h6 className="text-[var(--text-color)] opacity-70 text-sm">Difficulty: {song.difficulty}</h6>
        </Link>

        {/* Buttons */}
        <div className="buttons  rounded-2xl h-12 w-[100%] flex gap-4 items-center justify-center">
          <button className="bg-[#F2A60D] "onClick={() => addToFavourite()}>
            <img src={isFavourite ? filledheart : heart} className="h-8 w-8 " />
          </button>
          {/* <button><img src={addtoplaylist} className="h-8 w-8" /></button> */}
          {/* <button><img src={chatbubble} className="h-8 w-8" /></button> */}
        </div>
      </div>
  );
}

export default SongCard;
