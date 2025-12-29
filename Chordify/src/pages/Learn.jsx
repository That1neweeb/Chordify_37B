import { useState, useEffect } from "react";
import LearningPageHeroImage from "../components/LearningPageHeroImage";
import MusicRecommendation from "../components/MusicRecommendation";
import LearningSection from "../components/LearningSection";

function Learn() {
  const [data, setData] = useState(null); // fetched data
  const [search, setSearch] = useState(""); // search input
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from backend
  const fetchData = async () => {
    if (!search) return; // Do not fetch if search is empty

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/guitars/suggested?search=${search}`);
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch whenever search changes
  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <>
      {/* Search Bar */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {search === "" ? (
          // Default components when search is empty
          <>
            <LearningPageHeroImage />
            <MusicRecommendation />
            <LearningSection />
          </>
        ) : (
          // Show search results when search has value
          <>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {data && data.length === 0 && <p>No results found.</p>}
            {data && data.length > 0 && (
              <div>
                {data.map((item) => (
                  <LearningSection key={item.id} {...item} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Learn;
