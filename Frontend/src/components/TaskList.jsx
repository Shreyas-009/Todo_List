import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import { API_BASE_URL } from "../config/api";
import toast from "react-hot-toast";

function TaskList({ token }) {

  const [task, setTask] = useState([]);

  // fetching the task list
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTask(data);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    }
  };

  //delete task
  const handedDeleteTask = async (taskId) => {
    console.log("Deleting task with ID:", taskId);
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setTask(task.filter((task) => task._id !== taskId));
        toast.success("Task deleted successfully");
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to delete task");
      }
    } catch (error) {
      toast.error("Error deleting task");
    }
  };

  //update task
  const handedUpdateTask = async (taskId, updatedTask) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update task");
      }

      const data = await response.json();
      setTask((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? data : task))
      );
      toast.success("Task updated successfully");
    } catch (error) {
      toast.error(error.message || "Error updating task");
      console.error("Update error:", error);
    }
  };

  return (
    <>
      <TaskForm token={token}
      task={task} setTask={setTask}
      />
      <ul className="flex flex-col gap-7 w-full py-6 md:py-6 px-3 md:px-6 rounded-xl mx-auto">
        {task.map((task) => {
          return (
            <>
              <TaskCard
                task={task}
                key={task.id}
                onDelete={handedDeleteTask}
                onUpdate={handedUpdateTask}
              />
            </>
          );
        })}
      </ul>
    </>
  );
}

export default TaskList;
