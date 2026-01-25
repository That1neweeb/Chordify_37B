import { StrummingPattern } from "../models/StrummingPattern.js";

export const getAllStrummingPatterns = async (req, res) => {
  try {
    const patterns = await StrummingPattern.findAll({
      order: [["id", "ASC"]]
    });

    return res.status(200).json(patterns);
  } catch (error) {
    console.error("Error fetching strumming patterns:", error);
    return res.status(500).json({
      message: "Failed to fetch strumming patterns"
    });
  }
};
