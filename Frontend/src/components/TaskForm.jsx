import React, { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [discreption, setDiscreption] = useState("");
  const [date, setDate] = useState(new Date().toDateString());

  const handelSubmit = async (e) => {
    e.preventDefault();
    const newtask = { title, discreption ,date};

    const response = await fetch("http://localhost:8000/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newtask),
    });
    const data = await response.json();
    console.log(data);
    onAdd(data);
    setTitle("");
    setDiscreption("");
  };

  
  return (
    <div className="w-full py-10">
      <form action="" onSubmit={handelSubmit}>
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
