import { Songs } from "../models/association.js"
import { Op } from "sequelize";

export const fetchAllSongs = async (req,res) => {
    try {
        const songs = await Songs.findAll();
        res.status(200).json({data: songs, message:"Songs successfully fetched"})
    } catch(e) {
        res.status(500).send(e)
    }
}

// GET SONG CONTENT BY ID
export const getSongContent = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the song by ID
    const song = await Songs.findByPk(id);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    // Prepare response (including links)
    const songData = {
      id: song.id,
      title: song.title,
      artist: song.artist,
      difficulty: song.difficulty,
      cover_image: song.cover_image,
      content: song.content,
      links: song.links || "", 
    };

    res.status(200).json({ data: songData, message: "Song fetched successfully" });
  } catch (err) {
    console.error("Error fetching song content:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const searchSongs = async (req, res) => {
  try {
    const { search } = req.query;

    // If search is empty, return empty array
    if (!search || search.trim() === "") {
      return res.status(200).json([]);
    }

    const songs = await Songs.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          { artist: { [Op.iLike]: `%${search}%` } },
          { difficulty: { [Op.iLike]: `%${search}%` } },
        ],
      },
    });

    res.status(200).json({ data: songs, message: "Songs found" });

  } catch (error) {
    console.error("Song search error:", error);
    res.status(500).json({ message: "Song search failed", error: error.message });
  }
};
