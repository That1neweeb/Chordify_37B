import { StrummingPattern } from "../models/StrummingPattern.js";

export const getAllStrummingPatterns = async (req, res) => {
  try {
    const patterns = await StrummingPattern.findAll({
      order: [["id", "ASC"]]
    });
    console.log(patterns);
    return res.status(200).send({data:patterns,message:"Fetched strumming patterns"});
  } catch (error) {
    console.error("Error fetching strumming patterns:", error);
    return res.status(500).json({
      message: "Failed to fetch strumming patterns"
    });
  }
};
