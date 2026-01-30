import { useApi } from "../hooks/useAPI.js";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";


function TabExercises() {
  const { callApi } = useApi();
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchExercises = async () => {
      const res = await callApi("GET", "/learn/exercises");
      console.log(res);
      
      setExercises(res.data || []);
    };
    fetchExercises();
  }, []);

  return (
    <div className="p-10">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 text-sm text-gray-200 hover:text-white transition"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <h2 className="text-2xl font-bold mb-4">Tab Exercises</h2>
      <div className="grid grid-cols-3 gap-6">
        {exercises.map((ex) => (
          <div key={ex.id} className="bg-[#27231B] p-4 rounded-xl">
            <h3 className="font-semibold">{ex.name}</h3>
            <p className="text-sm mt-1">{ex.description}</p>
            {ex.image && <img src={`http://localhost:5000${ex.image}`} alt={ex.name} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TabExercises;
