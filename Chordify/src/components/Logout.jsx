import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, X, AlertCircle } from "lucide-react";

export default function Logout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="fixed inset-0 bg-black/80"></div>

      <div className="relative bg-gray-900 border border-gray-700 rounded-3xl p-10 max-w-md w-full">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X />
        </button>

        <div className="flex justify-center mb-6">
          <LogOut className="w-14 h-14 text-amber-500" />
        </div>

        <h2 className="text-3xl font-bold text-center text-amber-400 mb-4">
          Logout
        </h2>

        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 mb-6">
          <div className="flex gap-3">
            <AlertCircle className="text-amber-500" />
            <p className="text-gray-300 text-sm">
              Are you sure you want to logout?
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-black py-3 rounded-xl font-semibold"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
}
