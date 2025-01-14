import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";

const TaskList = () => {
  
  
// const dummyTasks = [
//   {
//     _id: "1",
//     title: "Complete Project Proposal",
//     discreption:
//       "Write and submit the project proposal for the new client website. Include timeline, budget, and technical specifications.",
//     date: new Date("2024-03-20T10:30:00"),
//   },
//   {
//     _id: "2",
//     title: "Team Meeting",
//     discreption:
//       "Weekly team sync to discuss project progress, blockers, and upcoming deliverables. Prepare status report for stakeholders.",
//     date: new Date("2024-03-21T14:00:00"),
//   },
//   {
//     _id: "3",
//     title: "Code Review",
//     discreption:
//       "Review pull requests for the authentication feature. Check for security vulnerabilities and code quality standards.",
//     date: new Date("2024-03-22T11:00:00"),
//   },
// ];


  const [task, setTask] = useState([]);

  // fetching the task list
  useEffect(() => {
    fetch("https://todo-list-59kv.vercel.app/task")
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
    await fetch(`https://todo-list-59kv.vercel.app/task/${taskId}`, {
      method: "DELETE",
    });
    setTask(task.filter((task) => task.id !== taskId));
  };

  //update task
  const handedUpdateTask = async (taskId , updatedTask) => {
    const { title, discreption , date} = updatedTask;
    const newtask = { title, discreption , date };
    const response = await fetch(
      `https://todo-list-59kv.vercel.app/task/${taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newtask),
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <TaskForm onAdd={handelAddTask} />
      <ul className="flex flex-col gap-7 w-full  py-6 md:py-12 px-3 md:px-6 rounded-xl mx-auto">
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


