import React from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="container-sm px-4 py-5 my-5 text-center">
      <h1>Task Jotter</h1>
      <AddTask />
      <TaskList />
    </div>
  );
}

export default App;
