import React, { useState, useEffect } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  async function getTasks() {
    const result = await fetch("http://localhost:5050/tasks");
    const data = await result.json();
    setTasks(data);
  }
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div>
      {tasks.map((item) => (
        <>
          <p>{item.description}</p>
          <span>Edit</span>
          <span>Delete</span>
        </>
      ))}
    </div>
  );
}

export default TaskList;
