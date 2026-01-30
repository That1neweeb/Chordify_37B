import Exercise from "../models/tabExerciseModel.js";
import Chord from "../models/chordModel.js";
import StrummingPattern from "../models/StrummingPatternModel.js";

export const getChords = async (req, res) => {
    try {
        const chords = await Chord.findAll();
        res.status(200).json({ data: chords, message: "Chords fetched successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



export const getExercises = async (req, res) => {
    try {
        const exercises = await Exercise.findAll();
        res.status(200).json({ data: exercises, message: "Exercises fetched successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



export const getStrummingPatterns = async (req, res) => {
    try {
        const patterns = await StrummingPattern.findAll();
        res.status(200).json({ data: patterns, message: "Strumming patterns fetched successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
