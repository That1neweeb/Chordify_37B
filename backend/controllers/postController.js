import { Posts } from "../models/postModel.js";

// UPLOAD VIDEO
export const addVideo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No video uploaded" });
    }

    const post = await Posts.create({
      title,
      description,
      video_URL: req.file.filename, 
      uploadedBy: req.user.full_name,
      user_id: req.user.id,
    });

    res.status(201).json({
      message: "Video added successfully",
      post: {
        id: post.id,
        title: post.title,
        description: post.description,
        videoUrl: `/uploads/videos/${post.video_URL}`, 
        uploadedBy: post.uploadedBy,
      },
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL VIDEOS
export const getAllVideos = async (req, res) => {
  try {
    const posts = await Posts.findAll({
      where: { approval_status: true },
      order: [["createdAt", "DESC"]],
    });

    const formattedPosts = posts.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      videoUrl: `/uploads/videos/${p.video_URL}`, 
      uploadedBy: p.uploadedBy,
    }));

    res.status(200).json({ data : formattedPosts, message: "Videos fetched successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
