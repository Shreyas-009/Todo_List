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
      <form action="" onSubmit={handleSubmit}>
        <fieldset className="flex flex-col gap-4 md:w-4/5 lg:w-2/5  py-6 bg-zinc-700 text-white px-6 rounded-lg">
          <input
            className="bg-zinc-500 text-white rounded-lg py-3 px-7 placeholder:text-zinc-800 outline-none"
            type="text"
            name="title"
            placeholder="Title..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <input
            className="bg-zinc-500 text-white rounded-lg py-3 px-7 placeholder:text-zinc-800 outline-none"
            type="text"
            name="discreption"
            placeholder="Discreption..."
            value={discreption}
            onChange={(event) => setDiscreption(event.target.value)}
            required
          />
          <input
            className="hidden"
            type="text"
            name="date"
            value={new Date().toDateString()}
            onChange={(event) => setDiscreption(event.target.value)}
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-3 px-6 rounded-xl w-fit outline-none"
          >
            Add Task
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default TaskForm;
