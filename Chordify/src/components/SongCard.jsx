import { Link } from "react-router-dom";
import heart from "../assets/images/heart.png";
import addtoplaylist from "../assets/images/addtoplaylist.png";
import chatbubble from "../assets/images/chat-bubble.png";
import useApi from "../hooks/useAPI";
import { toast } from "react-toastify";

function SongCard({ song }) {

  const {callApi} = useApi();

  const addToFavourite = async() => {
    try{
      const res = await callApi("POST",`/songs/${song.id}/addFavourite`);
      console.log("Song added to favourite",res.data)
      toast.success("Song added to favourite");
    }
    catch(err){
      toast.error("Error adding to favourite: " + err.message);

    }

    
  };
  return(
   
      <div className="song-card bg-[#27231B] w-[550px] h-[330px] rounded-2xl flex flex-col items-center justify-around">

         <Link to={`/lyrics/${song.id}`}>
        <img
          src={`http://localhost:5000${song.cover_image}`}
          alt={song.title}
          className="rounded-2xl mt-6 w-60 "
        />

        <h2 className="font-bold">{song.title}</h2>
        <h6 className="text-[#B7B3B3] text-sm">Artist: {song.artist}</h6>
        <h6 className="text-[#B7B3B3] text-sm">Difficulty: {song.difficulty}</h6>
        </Link>

        {/* Buttons */}
        <div className="buttons bg-[#393328] rounded-2xl h-12 w-[100%] flex gap-4 items-center justify-center">
          <button onClick={() => addToFavourite()}><img src={heart} className="h-8 w-8"  /></button>
          {/* <button><img src={addtoplaylist} className="h-8 w-8" /></button> */}
          {/* <button><img src={chatbubble} className="h-8 w-8" /></button> */}
        </div>
      </div>
  );
}

export default SongCard;
