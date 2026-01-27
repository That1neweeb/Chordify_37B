import { useEffect,useState } from "react";
import useApi from "../hooks/useAPI";
import Chord from "../components/Chord";
export default function ChordLibrary(){
    const [chords, setChords] = useState([]);
    const {callApi, error,loading} = useApi();
    useEffect(() =>{
        const fetchContent = async () =>{
            try{
                const res = await callApi("GET","/chords/getAllChords");
                setChords(Array.isArray(res?.data) ? res.data : []);
            }
            catch(e){
                console.error(e);
            }
        }
        fetchContent();
    },[]);

    if(chords.length === 0){
        return <p className="text-Xl text-White"> No chords available</p>
    }
return(
    <div className="flex item-center justify-center gap-4 flex-wrap">
        {loading && <p>Loading chords...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {chords.map(chord =>(
            <Chord key={chord.id} chord={chord}/>
        )
        )}
    </div>
)
}