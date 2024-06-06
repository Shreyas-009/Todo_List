const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const taskController = require('../controllers/TaskController');

router.get('/', (req, res) => {
  res.send('This is Home page');
});

//creastig task
router.post('/task',taskController.createTask);

//get tasks
router.get('/task',taskController.getallTask);

//update task
router.put('/task/:id',taskController.updateTask);

//delete task
router.delete('/task/:id',taskController.deleteTask);


module.exports = router;