import { useEffect, useState } from "react";
import SongCard from "./SongCard";
import useApi from "../hooks/useAPI";

function LoadSongs() {

     const [songs, setSongs] = useState([]);
     const {loading, error, callApi} = useApi();

    // Fetching from the backend
    
    useEffect(() => {
        async function fetchSongs() {
            try {
                const res = await callApi("GET","/songs/recommended", {});
                console.log(res);
                
                setSongs(res.data);
            } catch(err) {
                console.log("fetching error : " +err);
            }
    
        }
        fetchSongs() 
    }, []);

    if (!songs || songs.length === 0) {
    return <div className="flex items-center justify-center">No songs available</div>;
    }

    return(
        <div className="mt-40 ml-36">
            <h2 className="font-bold text-2xl">Songs for you</h2>

            {/* loading songcards */}
            <div className="mt-10 flex flex-wrap gap-4">
                {songs.map(song=> (
                    <SongCard
                    key={song.id}
                        song={song}
                    />
                ))}

            </div>
        </div>
    );
}

export default LoadSongs;