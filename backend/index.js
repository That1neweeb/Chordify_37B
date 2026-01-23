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
// import './models/association.js'






const app = express();

connection();

app.use(express.json());
app.use(cors());

createUploadsFolder(); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//Routes :
app.use('/products', productRoutes); //to fetch products
app.use('/songs', songRoutes); //to fetch songs
app.use('/auth', authRoutes); //to login, register, verify email
app.use('/cart', cartRoutes); //to add to cart, remove


app.listen(5000);

