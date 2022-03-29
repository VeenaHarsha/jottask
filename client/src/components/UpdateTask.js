import React, { useState } from "react";
import { BASE_URL } from "../../constants/EnvVars";

function UpdateTask({ task }) {
  const [description, setDescription] = useState(task.description);

  const handleChange = (event) => setDescription(event.target.value);

  async function updateTask(id) {
    try {
      const body = { description };
      const list = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await list.json();
      console.log(data);
      window.location = "/";
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <button
        className="btn m-1 btn-secondary"
        type="button"
        data-bs-toggle="modal"
        data-bs-target={`#id${task.id}`}
      >
        UpdateTask
      </button>
      <div className="modal" id={`id${task.id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Task</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <textarea
                className="form-control"
                placeholder="update..."
                value={description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => updateTask(task.id)}
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateTask;
