const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));


//to fetch guitars
const guitarRouter = require("./routes/guitars");
app.use('/guitars', guitarRouter);

//to fetch songs
const songRouter = require("./routes/songs");
app.use('/songs', songRouter);

app.listen(5000);

