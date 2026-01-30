import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import { createUploadsFolder } from "./utils/helper.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });


import { connection } from "./db.js";
import express from "express";
import cors from "cors";
import productRoutes from './routes/productRoutes.js';
import songRoutes from './routes/songs.js';
import authRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cartRoute.js';
import favouriteRoutes from './routes/favouriteRoute.js';
import './models/association.js'





import postRoutes from './routes/postsRoutes.js';
import chordsRoutes from './routes/chordsRoutes.js';
import strummingPatternRoutes from './routes/strummingpatternRoutes.js';
import tabExerciseRoutes from './routes/tabExercisesRoute.js';
import supportRoutes from './routes/supportRoutes.js';
// import profileRoutes from './routes/profileRoutes.js'; pachi pull hanney

const app = express();

connection();

app.use(express.json());
app.use(cors());

createUploadsFolder(); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/images', express.static(path.join(__dirname,'images')));

//Routes :
app.use('/products', productRoutes); //to fetch products
app.use('/songs', songRoutes); //to fetch songs
app.use('/auth', authRoutes); //to login, register, verify email
app.use('/support', supportRoutes); //to send support messages
// app.use("/api", profileRoutes);// to profile
app.use("/posts",postRoutes ); // to upload and fetch posts
app.use("/chords", chordsRoutes); // to fetch chords and add other features later on
app.use('/cart', cartRoutes); //to add to cart, remove
app.use('/tabs',tabExerciseRoutes); //for tab exercises
app.use('/strumming',strummingPatternRoutes); // for strumming pattern exercises
app.use('/favourites', favouriteRoutes); 




app.listen(5000, () =>
    console.log("server running on port 5000")
);

