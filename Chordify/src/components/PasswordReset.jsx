import React, { useState } from "react";

export default function PasswordReset({ onClose }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setError(""); setSuccess("");
    if (!email) { setError("Email is required"); return; }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/auth/reset-password-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message); return; }
      setSuccess("Reset password link sent to your email"); setEmail("");
    } catch { setError("Something went wrong"); } 
    finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/80" onClick={onClose}></div>
      <div className="relative bg-[#1a1a1a] border border-[#8B6914] rounded-3xl p-10 max-w-md w-full z-10">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-[#D4AF37]"><X /></button>
        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">Reset Password</h2>
        {error && <div className="mb-4 text-red-400 bg-red-900/20 border border-red-500/30 rounded-lg px-4 py-2 text-sm">{error}</div>}
        {success && <div className="mb-4 text-green-400 bg-green-900/20 border border-green-500/30 rounded-lg px-4 py-2 text-sm">{success}</div>}
        <div className="mb-6">
          <label className="block text-gray-300 text-sm mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] w-5 h-5" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full bg-[#2a2520] border border-[#8B6914] rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]" />
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={onClose} className="flex-1 bg-[#3a3a3a] text-white py-3 rounded-xl">Cancel</button>
          <button onClick={handleReset} disabled={loading} className="flex-1 bg-[#D4AF37] text-black py-3 rounded-xl font-semibold disabled:opacity-50">{loading ? "Sending..." : "Reset Password"}</button>
        </div>
      </div>
    </div>
  );
}
