import React, { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [discreption, setDiscreption] = useState("");
  const [date, setDate] = useState(new Date().toDateString());

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://todo-list-59kv.vercel.app/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, discreption, date }),
      });

      if (response.ok) {
        onAdd({ title, discreption, date });
        setTitle("");
        setDiscreption("");
        setDate(new Date().toDateString());
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="w-full py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl mx-auto mb-8 p-6 bg-zinc-800 rounded-xl shadow-lg border border-zinc-700"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Create New Task</h2>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Task Title"
              className="w-full text-lg bg-zinc-700 text-white placeholder-zinc-400 rounded-lg px-5 py-3 outline-none transition-colors duration-200 hover:bg-zinc-600 focus:bg-zinc-600"
              required
            />
          </div>
          <div>
            <textarea
              name="discreption"
              value={discreption}
              onChange={(event) => setDiscreption(event.target.value)}
              placeholder="Task Description"
              className="w-full text-lg bg-zinc-700 text-white placeholder-zinc-400 rounded-lg px-5 py-3 min-h-[120px] outline-none transition-colors duration-200 hover:bg-zinc-600 focus:bg-zinc-600"
              required
            />
          </div>
          <input
            className="hidden"
            type="text"
            name="date"
            value={new Date().toDateString()}
            onChange={(event) => setDiscreption(event.target.value)}
          />
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
