import { TabExercise } from "../models/tabExercise.js";

export const getAllExercises = async (req, res) => {
  try {
    const exercises = await TabExercise.findAll({
      order: [["id", "ASC"]]
    });

    return res.status(200).json(exercises);
  } catch (error) {
    console.error("Error fetching strumming patterns:", error);
    return res.status(500).json({
      message: "Failed to fetch strumming patterns"
    });
  }
};