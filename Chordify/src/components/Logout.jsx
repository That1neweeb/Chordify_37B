import React from "react";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Logout({ onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication data (if you're using authentication)
    // localStorage.removeItem("authToken");
    // sessionStorage.clear();

    // Close modal
    if (typeof onClose === "function") onClose();

    // Redirect to login page or home page
    navigate("/login"); // Change to "/" or wherever you want to redirect
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className="relative bg-[#1a1a1a] border border-[#8B6914] rounded-3xl p-10 max-w-md w-full z-10"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* Alert message */}
        <div className="bg-[#2a2520] p-4 rounded-xl border border-[#8B6914] mb-6 flex gap-3 items-center">
          <AlertCircle className="text-[#D4AF37]" />
          <p className="text-gray-300 text-sm">
            Are you sure you want to logout? You'll need to sign in again.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white py-3 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 bg-[#D4AF37] hover:bg-[#B8941E] text-black py-3 rounded-xl font-semibold transition-colors"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
}