// src/pages/GuitarListing.jsx
import React, { useState, useEffect } from "react";
import GuitarTable from "../../components/Adminpart/guitar/GuitarTable";
import useApi from "../../hooks/useApi";
import toast from "react-hot-toast";

export default function GuitarListing() {
  const { callApi, loading, error } = useApi();
  const [guitars, setGuitars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch pending guitars
  const fetchPendingGuitars = async () => {
    try {
      const data = await callApi("get", "/guitar/pending");
      setGuitars(Array.isArray(data) ? data : []);
    } catch (err) {
      setGuitars([]);
      toast.error("Failed to fetch guitars!");
    }
  };

  useEffect(() => {
    fetchPendingGuitars();
  }, []);

  // Approve guitar
  const handleApprove = async (id) => {
    try {
      await callApi("put", `/guitar/approve/${id}`);
      toast.success("Guitar approved!");
      fetchPendingGuitars();
    } catch {
      toast.error("Failed to approve guitar!");
    }
  };

  // Reject guitar
  const handleReject = async (id) => {
    try {
      await callApi("put", `/guitar/reject/${id}`);
      toast.success("Guitar rejected!");
      fetchPendingGuitars();
    } catch {
      toast.error("Failed to reject guitar!");
    }
  };

  // Search filter
  const filteredGuitars = guitars.filter(
    (g) =>
      g.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.condition?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-white mb-4">
        Guitar Listing
      </h1>

      <input
        type="text"
        placeholder="Search guitars..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 rounded bg-zinc-700 text-white mb-4"
      />

      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

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
