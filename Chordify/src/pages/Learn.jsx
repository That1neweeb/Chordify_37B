import { useState, useRef } from "react";
import LoadSongs from "../components/LoadSong";
import LearningSection from "../components/LearningSection";
import useApi from "../hooks/useAPI";
import SongCard from "../components/SongCard";
import { Link } from "react-router-dom";

function Learn() {
  const [data, setData] = useState([]); // fetched songs
  const [search, setSearch] = useState(""); // search input
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debounceRef = useRef(null);
  const { callApi } = useApi();

  // Fetch data from backend
  const fetchData = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setData([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await callApi(
        "GET",
        "/songs/searchSong", //  route
        { params: { search: searchTerm } }
      );

      console.log("API Response:", res); // debug log

      setData(res.data || []); 
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Something went wrong");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change with debounce
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchData(value);
    }, 500);
  };

  return (
    <>
      {/* Search Bar */}
      <div className="p-4 flex flex-col md:flex-row md:justify-between gap-4">
        <input
          type="text"
          placeholder="Search songs..."
          value={search}
          onChange={handleSearchChange}
          className="border border-gray-300 border-[var(--border-color)] p-2 rounded w-full bg-[var(--bg-color)]  text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />

        {/* Favorites Section */}
        <Link to="/myfavoritesongs">
          <button className="bg-[#F2A60D] dark:bg-[#4F3D18] text-black dark:text-white px-4 py-2 rounded hover:opacity-80 transition">
            View your Favorites
          </button>
        </Link>
      </div>

      {/* Content */}
      <div className="p-2 flex flex-wrap gap-4 ">
        {search === "" ? (
          // Default component when search is empty
          <LoadSongs />
        ) : (
          <>
            {loading && <p className="text-black dark:text-white">Loading...</p>}
            {error && <p className="text-red-500 dark:text-red-400">Error: {error}</p>}
            {!loading && !error && data.length === 0 && (
              <p className="text-black dark:text-white">No results found.</p>
            )}
            {data.map(song => (
              <SongCard
                key={song.id}
                song={song}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default Learn;
