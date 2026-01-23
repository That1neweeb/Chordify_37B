import { useEffect, useState } from "react";
import SongCard from "../components/SongCard";
import useApi from "../hooks/useAPI";

export default function FavouriteSongs(){
    const[songs,setSongs] = useState();
    const {callApi, error, loading} = useApi();

    const loadFavourites = async => {
        try{
            const res = callApi("GET","/songs/getFavourites")
            setSongs(Array.isArray(res.data) ? res.data : [])
            
        }
        catch(err){

        }
    }
    useEffect(()=> {
        loadFavourites();
        
    });

    return(
        <div className="flex wrap-flex justify-center item-center">
            {songs.map(song =>{
                <SongCard song={song}/>
            })
            }

        </div>
    );
}