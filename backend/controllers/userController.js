import { Users } from "../models/association.js";

export const getProfile = async (req, res) => {
  try {
    const user = await Users.findByPk(req.user.id); // fetch from DB
    if (!user) return res.status(404).json({ message: "User not found" });

    let profile_image_url = null;
    if (user.profile_image) {
      profile_image_url = `http://localhost:5000${user.profile_image}`
    }

    return res.status(200).json({
      user: {
        full_name: user.full_name,
        email: user.email,
        profile_image: profile_image_url,
      },
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await Users.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const updates = {};

    if (req.body.full_name && req.body.full_name.trim() !== "") {
      updates.full_name = req.body.full_name.trim();
    }

    if (req.file) {
      updates.profile_image = `/uploads/profiles/${req.file.filename}`; // relative path
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    await user.update(updates);

    const profile_image_url = user.profile_image
      ? `${process.env.BASE_URL || "http://localhost:5000"}${user.profile_image}`
      : null;

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        profile_image: profile_image_url,
      },
    });
  } catch (err) {
    console.error("Update profile error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
