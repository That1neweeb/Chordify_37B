import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LyricsCard from "../components/SongLyricsCard.jsx";
import SongSidebar from "../components/SongSideBar.jsx";
import useApi from "../hooks/useAPI.js";
import { useNavigate } from "react-router-dom";

export default function SongPage() {
  const { id } = useParams();
  const { callApi } = useApi();
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSong = async () => {
      setLoading(true);
      try {
        const res = await callApi("GET", `/songs/songContent/${id}`);
        console.log(res);
        
        setSong(res.data || null);
      } catch (err) {
        console.error("Error fetching song:", err);
        setError("Failed to fetch song");
      } finally {
        setLoading(false);
      }
    };
    fetchSong();
  }, [id]);

  if (loading) return <p className="text-center mt-20 text-gray-400">Loading song...</p>;
  if (error) return <p className="text-center mt-20 text-red-400">{error}</p>;
  if (!song) return <p className="text-center mt-20 text-gray-400">Song not found</p>;

  return (
        <div className="min-h-screen bg-[#27231B] px-4 py-8">
          <button
              onClick={() => navigate(-1)}
                className="flex items-center gap-2 mb-4 text-sm text-gray-200 hover:text-white border-none outline-none hover:border-none focus:outline-none transition"
            >
            ← Back
          </button>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Lyrics */}
            <div className="lg:col-span-3">
              <LyricsCard song={song} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <SongSidebar song={song} />
            </div>
          </div>
    </div>
  );
}
