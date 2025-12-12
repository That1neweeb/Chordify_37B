import { useEffect, useState } from "react";
function Song(){
     const [lyrics, setLyrics] = useState([]);
     useEffect(() => {
        async function fetchSongs() {
            try {
                const response = await fetch("https://localhost:5000/songs/lyrics");
                const data = await response.json();
                setLyrics(data);
            } catch(err) {
                console.log("fetching error : " +err);
            }
    
        }
        fetchSongs() 
    }, []);
    
    return(
        <>
        <div className="flex flex-col gap-1 p-4 bg-white rounded-lg shadow">
  <h2 className="text-xl font-semibold">{song.title}</h2>
  <p className="text-gray-600">{song.artist}</p>
  <span className="text-sm font-medium text-blue-600">
    Difficulty: {song.difficulty}
  </span>
</div>

        </> 
    )
}

export default Song;