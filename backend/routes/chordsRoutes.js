import express from 'express';
import { getAllChords } from '../controllers/chordsController.js';
const router = express.Router();

router.get('/getAllChords',getAllChords);

export default router;