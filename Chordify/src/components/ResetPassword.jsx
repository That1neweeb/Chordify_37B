import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(""); setSuccess("");
    if (newPassword !== confirmPassword) { setError("Passwords do not match"); return; }

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword, confirmPassword })
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message); return; }
      setSuccess("Password reset successful");
      setTimeout(() => navigate("/login"), 1500);
    } catch { setError("Something went wrong"); } 
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-[#1a1a1a] border border-[#8B6914] p-10 rounded-3xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">Set New Password</h2>
        {error && <p className="text-red-400 mb-3">{error}</p>}
        {success && <p className="text-green-400 mb-3">{success}</p>}
        <input type="password" placeholder="New password" className="w-full mb-4 p-3 rounded-xl bg-[#2a2520] text-white" onChange={(e) => setNewPassword(e.target.value)} />
        <input type="password" placeholder="Confirm password" className="w-full mb-6 p-3 rounded-xl bg-[#2a2520] text-white" onChange={(e) => setConfirmPassword(e.target.value)} />
        <button onClick={handleSubmit} disabled={loading} className="w-full bg-[#D4AF37] text-black py-3 rounded-xl font-semibold disabled:opacity-50">{loading ? "Resetting..." : "Reset Password"}</button>
      </div>
    </div>
  );
}
