import React, { useState, useEffect } from "react";
import UserTable from "../components/UserTable";
import axios from "axios"

export default function UserListing() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


    // Fetch all users from backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Search filter
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">

      {/* Section Title + Add User Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xl font-semibold">User Listing</h2>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 rounded bg-zinc-700 text-white"
        />
      </div>

      {/* User Table */}
      {filteredUsers.length === 0 ? (
        <p className="text-white">No users found</p>
      ) : (
        <UserTable users={filteredUsers} fetchUsers={fetchUsers} />
      )}
    </div>
  );
}
