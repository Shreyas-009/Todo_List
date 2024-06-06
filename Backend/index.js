const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const port = process.env.port || 8000;
const mongoose = require('./config/mongoos');

// useing cors to allow fetching data from backend
app.use(cors())

//use json format to read data
app.use(express.json());

//Routers
app.use(require('./routes/taskRoute'));

// starting server
app.listen(port,() => {
    console.log(`Server is started at ${port}`);
});

