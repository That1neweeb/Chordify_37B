import { Songs } from "../models/songModel.js"

export const getRecommendedSongs = async (req,res) => {
    try {
        const songs = await Songs.findAll();
        res.status(200).json({data: songs, message:"Songs successfully fetched"})
    } catch(e) {
        res.status(500).send(e)
    }
}

export const getSongContent = async(req, res) => {
    try {
        const id = req.params.id;
        const song = await Song.getSongContentById(id);
        res.json(song);
    } catch(err) {
        console.log("Database error : " +err);
        res.status(500).send("Database error");
    }
}

export const searchSongs = async (req, res) => {
  try {
    const { search } = req.query;

    // If search is empty, return empty array
    if (!search || search.trim() === "") {
      return res.status(200).json([]);
    }

    const songs = await Song.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          { artist: { [Op.iLike]: `%${search}%` } },
          { difficulty: { [Op.iLike]: `%${search}%` } },
        ],
      },
    });

    res.status(200).json(songs);

  } catch (error) {
    console.error("Song search error:", error);
    res.status(500).json({ message: "Song search failed" });
  }
};


