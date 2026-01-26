import React from "react";
import axios from "axios"
import { Trash2 } from "lucide-react";
import toast  from 'react-hot-toast';

export default function UserTable({ users, fetchUsers }) {

  const handleDelete = async (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <div>Are you sure you want to delete this user?</div>

          <div className="flex gap-2">
            <button
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={async () => {
                try {
                  await axios.delete(`http://localhost:5000/users/${id}`);
                  fetchUsers();
                  toast.success("User deleted successfully");
                } catch (err) {
                  toast.error("Failed to delete user");
                }
                toast.dismiss(t.id);
              }}
            >
              Yes
            </button>

            <button
              className="px-3 py-1 bg-gray-500 text-white rounded"
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: 4000 }
    );
  };

  return (
    <div className="bg-zinc-800 rounded-lg p-6">
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-700">
            <th className="text-left py-3 text-orange-400">Name</th>
            <th className="text-left py-3 text-orange-400">Email</th>
            <th className="text-left py-3 text-orange-400">Role</th>
            {/* <th className="text-left py-3 text-orange-400">Status</th> */}
            <th className="text-left py-3 text-orange-400">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-400">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-zinc-700 hover:bg-zinc-700"
            >
              <td className="py-3">{user.name}</td>
              <td className="py-3 text-gray-400">{user.email}</td>
              <td className="py-3">{user.role}</td>
              {/* <td className="py-3">{user.status}</td> */}

              <td className="py-3 text-center">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-400"
                    title="Delete User"
                  >
                    <Trash2 size={18} />
                  </button>
              </td>
            </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
