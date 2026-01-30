import express from "express";
import { getChords, getExercises, getStrummingPatterns } from "../controllers/learnController.js";


const router = express.Router();

router.get("/chords", getChords);
router.get("/exercises", getExercises);
router.get("/strumming-patterns", getStrummingPatterns);

export default router;
