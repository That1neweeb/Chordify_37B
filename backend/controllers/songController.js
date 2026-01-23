import { where } from "sequelize";
import { Songs } from "../models/songModel.js"
import { Users } from "../models/userModel.js";
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
        const song = await Song.findOne({
          where : {id}
        })
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


// Set Favourite Songs
export const setFavourite = async (req,res) => {
  try{
    const user_id = req.user.id
    const { songId } = req.params;

  // check if it already is favourited
  const alreadyFav = await FavouriteSongs.findOne({
    where : { user_id,songId}
  });

  if(alreadyFav){
    return res.status(400).json({message:"Already in Favourites"});
  }

  await FavouriteSongs.create({
    user_id,
    songId,
  })

  return res.status(200).json({
    message: "Song is now added to favourite"
  });

  }
  catch(err){
    console.log(err);
    return res.status(500).json({message: "Server error"});

  }
}

// fetch all the favourites Songs
export const getMyFavourites = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await Users.findByPk(userId, {
      attributes: [], // we only want songs
      include: [
        {
          model: Songs,
          as: "favouriteSongs",
          through: {
            attributes: [] // hide junction table
          }
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      favourites: user.favouriteSongs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};