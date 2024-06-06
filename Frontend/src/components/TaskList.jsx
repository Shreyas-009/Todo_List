import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [task, setTask] = useState([]);

  // fetching the task list
  useEffect(() => {
    fetch("http://localhost:8000/task")
      .then((res) => res.json())
      .then((data) => setTask(data))
      .catch((err) => console.log("Error while fetching tasks", err));
  }, [task]);

  // add task
  const handelAddTask = (newTask) => {
    setTask([...task, newTask]);
  };

  //delete task
  const handedDeleteTask = async (taskId) => {
    console.log("Deleting task with ID:", taskId);
    await fetch(`http://localhost:8000/task/${taskId}`, {
      method: "DELETE",
    });
    setTask(task.filter((task) => task.id !== taskId));
  };

  //update task
  const handedUpdateTask = async (taskId , updatedTask) => {
    const { title, discreption , date} = updatedTask;
    const newtask = { title, discreption , date };
    const response = await fetch(`http://localhost:8000/task/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newtask),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <TaskForm onAdd={handelAddTask} />
      <ul className="flex flex-col gap-7 w-full  py-6 md:py-12 px-3 md:px-6 rounded-xl mx-auto bg-zinc-800">
        {task.map((task) => {
          return (
            <>
              <TaskCard task={task} key={task.id} onDelete={handedDeleteTask} onUpdate={handedUpdateTask} />
            </>
          );
        })}
      </ul>
    </>
  );
};

export default TaskList;


