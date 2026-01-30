import React, { useState } from "react";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function AdminDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const adminImage = localStorage.getItem("adminImage");
  const adminUser = localStorage.getItem("adminUser");

  const handleLogout = () => {
    // const confirmLogout = window.confirm("Are you sure you want to log out?");
    // if (confirmLogout) {
    //   // localStorage.removeItem("admintoken");
    //   // localStorage.removeItem("adminUser");
    //   // localStorage.removeItem("adminImage");
    //   //Delete everything in localStorage
    //   localStorage.clear();
    //   sessionStorage.clear();

    //   setOpen(false);//close dropdown

    //   toast.success("Logged out successfully");

    //   navigate("/login");

    toast.info(
      <div>
        <p className="font-bold">Are you sure you want to logout?</p>

        <div className="flex gap-2 mt-2">
          <button
            onClick={() => {
              toast.dismiss(); // close the confirm toast
              performLogout();
            }}
            className="px-3 py-1 bg-red-500 rounded text-white"
          >
            Yes
          </button>

          <button
            onClick={() => toast.dismiss()} // just close toast
            className="px-3 py-1 bg-gray-500 rounded text-white"
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false, // stay until user clicks
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  const performLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setOpen(false);
    toast.success("Logged out successfully!");
    navigate("/login");
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

          {/* <button
            className="flex items-center gap-2 w-full p-3 hover:bg-zinc-800"
            onClick={() => navigate("/profile")}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button> */}

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
