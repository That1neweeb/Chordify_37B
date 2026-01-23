import { Posts } from "../models/postModel.js";
// UPLOAD VIDEO
export const addVideo = async (req, res) => {
    try {
        const { title, desc,video_URL  } = req.body;
// validation
        if (!req.file) {
            return res.status(400).json({ message: "No video uploaded" });
        }

        // Create posts entry in the database
        const posts = await Posts.create({
           title,
            desc,
            video_URL: req.file.path,
            uploadedBy: req.user.full_name,
            user_id: req.user.id,
        });

        res.status(201).json({
            message: "Video added successfully",
            posts,
        });

    } catch (err) {
        console.error("Database error: " + err);
        res.status(500).json({ message: "Server error" });
    }


}

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