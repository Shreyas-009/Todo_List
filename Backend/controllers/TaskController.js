const Task = require('../models/Task');

//Create Tasks
module.exports.createTask = async(req, res) => {
    try {
      const task = new Task(req.body);
      await task.save();

      res.status(201).json(task) 
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error in creating task"});
    }
  }

//Get All Tasks
module.exports.getallTask = async(req, res) => {
    try {
      const tasks = await Task.find();

      res.status(200).json(tasks) 
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error in fetching tasks"});
    }
  }

//Update Task
module.exports.updateTask = async(req,res) => {
    try {
        const taskID = req.params.id; 
        const task = await Task.findByIdAndUpdate(taskID,req.body);

        res.status(200).json(task)
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Error in updating task",
        })

    }
}

//Delete Task
module.exports.deleteTask = async(req,res) => {
    try {
        const TaskID = req.params.id;
        const task = await Task.findByIdAndDelete(TaskID);

        res.status(200).json(task)
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message : "Error in deleting task",
        })
    }
}