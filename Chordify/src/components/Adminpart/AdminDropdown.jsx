import React, { useState } from "react";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const adminImage = localStorage.getItem("adminImage");
  const adminUser = localStorage.getItem("adminUser");

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("admintoken");
      localStorage.removeItem("adminUser");
      localStorage.removeItem("adminImage");
      navigate("/login");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-700">
          {adminImage ? (
            <img
              src={adminImage}
              alt="Admin"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-blue-400"></div>
          )}
        </div>

        <ChevronDown className="text-gray-400" size={20} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg">
          <div className="p-3 border-b border-zinc-700">
            <p className="text-sm font-bold">{adminUser || "Admin"}</p>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
          
          <button
            className="flex items-center gap-2 w-full p-3 hover:bg-zinc-800 text-red-400"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}