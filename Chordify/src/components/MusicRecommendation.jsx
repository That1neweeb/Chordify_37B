import { useEffect, useState } from "react";
import SongCard from "./SongCard";
import useApi from "../hooks/useAPI";

function MusicRecommendation() {

     const [songs, setSongs] = useState([]);
     const{callApi, loading, error} = useApi();
    
    useEffect(() => {
        async function fetchSongs() {
            try {
                const response = await callApi("GET","/songs/recommended");
                const data = await response.json();
                setSongs(data);
            } catch(err) {
                console.log("fetching error : " +err);
            }
    
        }
        fetchSongs() 
    }, []);
    return(
        <div className="mt-40 ml-36">
            <h2 className="font-bold text-2xl">Recommended songs for you</h2>
            <div className="mt-10">
                {songs.map(song=> (
                    <SongCard
                        song={song}
                    />
                ))}

            </div>
        </div>
    );
}

export default MusicRecommendation;