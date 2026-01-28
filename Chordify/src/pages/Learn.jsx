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
          className="border p-2 rounded w-full"
        />

                 {/* Favorites Section */}
        <Link to="/myfavoritesongs"><button>View your Favorites</button></Link>
      </div>

      {/* Content */}
      <div className="p-2 flex flex-wrap gap-4 ">

        {search === "" ? (
          // Default component when search is empty
          
          <LoadSongs />
        ) : (
          <>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && !error && data.length === 0 && (
              <p>No results found.</p>
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
