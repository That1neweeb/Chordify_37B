const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

//Guitar routes
//to fetch guitars
const guitarRouter = require("./routes/guitar");
app.use('/guitar', guitarRouter);


//Product routes
//to fetch products
const productRouter = require("./routes/product");
app.use('/product', productRouter);

//User routes
const userRouter = require("./routes/user");
app.use('/users', userRouter);


//Songs(if any)
//to fetch songs
const songRouter = require("./routes/songs");
app.use('/songs', songRouter);


app.listen(5000, () =>
    console.log("server running on port 5000")
);

