import { useEffect, useState } from "react";
import LyricsCard from "../components/SongLyricsCard.jsx";
import SongSidebar from "../components/SongSideBar.jsx";
import useApi from "../hooks/useAPI"; // make sure the path is correct

function LyricsPage({ songId }) {
  const [song, setSong] = useState({});
  const { loading, error, callApi } = useApi();

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const data = await callApi("GET", `/songs/getSongContent/${songId}`);
        setSong(data);
      } catch (err) {
        console.log("API Error:", err);
      }
    };

    fetchSong();
  }, [songId, callApi]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main song card */}
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

export default LyricsPage;
