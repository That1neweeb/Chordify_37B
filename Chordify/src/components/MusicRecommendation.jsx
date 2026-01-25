import { useEffect, useState } from "react";
import SongCard from "./SongCard";
import useApi from "../hooks/useAPI";

function MusicRecommendation() {

     const [songs, setSongs] = useState([]);
     const {loading, error, callApi} = useApi();

    
    
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
            <div className="mt-10">
                {songs.map(song=> (
                    <SongCard
                        key={song.id}
                        id={song.id}
                        cover_image={`http://localhost:5000${song.cover_image}`}
                        song_name={song.title}
                        artist={song.artist}
                    />
                ))}

            </div>
        </div>
    );
}

export default MusicRecommendation;