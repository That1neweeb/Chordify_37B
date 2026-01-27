import { Posts } from "../models/postModel.js";
import { Users } from "../models/userModel.js"; //  IMPORT USERS
// UPLOAD VIDEO

export const addVideo = async (req, res) => {
  try {
    console.log("Full req.body:", req.body);
    console.log("user info:", req.user);

    const { title, description } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No video uploaded" });
    }

    // 🔹 Fetch user from DB using ID from token
    const user = await Users.findByPk(req.user.id, {
      attributes: ["id", "full_name"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const videoPath = `/uploads/${req.file.filename}`;
    console.log("req.file.filename:", req.file?.filename);
    console.log("computed video URL:", `/uploads/${req.file?.filename}`);
    console.log(videoPath);

    const posts = await Posts.create({
      title,
      description,
      video_URLS: videoPath, 
      uploadedBy: user.full_name, //fetched from DB
      user_id: user.id,
    });

    res.status(201).json({
      message: "Video added successfully",
      posts,
    });

  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// load all the videos from the database
export const getAllvideos = async (req,res) =>{
    try{
        const posts = await Posts.findAll({
            where:{approval_status:true},
            order:[['createdAt','DESC']]
        });
        res.status(200).send({data:posts, message:"Videos fetched successfully"});
    }
    catch(e){
        res.status(500).send(e);
    }
}

// get all the videos the users has posted

export const getMyuploads = async(req,res) =>{
  const user_id = req.user.id;
  try{
    const posts = await Posts.findAll({
      where:{user_id:user_id},
      order:[['createdAt','DESC']]
    })
    console.log("Fetch vayo hai",posts);
    res.status(200).send({data : posts, message:"All the videos fetched"} );
  }
  catch(e){
    res.status(500).send(e);
  }
}