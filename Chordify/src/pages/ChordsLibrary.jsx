import { useEffect, useState } from "react";
import { useApi } from "../hooks/useAPI.js";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function ChordLibrary() {
  const { callApi } = useApi();
  const [chords, setChords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChords = async () => {
      const res = await callApi("GET", "/learn/chords");
      console.log(res);
      
      setChords(res.data || []);
    };
    fetchChords();
  }, []);

  return (
    <div className="p-10">
         {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 text-sm text-gray-200 hover:text-white transition"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <h2 className="text-2xl font-bold mb-4">Chord Library</h2>
      <div className="grid grid-cols-4 gap-6">
        {chords.map((chord) => (
          <div key={chord.id} className="bg-[#27231B] p-4 rounded-xl">
            <img src={`http://localhost:5000/${chord.image}`} alt={chord.name} />
            <h3 className="mt-2 font-semibold">{chord.name}</h3>
            <p className="text-sm mt-1">{chord.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChordLibrary;
