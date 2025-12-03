import { useEffect, useState } from "react";
import SongCard from "./SongCard";

function MusicRecommendation() {

     const [songs, setSongs] = useState([]);
    
    useEffect(() => {
        async function fetchSongs() {
            try {
                const response = await fetch("https://localhost:5000/songs/recommended");
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