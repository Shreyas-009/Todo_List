import React, { useState } from "react";

const TaskCard = ({ task, onDelete, onUpdate }) => {
  const { id, title, discreption, date } = task;
  const [updatedTask, setUpdatedTask] = useState({
    title: title,
    discreption: discreption,
    date: new Date()
  });
  const [editing, setEditing] = React.useState(false);

  //handel delete task
  const handelDeleteTask = (taskid) => {
    onDelete(taskid);
  };

  // Format the date to show only the year, month, and date
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // Format the date to show time only
  const formattedTime = new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  //handel editing
  const handelChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({
      ...updatedTask,
      [name]: value,
    });
    console.log(e);
  };

// handeling submit
  const handelSubmit = (e) => {
    onUpdate(task._id , updatedTask)
    setEditing(!editing);
  };

// handeling cancle edit
  const handelCancel = () => {
    setEditing(!editing);
    setUpdatedTask({
      title: title,
      discreption: discreption,
    });
  };

  return (
    <>
      {editing ? (
        <>
          <form
            onSubmit={handelSubmit}
            className="card flex flex-col gap-3 md:gap-7 py-3 px-3 md:px-6 md:w-full lg:w-3/5  xl:w-2/5 bg-zinc-700 text-white rounded-lg "
          >
            <input
              className="text-xl md:text-3xl font-semibold bg-zinc-500 text-white outline-none rounded-lg px-5 py-3"
              name="title"
              value={updatedTask.title}
              onChange={handelChange}
            />
            <input
              className="text-xl md:text-3xl font-semibold bg-zinc-500 text-white outline-none rounded-lg px-5 py-3"
              name="discreption"
              value={updatedTask.discreption}
              onChange={handelChange}
            />
            <div className="flex gap-2 w-full">
              <button
                type="submit"
                className="py-3 px-6  w-fit bg-green-600 rounded-xl  "
              >
                Save Task
              </button>
              <button
                onClick={handelCancel}
                className=" py-3 px-6  w-fit bg-zinc-600 rounded-xl "
              >
                Cancle
              </button>
              <p className="py-3 ml-auto text-zinc-400 flex gap-3 text-sm">
                <span className="text-zinc-300 ">
                  <span className="font-semibold">Date</span> : {formattedDate}
                </span>
                <span className="text-zinc-300 ">
                  <span className="font-semibold">Time</span> : {formattedTime}
                </span>
              </p>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="card flex flex-col gap-3 md:gap-7 py-3 px-3 md:px-6 md:w-full lg:w-3/5  xl:w-2/5 bg-zinc-700 text-white rounded-lg ">
            <h1 className="text-2xl md:text-3xl font-semibold">{title}</h1>
            <p className="text-sm md:text-xl px-2 md:px-5">{discreption}</p>
            <div className="flex gap-2 w-full">
              <button
                onClick={() => setEditing(!editing)}
                className="py-3 px-6  w-fit bg-blue-600 rounded-xl  "
              >
                Edit Task
              </button>
              <button
                onClick={() => handelDeleteTask(task._id)}
                className=" py-3 px-6  w-fit bg-red-600 rounded-xl "
              >
                Delete
              </button>
              <p className="py-3 ml-auto text-zinc-400 flex gap-3 text-sm">
                <span className="text-zinc-300 ">
                  <span className="font-semibold">Date</span> : {formattedDate}
                </span>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TaskCard;

