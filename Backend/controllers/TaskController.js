const Task = require("../models/Task");

// Get all tasks function
async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find({ user: req.user.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Create task function
async function createTask(req, res) {
  const task = new Task({
    ...req.body,
    user: req.user.userId,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Update task function
async function updateTask(req, res) {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId,
      },
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Delete task function
async function deleteTask(req, res) {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Export named functions
module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
