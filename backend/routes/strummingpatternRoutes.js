import express from 'express';
import { getAllStrummingPatterns } from '../controllers/strummingPatternController.js';
const router = express.Router();

router.get("/getAllPatterns", getAllStrummingPatterns);

export default router;