import { useApi } from "../hooks/useAPI.js";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

function StrummingPatterns() {
  const { callApi } = useApi();
  const [patterns, setPatterns] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchPatterns = async () => {
      const res = await callApi("GET", "/learn/strumming-patterns");
      console.log(res);
      
      setPatterns(res.data || []);
    };
    fetchPatterns();
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

      <h2 className="text-2xl font-bold mb-6">Essential Strumming Patterns</h2>

      <div className="grid grid-cols-3 gap-6">
        {patterns.map((pattern) => (
          <div key={pattern.id} className="bg-[#27231B] p-4 rounded-xl">
            
            <div className="h-40 bg-[#3A3326] rounded-lg flex items-center justify-center text-gray-400 text-sm mb-3">
              <img src={`http://localhost:5000${pattern.image}`} alt={pattern.name} />
            </div>

            <h3 className="font-semibold">{pattern.name}</h3>
            <p className="text-sm mt-1 text-gray-300">
              {pattern.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StrummingPatterns;
