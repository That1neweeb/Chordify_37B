// src/pages/GuitarListing.jsx
import React, { useState, useEffect } from "react";
import GuitarTable from "../components/GuitarTable";
import axios from "axios";

export default function GuitarListing() {
  const [guitars, setGuitars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch pending guitars from backend
  const fetchPendingGuitars = async () => {
    try {
      const res = await axios.get("http://localhost:5000/guitar/pending");
      // Ensure res.data is always an array
      setGuitars(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch guitars:", err);
      setGuitars([]); // fallback
    }
  };

  useEffect(() => {
    fetchPendingGuitars();
  }, []);

  // Approve guitar
  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/guitar/approve/${id}`);
      alert("Guitar listing approved!");
      fetchPendingGuitars(); // refresh table — removes approved guitar
    } catch (err) {
      console.error(err);
      alert("Failed to approve guitar!");
    }
  };

  // Reject guitar
  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:5000/guitar/reject/${id}`);
      alert("Guitar listing rejected!");
      fetchPendingGuitars(); // refresh table — removes rejected guitar
    } catch (err) {
      console.error(err);
      alert("Failed to reject guitar!");
    }
  };

  // Filter guitars for search (safe)
  const filteredGuitars = (guitars || []).filter(
    (g) =>
      g.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.condition?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search guitars..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 rounded bg-zinc-700 text-white"
        />
      </div>

      {filteredGuitars.length === 0 ? (
        <p className="text-white">No guitars found</p>
      ) : (
        <GuitarTable
          guitars={filteredGuitars}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
}
