import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LyricsCard from "../components/SongLyricsCard.jsx";
import SongSidebar from "../components/SongSideBar.jsx";
import useApi from "../hooks/useAPI";

function LyricsPage() {
  const { id } = useParams(); // ✅ THIS is the song ID
  const [song, setSong] = useState(null);
  const { loading, error, callApi } = useApi();

  useEffect(() => {
    if (!id) return; // 🛑 guard

    const fetchSong = async () => {
      try {
        console.log("Song ID:", id);  
        const res = await callApi("GET", `/songs/getSongContent/${id}`);
        setSong(res.data);
      } catch (err) {
        console.log("API Error:", err);
      }
    };

    fetchSong();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!song) return null;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <LyricsCard song={song} />
        </div>
        <div className="lg:col-span-1">
          <SongSidebar song={song} />
        </div>
      </div>
    </div>
  );
}

export default LyricsPage;
