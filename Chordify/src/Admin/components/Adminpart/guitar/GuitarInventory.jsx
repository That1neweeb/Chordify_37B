import React, { useEffect, useState } from "react";
import GuitarInventoryCard from "./GuitarInventoryCard.jsx";
import { getAllGuitars } from "../../../api.js"; // axios API calls
import { useNavigate, useOutletContext } from "react-router-dom";

export default function GuitarInventory() {
  const [guitars, setGuitars] = useState([]);
  const navigate = useNavigate();
  const { setActiveMenu } = useOutletContext();

  // Fetch all guitars from backend
  const fetchGuitars = () => {
    getAllGuitars()
      .then((res) => setGuitars(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchGuitars();
  }, []);

  return (
    <div className="bg-zinc-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Guitar Inventory</h3>
        <button
          className="text-orange-500 hover:text-orange-400 text-sm"
          onClick={() => {
            setActiveMenu("Guitar Listing");
            navigate("/guitars");
          }}
        >
          View All &gt;
        </button>
      </div>

      <div className="space-y-4">
        {guitars.map((guitar) => (
          <GuitarInventoryCard
            key={guitar.id}
            guitar={guitar}
            refreshGuitars={fetchGuitars} // pass refresh function
          />
        ))}
      </div>
    </div>
  );
}
