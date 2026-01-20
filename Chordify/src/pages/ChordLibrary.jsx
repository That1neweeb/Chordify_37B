import { useEffect,useState } from "react";

export default function ChordLibrary(){
    const [chords, setChords] = useState([]);
    useEffect(() =>{
        const fetchContent = async () =>{
            try{
                const res = await fetch("http://localhost:5000/chords/getAllChords");
                const data = await res.json();
                if (Array.isArray(data)){
                    setChords(data);
                }
                else if(data.length === 0){
                    return(<p className="text-xl text-white">No Chords Available</p>);
                }

            }
            catch(e){
                console.error(e);
                return(<p className="text-xl text-red-500">Error loading Chords</p>);
            }
        }
        fetchContent();
    },[]);
return(
    <div className="flex item-center justify-center gap-4 flex-wrap">
        {chords.map(chord =>(
            <></>
        )
        )}
    </div>
)
}