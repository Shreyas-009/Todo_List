const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = process.env.port || 8000;
const mongoose = require("./config/mongoos");

const allowedOrigins = [
  "http://localhost:5173", 
  "https://todo-list-lyart-chi.vercel.app",
];

// Updated CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

//use json format to read data
app.use(express.json());

//Routers
app.use(require("./routes/taskRoute"));

// starting server
app.listen(port, () => {
  console.log(`Server is started at ${port}`);
});
