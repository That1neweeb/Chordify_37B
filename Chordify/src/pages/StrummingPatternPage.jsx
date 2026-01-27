import { useState,useEffect } from "react";
import useApi from "../hooks/useAPI";
import CommonCard from "../components/CommonCard";

export default function StrummingPatternPage(){
    const [patterns,setPatterns] = useState([]);    

    const {callApi, error, loading} = useApi();

      useEffect(() => {
    const fetchPatterns = async () => {
      try {
        const res = await callApi("GET", "/strumming/getAllPatterns"); 
        setPatterns(Array.isArray(res?.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to load strumming patterns", err);
      }
    };

    fetchPatterns();
  }, []);
    
if (loading) return <p className="text-2xl text-white"> Loading Please wait.....</p>
if(error) return <p className="text-sm text-red-500">An error Occured</p>

if (patterns.length === 0) {
    return <p className="text-2xl text-white"> No Patterns available</p>
    
}
    
    return(
        <div className="flex flex-wrap justify-center items-center m-4">
            {
                patterns.map(pattern =>
                    <CommonCard img={`http://localhost:5000${pattern.image_URL[0]}`} title={pattern.title} />
                )
            }

        </div>
    );   
}