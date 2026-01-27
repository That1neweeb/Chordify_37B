import { Link } from "react-router-dom";
import heart from "../assets/images/heart.png";
import addtoplaylist from "../assets/images/addtoplaylist.png";
import chatbubble from "../assets/images/chat-bubble.png";
import useApi from "../hooks/useAP";

function SongCard({ song }) {

  const {callApi} = useApi();

  const addToFavourite = async(e) => {
       e.preventDefault();      // prevent Link navigation
      e.stopPropagation();     // stop event bubbling
    
    try{
      const res = await callApi("POST",`/songs/${songs.id}/addFavourite`);
      console.log("Song added to favourite",res.data)
    }
    catch(err){

    }

    
  };
  return(
    <Link to={`/lyrics/${song.id}`}>
      <div className="song-card bg-[#27231B] w-[350px] h-[500px] rounded-2xl flex flex-col items-center justify-around">
        <img
          src={song.cover_image}
          alt={song.title}
          className="rounded-2xl mt-6 w-60"
        />

        <h2 className="font-bold">{song.title}</h2>
        <h6 className="text-[#B7B3B3] text-sm">{song.artist}</h6>

        <div className="buttons bg-[#393328] rounded-2xl h-12 w-[90%] flex gap-4 items-center justify-center">
          <button><img src={heart} className="h-8 w-8" onClick={() => addToFavourite} /></button>
          {/* <button><img src={addtoplaylist} className="h-8 w-8" /></button> */}
          {/* <button><img src={chatbubble} className="h-8 w-8" /></button> */}
        </div>
      </div>
    </Link>
  );
}

export default SongCard;
