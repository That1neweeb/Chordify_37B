import { TabExercise } from "../models/tabExercise.js";

export const getAllExercises = async (req, res) => {
  try {
    const exercises = await TabExercise.findAll({
      order: [["id", "ASC"]]
    });
    console.log(exercises)  
    return res.status(200).send({data : exercises, message:"Fetched all the exercises"});
  } catch (error) {
    console.error("Error fetching strumming patterns:", error);
    return res.status(500).json({
      message: "Failed to fetch strumming patterns"
    });
  }
};