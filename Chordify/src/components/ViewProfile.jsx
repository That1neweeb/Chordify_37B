import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  Calendar,
  Camera,
  MapPin
} from "lucide-react";

export default function ViewProfile() {
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState(
    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop"
  );

  const menuItems = [
    { name: "Dashboard" },
    { name: "Orders" },
    { name: "Change Password" },
    { name: "Password Reset", route: "/password-reset" },
    { name: "Logout", danger: true, route: "/logout" },
    { name: "Delete Account", danger: true }
  ];

  const customer = {
    name: "Satyam Shrestha",
    username: "bouna",
    email: "satyam@email.com",
    phone: "9800000000",
    location: "Kathmandu, Nepal",
    memberSince: "January 2026",
    bio: "Collecting vintage guitars and performing live."
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatarUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleMenuClick = (item) => {
    if (item.route) {
      navigate(item.route);
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 p-6">
        <h2 className="text-2xl font-bold text-white mb-6">MY ACCOUNT</h2>
        {menuItems.map((item, i) => (
          <button
            key={i}
            onClick={() => handleMenuClick(item)}
            className={`w-full text-left px-4 py-3 rounded-md mb-1 transition ${
              item.danger
                ? "text-red-400 hover:bg-red-900/20"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center p-8">
        <div className="bg-gray-900 border border-gray-700 rounded-3xl p-12 max-w-4xl w-full">
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative group mb-6">
              <img
                src={avatarUrl}
                alt="avatar"
                className="w-40 h-40 rounded-full border-4 border-amber-500 object-cover"
              />
              <label
                htmlFor="avatar"
                className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer"
              >
                <Camera className="text-white w-8 h-8" />
              </label>
              <input
                id="avatar"
                type="file"
                hidden
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>

            <h1 className="text-4xl font-bold text-amber-400">{customer.name}</h1>
            <p className="text-gray-400 mb-4">@{customer.username}</p>
            <p className="text-gray-300 mb-8">{customer.bio}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
              <Info icon={<Mail />} label="Email" value={customer.email} />
              <Info icon={<Phone />} label="Phone" value={customer.phone} />
              <Info icon={<MapPin />} label="Location" value={customer.location} />
              <Info icon={<Calendar />} label="Member Since" value={customer.memberSince} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 bg-gray-800 p-4 rounded-xl border border-gray-700">
      <div className="text-amber-500">{icon}</div>
      <div>
        <p className="text-xs text-gray-500 uppercase">{label}</p>
        <p className="text-gray-200">{value}</p>
      </div>
    </div>
  );
}