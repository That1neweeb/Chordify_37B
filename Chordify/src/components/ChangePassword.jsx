import React, { useState } from "react";

export default function ChangePassword({ onClose }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = async () => {
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/auth/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to change password");
        return;
      }

      setSuccess("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // close after short delay
      setTimeout(() => onClose(), 1200);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/80" onClick={onClose}></div>

      <div className="relative bg-[#1a1a1a] border border-[#8B6914] rounded-3xl p-10 max-w-md w-full z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#D4AF37]"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
          Change Password
        </h2>

        {/* Status Message */}
        {error && (
          <div className="mb-4 text-red-400 bg-red-900/20 border border-red-500/30 rounded-lg px-4 py-2 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 text-green-400 bg-green-900/20 border border-green-500/30 rounded-lg px-4 py-2 text-sm">
            {success}
          </div>
        )}

        {[
          {
            label: "Current Password",
            value: currentPassword,
            setter: setCurrentPassword,
            placeholder: "Enter current password"
          },
          {
            label: "New Password",
            value: newPassword,
            setter: setNewPassword,
            placeholder: "Enter new password"
          },
          {
            label: "Confirm Password",
            value: confirmPassword,
            setter: setConfirmPassword,
            placeholder: "Confirm new password"
          }
        ].map((field, idx) => (
          <div className="mb-5" key={idx}>
            <label className="block text-gray-300 text-sm mb-2">
              {field.label}
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] w-5 h-5" />
              <input
                type="password"
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                placeholder={field.placeholder}
                className="w-full bg-[#2a2520] border border-[#8B6914] rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        ))}

        <div className="flex gap-4 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-[#3a3a3a] text-white py-3 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={handleChange}
            disabled={loading || !currentPassword || !newPassword || !confirmPassword}
            className="flex-1 bg-[#D4AF37] text-black py-3 rounded-xl font-semibold disabled:opacity-50"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </div>
    </div>
  );
}
