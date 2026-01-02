import React, { useState } from "react";
import { RefreshCw, X, AlertCircle, Mail } from "lucide-react";

export default function PasswordReset() {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    // Add your reset logic here
    console.log("Reset profile for:", email);
  };

  const handleCancel = () => {
    // Navigate back logic
    console.log("Cancelled");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="fixed inset-0 bg-black/80"></div>

      <div className="relative bg-gray-900 border border-gray-700 rounded-3xl p-10 max-w-md w-full">
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X />
        </button>

        <div className="flex justify-center mb-6">
          <RefreshCw className="w-14 h-14 text-amber-500" />
        </div>

        <h2 className="text-3xl font-bold text-center text-amber-400 mb-4">
          Reset Password
        </h2>

        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 mb-6">
          <div className="flex gap-3">
            <AlertCircle className="text-amber-500 flex-shrink-0" />
            <p className="text-gray-300 text-sm">
              Enter your email address to reset your profile. All your data will be permanently deleted.
            </p>
          </div>
        </div>

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
              className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleCancel}
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