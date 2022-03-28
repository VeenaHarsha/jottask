import React, { useState, useEffect } from "react";
import UpdateTask from "./UpdateTask";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  async function getTasks() {
    const result = await fetch("http://localhost:5050/tasks");
    const data = await result.json();
    setTasks(data);
  }
  async function deleteTask(id) {
    await fetch(`http://localhost:5050/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((item) => item.id !== id));
  }
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="d-flex p-1 flex-fill  justify-content-sm-around">
      <ul className="list-group" style={{ width: "50rem" }}>
        {tasks.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex p-3 justify-content-between"
          >
            <div className="align-items-start text-break text-wrap">
              {item.description}
            </div>
            <div className="d-flex justify-content-sm-evenly">
              <UpdateTask task={item} />
              <button
                className="btn m-1 btn-secondary"
                onClick={() => deleteTask(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
