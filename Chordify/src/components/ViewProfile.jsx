import React, { useState } from "react";
import {
  Mail,
  Phone,
  Calendar,
  Camera,
  MapPin,
  User,
  LogOut,
  Trash2,
  ShoppingBag,
  Lock,
  KeyRound,
} from "lucide-react";

// Import modal components
import Logout from "./Logout";
import PasswordReset from "./PasswordReset";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";

function ViewProfile() {
  const [currentView] = useState("profile");
  const [showLogout, setShowLogout] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [showChange, setShowChange] = useState(false);
  const [showDelete, setShowDelete] = useState(false);


  const [user] = useState({
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    createdAt: "2023-06-15T10:30:00Z",
  });

  const [avatarUrl, setAvatarUrl] = useState(
    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop"
  );

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 p-6">
        <h2 className="text-2xl font-bold text-white mb-6">MY ACCOUNT</h2>

        <button className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-md mb-1 text-gray-400 hover:bg-gray-800 hover:text-white transition">
          <User className="w-4 h-4" />
          Profile
        </button>

        <button className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-md mb-1 text-gray-400 hover:bg-gray-800 hover:text-white transition">
          <ShoppingBag className="w-4 h-4" />
          Orders
        </button>

        <button
          className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-md mb-1 text-gray-400 hover:bg-gray-800 hover:text-white transition"
          onClick={() => setShowChange(true)}
        >
          <Lock className="w-4 h-4" />
          Change Password
        </button>

        <button
          className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-md mb-1 text-gray-400 hover:bg-gray-800 hover:text-white transition"
          onClick={() => setShowReset(true)}
        >
          <KeyRound className="w-4 h-4" />
          Reset Password
        </button>

        <button
          className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-md mb-1 text-red-400 hover:bg-red-900/20 transition"
          onClick={() => setShowLogout(true)}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>

        <button
          className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-md mb-1 text-red-400 hover:bg-red-900/20 transition"
          onClick={() => setShowDelete(true)}
        >
          <Trash2 className="w-4 h-4" />
          Delete Account
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center p-8">
        {currentView === "profile" && (
          <div className="bg-gray-900 border border-gray-700 rounded-3xl p-12 max-w-4xl w-full">
            <div className="flex flex-col items-center text-center">
              <div className="relative group mb-6">
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="w-40 h-40 rounded-full border-4 border-amber-500 object-cover"
                />
                <label
                  htmlFor="avatar"
                  className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition"
                >
                  <Camera className="text-white w-8 h-8" />
                </label>
                <input id="avatar" type="file" hidden accept="image/*" />
              </div>

              <h1 className="text-4xl font-bold text-amber-400">{user.name}</h1>
              <p className="text-gray-400 mb-4">@{user.username}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                <Info icon={<Mail />} label="Email" value={user.email} />
                <Info icon={<Phone />} label="Phone" value={user.phone} />
                <Info icon={<MapPin />} label="Location" value={user.location} />
                <Info
                  icon={<Calendar />}
                  label="Member Since"
                  value={new Date(user.createdAt).toDateString()}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showLogout && <Logout onClose={() => setShowLogout(false)} />}
      {showReset && <PasswordReset onClose={() => setShowReset(false)} />}
      {showChange && <ChangePassword onClose={() => setShowChange(false)} />}
        {showDelete && <DeleteAccount onClose={() => setShowDelete(false)} />}

    </div>
  );
}

// Info Box Component
function Info({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 bg-gray-800 p-4 rounded-xl border border-gray-700">
      <div className="text-amber-500">{icon}</div>
      <div className="text-left">
        <p className="text-xs text-gray-500 uppercase">{label}</p>
        <p className="text-gray-200">{value}</p>
      </div>
    </div>
  );
}

export default ViewProfile;
