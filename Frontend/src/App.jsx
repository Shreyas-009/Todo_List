import React, { useState } from "react";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";

const dummyTasks = [
  {
    _id: "1",
    title: "Complete Project Proposal",
    discreption:
      "Write and submit the project proposal for the new client website. Include timeline, budget, and technical specifications.",
    date: new Date("2024-03-20T10:30:00"),
  },
  {
    _id: "2",
    title: "Team Meeting",
    discreption:
      "Weekly team sync to discuss project progress, blockers, and upcoming deliverables. Prepare status report for stakeholders.",
    date: new Date("2024-03-21T14:00:00"),
  },
  {
    _id: "3",
    title: "Code Review",
    discreption:
      "Review pull requests for the authentication feature. Check for security vulnerabilities and code quality standards.",
    date: new Date("2024-03-22T11:00:00"),
  },
];

function App() {
  const [tasks, setTasks] = useState(dummyTasks);

  const handleAdd = (newTask) => {
    const taskWithId = {
      ...newTask,
      _id: (tasks.length + 1).toString(),
      date: new Date(newTask.date)
    };
    setTasks([taskWithId, ...tasks]);
  };

  const handleDelete = (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  const handleUpdate = (taskId, updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task._id === taskId ? { ...task, ...updatedTask } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-zinc-900 py-8 px-4">
      <TaskForm onAdd={handleAdd} />
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
