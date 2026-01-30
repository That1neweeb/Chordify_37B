import { useEffect, useState } from "react";
import SongCard from "./SongCard";

function SongLists({ songs }) {
    const [songList, setSongList] = useState(songs || []);

    useEffect(() => {
        setSongList(songs); 
    }, [songs]);

    if (!songList || songList.length === 0) {
        return <div className="flex items-center justify-center">No songs available</div>;
    }

    return (
        <div className="mt-10 ml-10">
            <h2 className="font-bold text-2xl">Songs for you</h2>
            <div className="mt-10 grid grid-cols-4 gap-6">
                {songList.map(song => (
                    <SongCard
                        key={song.id}
                        id={song.id}
                        cover_image={song.cover_image}
                        song_name={song.title}
                        artist={song.artist}
                    />
                ))}
            </div>
        </div>
    );
}
export default SongLists;