import { where } from "sequelize";
import { Songs } from "../models/association.js";
import { Users } from "../models/association.js";
import { FavouriteSongs } from "../models/association.js";
import {Op} from "sequelize";

export const getRecommendedSongs = async (req,res) => {
    try {
        const songs = await Songs.findAll();
        console.log(songs);
        res.status(200).send({data: songs, message:"Songs successfully fetched"})
    } catch(e) {
        res.status(500).send(e)
    }
}

export const getSongContent = async(req, res) => {
    try {
        const id = req.params.id;
        const song = await Songs.findOne({
          where : {id}
        });
        console.log(song);
        res.send({data:song , message:"Song content fetched successfully"});
    } catch(err) {
        console.log("Database error : " +err);
        res.status(500).send("Database error");
    }
}

export const searchSongs = async (req, res) => {
  try {
 const searchTerm = (req.query.search || "").trim();

if (!searchTerm) return res.status(200).json([]);

const songs = await Songs.findAll({
  where: {
    [Op.or]: [
      { title: { [Op.iLike]: `%${searchTerm}%` } },
      { artist: { [Op.iLike]: `%${searchTerm}%` } },
      { difficulty: { [Op.iLike]: `%${searchTerm}%` } },
    ],
  },
});
    console.log(songs);
    res.status(200).send({ data:songs , message:"Songs fetched successfully"});

  } catch (error) {
    console.error("Song search error:", error);
    res.status(500).json({ message: "Song search failed" });
  }
};


// Set Favourite Songs
export const setFavourite = async (req,res) => {
  try{
    const user_id = req.user.id
    const song_id  = req.params.id;
    console.log(song_id);

  // check if it already is favourited
  const alreadyFav = await FavouriteSongs.findOne({
    where : { user_id,song_id}
  });

  if(alreadyFav){
    return res.status(400).send({message:"Already in Favourites"});
  }

  await FavouriteSongs.create({
    user_id,
    song_id,
  })

  return res.status(200).send({
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
    const user_id = req.user.id;

    const user = await Users.findByPk(req.user.id, {
  include: {
    model: Songs,
    as: "favouriteSongs"
  }
});

// 

    if (!user.favouriteSongs) {
      console.log("User not found with ID:", user_id);
      return res.status(404).json({ message: "User not found" });
    }
    console.log("Favourite Songs:", user.favouriteSongs);
    return res.status(200).json({ data: user.favouriteSongs, message: "Favourites fetched successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};