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
    profile_image: null,
  });

  useEffect(() => {
    if (!token) window.location.href = "/login";
  }, [token]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
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
        if (data.user.profile_image) setPreviewImage(data.user.profile_image);
      } catch (err) {
        console.error("Fetch profile error:", err);
        toast.error("Error fetching profile");
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUser((prev) => ({ ...prev, profile_image: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

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
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Profile update failed");
        return;
      }

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      if (data.user?.profile_image) setPreviewImage(data.user.profile_image);
    } catch (err) {
      console.error("Update profile error:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      <ToastContainer />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6" style={{ color: "var(--link-hover)" }}>
          My Profile
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="rounded-3xl p-6 flex flex-col items-center" style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--border-color)" }}>
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center text-4xl font-bold" style={{ backgroundColor: "var(--hover-bg)", color: "var(--text-color)" }}>
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
                <label className="absolute bottom-1 right-1 p-2 rounded-full cursor-pointer" style={{ backgroundColor: "var(--link-hover)" }}>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              )}
            </div>

            <h2 className="mt-4 text-2xl font-bold" style={{ color: "var(--link-hover)" }}>
              {user.full_name}
            </h2>
            <p style={{ color: "var(--text-color)" }}>{user.role}</p>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mt-6 w-full py-3 rounded-lg"
              style={{ backgroundColor: "var(--button-bg)", color: "var(--text-color)" }}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>

            {isEditing && (
              <button
                onClick={handleSave}
                className="mt-2 w-full py-3 rounded-lg"
                style={{ backgroundColor: "var(--hover-bg)", color: "var(--text-color)" }}
              >
                Save Changes
              </button>
            )}
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-2 rounded-3xl p-6" style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--border-color)" }}>
            <h3 className="text-xl font-bold mb-6" style={{ color: "var(--link-hover)" }}>
              Personal Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm" style={{ color: "var(--text-color)" }}>Full Name</label>
                <input
                  name="full_name"
                  value={user.full_name}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="w-full rounded-xl px-4 py-2"
                  style={{ backgroundColor: "var(--bg-color)", border: "1px solid var(--border-color)", color: "var(--text-color)" }}
                />
              </div>

              <div>
                <label className="text-sm" style={{ color: "var(--text-color)" }}>Bio</label>
                <textarea
                  name="bio"
                  value={user.bio}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="w-full rounded-xl px-4 py-2"
                  style={{ backgroundColor: "var(--bg-color)", border: "1px solid var(--border-color)", color: "var(--text-color)" }}
                />
              </div>

              <div>
                <label className="text-sm" style={{ color: "var(--text-color)" }}>Email</label>
                <input
                  value={user.email}
                  readOnly
                  className="w-full rounded-xl px-4 py-2"
                  style={{ backgroundColor: "var(--bg-color)", border: "1px solid var(--border-color)", color: "var(--text-color)" }}
                />
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={() => setShowReset(true)}
                className="w-full py-3 rounded-xl"
                style={{ backgroundColor: "var(--hover-bg)", color: "var(--success-color)" }}
              >
                Reset Password
              </button>

              <button
                onClick={() => setShowChange(true)}
                className="w-full py-3 rounded-xl"
                style={{ backgroundColor: "var(--hover-bg)", color: "var(--success-color)" }}
              >
                Change Password
              </button>

              <button
                onClick={() => setShowDelete(true)}
                className="w-full py-3 rounded-xl"
                style={{ backgroundColor: "var(--hover-bg)", color: "var(--error-color)" }}
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
