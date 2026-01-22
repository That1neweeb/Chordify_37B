import React, { useState, useEffect } from "react";
import { Camera, Edit3 } from "lucide-react";
import PasswordReset from "./PasswordReset";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";

function ViewProfile() {
  const [showReset, setShowReset] = useState(false);
  const [showChange, setShowChange] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const [user, setUser] = useState({
    full_name: "",
    email: "",
    role: "",
    phone: "",
    dob: "",
    profile_image: null,
  });

  const token = localStorage.getItem("token");

  // Redirect to login if not logged in
  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    }
  }, [token]);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("Failed to fetch profile:", res.status);
          return;
        }

        const data = await res.json();
        setUser(data.user);

        if (data.user.profile_image) {
          setPreviewImage(`http://localhost:5000/images/${data.user.profile_image}`);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [token]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser((prev) => ({ ...prev, profile_image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Save profile updates
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("phone", user.phone || "");
      formData.append("dob", user.dob || "");

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

      if (res.ok) {
        alert("Profile updated successfully!");
        setIsEditing(false);

        if (data.user.profile_image) {
          setPreviewImage(`http://localhost:5000/images/${data.user.profile_image}`);
        }
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Error updating profile");
    }
  };

  // Handle account deletion
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      const res = await fetch("http://localhost:5000/auth/delete-acc", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete account");
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#D4AF37] mb-6">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel */}
          <div>
            <div className="bg-[#2a2520] border border-[#8B6914] rounded-3xl p-6 flex flex-col items-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-[#3a3a3a] flex items-center justify-center text-4xl font-bold overflow-hidden">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user.full_name?.charAt(0).toUpperCase()
                  )}
                </div>

                <label className="absolute bottom-0 right-0 bg-[#D4AF37] p-2 rounded-full cursor-pointer">
                  <Camera className="w-5 h-5 text-black" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              <h2 className="mt-4 text-2xl font-bold text-[#D4AF37]">
                {user.full_name}
              </h2>
              <p className="text-gray-400">{user.role}</p>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="mt-6 w-full bg-[#D4AF37] text-black py-3 rounded-lg flex justify-center items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                {isEditing ? "Cancel Edit" : "Edit Profile"}
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
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-2">
            <div className="bg-[#2a2520] border border-[#8B6914] rounded-3xl p-6">
              <h3 className="text-xl font-bold text-[#D4AF37] mb-6">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-300 text-sm">Full Name</label>
                  <input
                    value={user.full_name}
                    readOnly
                    className="w-full bg-[#1a1a1a] border border-[#8B6914] rounded-xl px-4 py-2"
                  />
                </div>

                <div>
                  <label className="text-gray-300 text-sm">Email</label>
                  <input
                    value={user.email}
                    readOnly
                    className="w-full bg-[#1a1a1a] border border-[#8B6914] rounded-xl px-4 py-2"
                  />
                </div>

                <div>
                  <label className="text-gray-300 text-sm">Phone</label>
                  <input
                    name="phone"
                    value={user.phone || ""}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className="w-full bg-[#1a1a1a] border border-[#8B6914] rounded-xl px-4 py-2"
                  />
                </div>

                <div>
                  <label className="text-gray-300 text-sm">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={user.dob || ""}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className="w-full bg-[#1a1a1a] border border-[#8B6914] rounded-xl px-4 py-2"
                  />
                </div>
              </div>

              {/* Account Actions */}
              <div className="mt-8 space-y-4">
                <button
                  onClick={() => setShowReset(true)}
                  className="w-full bg-[#3a3a3a] py-3 rounded-xl"
                >
                  Reset Password
                </button>
                <button
                  onClick={() => setShowChange(true)}
                  className="w-full bg-[#3a3a3a] py-3 rounded-xl"
                >
                  Change Password
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full bg-[#3a3a3a] py-3 rounded-xl text-red-500"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showReset && <PasswordReset onClose={() => setShowReset(false)} />}
      {showChange && <ChangePassword onClose={() => setShowChange(false)} />}
      {showDelete && <DeleteAccount onClose={() => setShowDelete(false)} />}
    </div>
  );
}

export default ViewProfile;
