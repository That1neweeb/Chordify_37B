import React, { useState, useEffect } from "react";
import UserTable from "../../components/Adminpart/user/UserTable";
import useApi from "../../hooks/useApi";
import toast from "react-hot-toast";

export default function UserListing() {
  const { callApi, loading, error } = useApi();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users
  const fetchUsers = async () => {
    try {
      const data = await callApi("get", "/users");
      setUsers(Array.isArray(data) ? data : []);
    } catch {
      setUsers([]);
      toast.error("Failed to fetch users!");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase())
      // user.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-white text-xl font-semibold mb-4">
        User Listing
      </h2>

      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 rounded bg-zinc-700 text-white mb-4"
      />

      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {filteredUsers.length === 0 ? (
        <p className="text-white">No users found</p>
      ) : (
        <UserTable users={filteredUsers} fetchUsers={fetchUsers} />
      )}
    </div>
  );
}
