import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function CustomerSupport() {
  const { user, isAuthenticated } = useAuth();
  const [fullName, setFullName] = useState(user?.full_name || "");
  const [emailInput] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("You must be logged in to send a message");
      return;
    }

    if (!fullName || !message) {
      toast.error("Full Name and Message are required");
      return;
    }

    if (phone && phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ fullName, email: emailInput, phone, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to send message");
        return;
      }

      toast.success("Message sent successfully!");
      setMessage("");
      setPhone("");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-12 p-10 bg-[#1a1a1a] border border-[#8B6914] rounded-3xl flex flex-col md:flex-row gap-16">
      
      {/* Left side: Contact info */}
      <div className="md:w-1/2 flex flex-col justify-center text-gray-300 space-y-6">
        <h2 className="text-3xl font-bold text-[#D4AF37] mb-2">Contact Us</h2>
        <p className="text-gray-400">
          If you have questions, feedback, or need assistance, reach out to us using the form. 
          We are here to help!
        </p>

        <div className="space-y-4">
          <div>
            <span className="block font-semibold text-gray-300">Email:</span>
            <span className="text-white">chordify21@gmail.com</span>
          </div>
          <div>
            <span className="block font-semibold text-gray-300">Phone:</span>
            <span className="text-white">9800000000</span>
          </div>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="md:w-1/2">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Full Name */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full bg-[#2a2520] border border-[#8B6914] rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Email</label>
            <input
              type="email"
              value={emailInput}
              readOnly
              className="w-full bg-[#2a2520] border border-[#8B6914] rounded-xl py-3 px-4 text-gray-400 cursor-not-allowed placeholder-gray-500 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Phone </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => {
                // Only numbers, max 10 digits
                const val = e.target.value.replace(/\D/g, "");
                setPhone(val.slice(0, 10));
              }}
              placeholder="Enter your phone number"
              className="w-full bg-[#2a2520] border border-[#8B6914] rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message..."
              className="w-full bg-[#2a2520] border border-[#8B6914] rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none resize-none h-32"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#D4AF37] text-black font-semibold rounded-xl disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
