import React, { useState } from "react";
import { X, Mail } from "lucide-react";

export default function PasswordReset({ onClose }) {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    console.log("Reset password for:", email);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/80" onClick={onClose}></div>

      <div className="relative bg-gray-900 border border-gray-700 rounded-3xl p-10 max-w-md w-full z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X />
        </button>

        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-300 text-sm mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleReset}
            disabled={!email}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-black py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}
