import { Chords } from "../models/Chords.js";
export const getAllChords = async (req, res)=>{
    try{
        const chords = await Chords.findAll();
        res.status(200).send({data: chords, message: "Chords fetched successfully"});
    }
    catch(err){
        console.error("Error fetching chords:", err);
        res.status(500).json({message: "Internal server error"});
    }
}