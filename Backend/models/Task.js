const mongoose = require("mongoose");
const taskschema = new mongoose.Schema(
  {
    title: {
      type: "string",
      required: true,
    },
    discreption: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskschema);
module.exports = Task;
