import { useEffect, useState } from "react";

function Song() {

     const [song, setSongs] = useState({});
    
    useEffect(() => {
        async function fetchSongs() {
            try {
                const response = await fetch("https://localhost:5000/songs/songContent");
                const data = await response.json();
                setSongs(data);
            } catch(err) {
                console.log("fetching error : " +err);
            }
    
        }
        fetchSongs() 
    }, []);

    return(
        <>
        <div class="w-full max-w-sm p-5 bg-white rounded-2xl shadow flex flex-col gap-3">
            <h2 class="text-2xl font-bold text-gray-900">{song.title}2183</h2>
            <p class="text-lg text-gray-700">{song.artist}</p>
            <span class="text-base font-medium text-blue-600">Difficulty: {song.difficulty}</span>
        </div>

        </>
    )
}

export default Song