const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = process.env.port || 8000;
const mongoose = require("./config/mongoos");

app.use(cors({
  origin :"*",
  methods :["GET","POST","PUT","DELETE"],
  allowedHeaders :["Content-Type","Authorization"],
  credentials :true,
}));

//use json format to read data
app.use(express.json());

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/tasks", require("./routes/taskRoute"));

// starting server
app.listen(port, () => {
  console.log(`Server is started at ${port}`);
});
