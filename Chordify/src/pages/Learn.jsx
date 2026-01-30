import { useState, useEffect, useRef } from "react";
import SongLists from "../components/SongLists";
import useApi from "../hooks/useAPI";

function Learn() {
  const { callApi } = useApi();
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debounceRef = useRef(null);

  const fetchSongs = async () => {
    try {
      const res = await callApi("GET", "/songs");
      console.log(res.data);
      setSongs(res.data)
      
    } catch (err) {
      console.error("Fetch songs error:", err.message);
    }
  };

  const fetchSearchResults = async (query) => {
    if (!query) {
      fetchSongs();
      return;
    }
    try {
      const res = await callApi("GET", `/songs/search`, { params: {  search: query } });
      console.log(res.data);
      
      setSongs(res.data);
    } catch (err) {
      console.error("Search error:", err.message);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchSearchResults(value);
    }, 500);
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="p-4">
        <SongLists songs={songs} />
      </div>
    </>
  );
}

export default Learn;
