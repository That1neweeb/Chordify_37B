import React, { useState, useEffect } from "react";
import PasswordReset from "./PasswordReset";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ViewProfile() {
  const token = localStorage.getItem("token");

  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const [showReset, setShowReset] = useState(false);
  const [showChange, setShowChange] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [user, setUser] = useState({
    full_name: "",
    email: "",
    role: "",
    bio: "",
    profile_image: null, // can be File OR URL
  });

  /* 🔐 Redirect if not logged in */
  useEffect(() => {
    if (!token) window.location.href = "/login";
  }, [token]);

  /* 📥 Fetch Profile */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          toast.error("Failed to fetch profile");
          return;
        }

        const data = await res.json();

        setUser({
          full_name: data.user.full_name || "",
          email: data.user.email || "",
          role: data.user.role || "",
          bio: data.user.bio || "",
          profile_image: data.user.profile_image || null,
        });

        if (data.user.profile_image) {
          setPreviewImage(data.user.profile_image);
        }
      } catch (err) {
        console.error("Fetch profile error:", err);
        toast.error("Error fetching profile");
      }
    };

    fetchProfile();
  }, [token]);

  /* ✏️ Handle text inputs */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  /* 🖼️ Handle image selection */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUser((prev) => ({ ...prev, profile_image: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  /* 💾 Save profile */
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("full_name", user.full_name);
      formData.append("bio", user.bio);

      if (user.profile_image instanceof File) {
        formData.append("profile_image", user.profile_image);
      }

      const res = await fetch("http://localhost:5000/auth/profile/update", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Profile update failed");
        return;
      }

      toast.success("Profile updated successfully!");
      setIsEditing(false);

      if (data.user?.profile_image) {
        setPreviewImage(data.user.profile_image);
      }
    } catch (err) {
      console.error("Update profile error:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen text-white">
      <ToastContainer />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-[#D4AF37] mb-6">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="bg-[#2a2520] border border-[#8B6914] rounded-3xl p-6 flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-[#3a3a3a] flex items-center justify-center text-4xl font-bold">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user.full_name.charAt(0).toUpperCase()
                )}
              </div>

              {isEditing && (
                <label className="absolute bottom-1 right-1 bg-[#D4AF37] p-2 rounded-full cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            <h2 className="mt-4 text-2xl font-bold text-[#D4AF37]">
              {user.full_name}
            </h2>
            <p className="text-gray-400">{user.role}</p>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mt-6 w-full bg-[#D4AF37] text-black py-3 rounded-lg"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>

            {isEditing && (
              <button
                onClick={handleSave}
                className="mt-2 w-full bg-[#B8941E] text-black py-3 rounded-lg"
              >
                Save Changes
              </button>
            )}
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-2 bg-[#2a2520] border border-[#8B6914] rounded-3xl p-6">
            <h3 className="text-xl font-bold text-[#D4AF37] mb-6">
              Personal Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-300">Full Name</label>
                <input
                  name="full_name"
                  value={user.full_name}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="w-full bg-[#1a1a1a] border border-[#8B6914] rounded-xl px-4 py-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Bio</label>
                <textarea
                  name="bio"
                  value={user.bio}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="w-full bg-[#1a1a1a] border border-[#8B6914] rounded-xl px-4 py-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Email</label>
                <input
                  value={user.email}
                  readOnly
                  className="w-full bg-[#1a1a1a] border border-[#8B6914] rounded-xl px-4 py-2"
                />
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={() => setShowReset(true)}
                className="w-full bg-[#3a3a3a] py-3 rounded-xl text-green-500"
              >
                Reset Password
              </button>

              <button
                onClick={() => setShowChange(true)}
                className="w-full bg-[#3a3a3a] py-3 rounded-xl text-green-500"
              >
                Change Password
              </button>

              <button
                onClick={() => setShowDelete(true)}
                className="w-full bg-[#3a3a3a] py-3 rounded-xl text-red-500"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {showReset && <PasswordReset onClose={() => setShowReset(false)} />}
      {showChange && <ChangePassword onClose={() => setShowChange(false)} />}
      {showDelete && <DeleteAccount onClose={() => setShowDelete(false)} />}
    </div>
  );
}

export default ViewProfile;
