import { useEffect, useState } from "react";
import SongCard from "../components/SongCard";
import {useApi} from "../hooks/useAPI";

export default function FavouriteSongs(){
    const[songs,setSongs] = useState([]);
    const {callApi, error, loading} = useApi();

    const loadFavourites = async() => {
        try{
            const res = await callApi("GET","/songs/getFavourites");
            setSongs(Array.isArray(res.data) ? res.data : []);
            console.log(res.data);
        }
        catch(err){

        }
    }
    useEffect(()=> {
        loadFavourites();
        
    },[]);

    return(
        <div className="flex flex-wrap justify-center item-center">
            {songs.length === 0 ? (
                <p>No favorite songs found.</p>
            ) : (
                songs.map(song =>(
                    <SongCard key={song.id} song={song}/>
                ))
            )}

        </div>
    );
}