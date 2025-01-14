import React, { useState } from "react";
import { API_BASE_URL } from "../config/api";
import toast from "react-hot-toast";

const TaskForm = ({ task , setTask , token }) => {
  const [title, setTitle] = useState("");
  const [discreption, setDiscreption] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDiscreption("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          discreption,
          date: new Date().toDateString(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        resetForm();
        setTask([...task, data]);
        toast.success("Task created successfully");
      } else {
        throw new Error(data.message || "Failed to create task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error(error.message || "Error creating task");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full py-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl mx-auto p-6 bg-zinc-800 rounded-xl shadow-lg border border-zinc-700"
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding Task..." : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
