import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });


import { connection } from "./db.js";
import express from "express";
import cors from "cors";
import productRoutes from './routes/productRoutes.js';
import songRoutes from './routes/songs.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postsRoutes.js';
// import './models/association.js'

const app = express();

connection();

app.use(express.json());
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));


//Routes :
app.use('/products', productRoutes); //to fetch products
app.use('/songs', songRoutes); //to fetch songs
app.use('/auth', authRoutes); //to login, register, verify email
app.use("/posts",postRoutes ); // to upload and fetch posts


app.listen(5000);

