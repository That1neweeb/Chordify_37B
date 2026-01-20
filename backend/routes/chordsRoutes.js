import express from 'express';
import { getAllChords } from '../controllers/chordsController';
const router = express.Router();

router.get('/getAllChords',getAllChords);

export default router;