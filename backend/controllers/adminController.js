import fs from "fs";
import path from "path";
import { Products, Users, Songs } from '../models/association.js';
import { Posts } from '../models/postModel.js';


// For : PRODUCTS

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.findAll();
    res.status(200).json({ message: "All products fetched", data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get pending products
export const getPendingProducts = async (req, res) => {
  try {
    const products = await Products.findAll({
      where: { status: "pending" },
      order: [['id', 'DESC']]
    });
    res.status(200).json({ message: "Pending products fetched", data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get rejected products
export const getRejectedProducts = async (req, res) => {
  try {
    const products = await Products.findAll({
      where: { status: "rejected" },
      order: [['id', 'DESC']]
    });
    res.status(200).json({ message: "Rejected products fetched", data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Approve a product
export const approveProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [rowsUpdated, [updatedProduct]] = await Products.update(
      { status: "approved" },
      { where: { id }, returning: true }
    );
    if (!rowsUpdated) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product approved", product: updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Reject a product
export const rejectProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [rowsUpdated, [updatedProduct]] = await Products.update(
      { status: "rejected" },
      { where: { id }, returning: true }
    );
    if (!rowsUpdated) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product rejected", product: updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// For : USER

// Fetch all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      order: [['id', 'DESC']]
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.id === Number(id)) {
      return res.status(400).json({
        message: "Admin cannot delete themselves"
      });
    }

    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();

    return res.status(200).json({
      message: "User deleted successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



// For : POST

// Get all pending posts for Admin dashboard
export const getPendingPosts = async (req, res) => {
  try {
    const posts = await Posts.findAll({
      where: { approval_status: false },  // only pending posts
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Approve a post
export const approvePost = async (req, res) => {
  try {
    const id = req.params.id;

    await Posts.update(
      { approval_status: true }, 
      { where: { id } }
    );

    res.status(200).json({ message: "Post approved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Reject a post

export const rejectPost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Posts.findByPk(id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Delete uploaded video file
    const filePath = path.join(process.cwd(), post.video_URL);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await post.destroy();
    res.status(200).json({ message: "Post rejected and video deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};




// For : SONGS


export const addSong = async (req, res) => {
  try {
    const {
      title,
      artist,
      strummingPattern,
      difficulty,
      content,
      links
    } = req.body;

    // Multer file
    const cover_image = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    // basic validation
    if (!title || !artist || !strummingPattern || !difficulty || !cover_image) {
      return res.status(400).json({ 
        message: "All required fields must be filled"
     });
    }

    // parse links if sent as string
    let linksArray = [];
    if (links) {
      if (typeof links === "string") {
        linksArray = JSON.parse(links); // e.g. from frontend JSON input
      } else if (Array.isArray(links)) {
        linksArray = links;
      }
    }

    const newSong = await Songs.create({
      title,
      artist,
      strummingPattern,
      difficulty,
      cover_image,
      content : content ? JSON.parse(content) : null,
      links: linksArray,
    });

    res.status(201).json({
      message: "Song added successfully",
      song: newSong
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add song" });
  }
};


// Get all songs
export const getAllSongs = async (req, res) => {
  try {
    const songs = await Songs.findAll();
    res.json(songs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch songs" });
  }
};

// Delete a song
export const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    await Songs.destroy({ where: { id } });
    res.json({ message: "Song deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete song" });
  }
};

