import { useState,useEffect } from "react";
import useApi from "../hooks/useAPI";
import CommonCard from "../components/CommonCard";

export default function TabExercisesPage(){
    const [exercises,setExercises] = useState([]);
    const {callApi, error, loading} = useApi();

      useEffect(() => {
    const fetchPatterns = async () => {
      try {
        const res = await callApi("GET", "/tabs/getAllExercises");
        console.log(res.data);
        setExercises(Array.isArray(res?.data) ? res.data : [] );
        console.log(exercises);
      } catch (err) {
        console.error("Failed to load  exercises", err);
      }
    };

    fetchPatterns();
  }, []);
  if (loading) return <p className="text-2xl text-white"> Loading Please wait.....</p>
if(error) return <p className="text-sm text-red-500">An error Occured</p>

if(exercises.length === 0){
    return(
        <p className="text-xl text-white">Nothing to load</p>
    )
}

  return(
      <div className="flex flex-wrap justify-center items-center m-4">
                {
                    exercises.map(exercise =>
                        <CommonCard img={`http://localhost:5000${exercise.image_URL[0]}`} title={exercise.title} />
                    )
                }
    
            </div>
  );
}