import GuitarCard from "./GuitarCard";
import { useEffect, useState } from "react";
import { useApi } from "../hooks/useAPI.js";

function Suggested() {
  // const { callApi, loading, error } = useApi();
  // const [guitars, setGuitars] = useState([]);

  // useEffect(() => {
  //   const fetchGuitars = async () => {
  //     try {
  //       const data = await callApi("GET", "/guitars/suggested");
  //       setGuitars(data || []);
  //     } catch (err) {
  //       console.error("Fetch error:", err.message);
  //     }
  //   };

  //   fetchGuitars();
  // }, []);

  return (
    <div className="mt-32 flex flex-col gap-4">
      <h2 className="font-bold text-2xl">Suggested for you</h2>
      {/* {loading && <p>Loading suggested guitars...</p>} */}
      {/* {error && <p className="text-red-500">Error: {error}</p>} */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        {/* {guitars.map((guitar) => (
          <GuitarCard
            key={guitar.id}
            id={guitar.id}
            image={`http://localhost:5000${guitar.image_urls[0]}`}
            guitarName={guitar.name}
            price={guitar.price}
            page="landing"
          />
        ))} */}
      </div>
    </div>
  );
}

export default Suggested;
