import React, { useState } from "react";
import TaskList from "./components/TaskList";

function App() {

  return (
    <div className="min-h-screen bg-zinc-900 py-8 px-4">
        <TaskList></TaskList>
    </div>
  );
}

export default App;
