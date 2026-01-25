import { Songs } from "../models/association.js"

export const getRecommendedSongs = async (req,res) => {
    try {
        const songs = await Songs.findAll();
        res.status(200).json({data: songs, message:"Songs successfully fetched"})
    } catch(e) {
        res.status(500).send(e)
    }
}