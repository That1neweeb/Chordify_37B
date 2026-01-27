import { useState } from "react";
import useApi from "../hooks/useAPI";

export function TabExercisesPage(){
    const [exercises,setExercises] = useState([]);
    const {callApi, error, loading} = useApi();

      useEffect(() => {
    const fetchPatterns = async () => {
      try {
        const res = await callApi("GET", "/tabs/getAllExercises");
        const data = await res;
        setExercises(Array.isArray(data) ? data : [] );
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
      <div className="flex flex-wrap justify-center items-center ">
                {
                    exercises.map(exercise =>
                        <CommonCard img={exercise.image_URL} title={exercise.title} />
                    )
                }
    
            </div>
  );
}