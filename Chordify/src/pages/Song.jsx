import { useEffect, useState } from "react";
import LyricsCard from "../components/SongLyricsCard.jsx";
import SongSidebar from "../components/SongSideBar.jsx";
function Song({songId}) {

     const [song, setSongs] = useState({});
    
    useEffect(() => {
        async function fetchSongs() {
            try {
                const response = await fetch(`https://localhost:5000/songs/songContent/${songId}`);
                const data = await response.json();
                setSongs(data);
            } catch(err) {
                console.log("fetching error : " +err);
            }
    
        }
        fetchSongs() 
    }, []);

    return(
         <div className="min-h-screen bg-gray-100 px-4 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main song card */}
        <div className="lg:col-span-3">
          <LyricsCard song={song} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <SongSidebar song={song} />
        </div>

        </div>
        </div>
    )
}

export default Song