import express from 'express';
import { getAllExercises } from '../controllers/tabExercisesController.js';
const router = express.Router();

router.get("/getAllExercises",getAllExercises);

export default router;