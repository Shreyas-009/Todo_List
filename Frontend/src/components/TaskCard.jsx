import React, { useState } from "react";

const TaskCard = ({ task, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    title: task.title,
    discreption: task.discreption,
    date: task.date,
  });

  // Format the date
  const formattedDate = new Date(task.date).toLocaleDateString();
  const formattedTime = new Date(task.date).toLocaleTimeString();

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://todo-list-59kv.vercel.app/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        onUpdate(task._id, updatedTask);
        setEditing(false);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handelDeleteTask = async (id) => {
    try {
      const response = await fetch(
        `https://todo-list-59kv.vercel.app/task/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        onDelete(id);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto transition-all duration-200 hover:shadow-lg">
      {editing ? (
        <form
          onSubmit={handelSubmit}
          className="card flex flex-col gap-4 p-6 bg-zinc-800 text-white rounded-xl shadow-md border border-zinc-700"
        >
          <input
            className="text-xl md:text-2xl font-semibold bg-zinc-700 text-white outline-none rounded-lg px-5 py-3 transition-colors duration-200 hover:bg-zinc-600 focus:bg-zinc-600"
            name="title"
            value={updatedTask.title}
            onChange={handelChange}
            placeholder="Task Title"
          />
          <textarea
            className="text-lg bg-zinc-700 text-white outline-none rounded-lg px-5 py-3 min-h-[100px] transition-colors duration-200 hover:bg-zinc-600 focus:bg-zinc-600"
            name="discreption"
            value={updatedTask.discreption}
            onChange={handelChange}
            placeholder="Task Description"
          />
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-2">
              <button
                type="submit"
                className="py-2 px-4 bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Save Task
              </button>
              <button
                onClick={handelCancel}
                className="py-2 px-4 bg-zinc-600 rounded-lg hover:bg-zinc-500 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
            <p className="text-zinc-400 flex flex-wrap gap-3 text-sm">
              <span className="text-zinc-300">
                <span className="font-semibold">Date:</span> {formattedDate}
              </span>
              <span className="text-zinc-300">
                <span className="font-semibold">Time:</span> {formattedTime}
              </span>
            </p>
          </div>
        </form>
      ) : (
        <div className="card flex flex-col gap-4 p-6 bg-zinc-800 text-white rounded-xl shadow-md border border-zinc-700">
          <h1 className="text-2xl md:text-3xl font-semibold">{task.title}</h1>
          <p className="text-base md:text-lg text-zinc-300 leading-relaxed">
            {task.discreption}
          </p>
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(!editing)}
                className="py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Edit Task
              </button>
              <button
                onClick={() => handelDeleteTask(task._id)}
                className="py-2 px-4 bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
            <p className="text-zinc-400 text-sm">
              <span className="text-zinc-300">
                <span className="font-semibold">Date:</span> {formattedDate}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
