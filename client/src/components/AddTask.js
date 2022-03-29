import React, { useState } from "react";
import { BASE_URL } from "../../constants/EnvVars";

function AddTask() {
  const [description, setDescription] = useState("");

  const handleChange = (event) => setDescription(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const body = { description };
      const response = await fetch(`${BASE_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex p-4 justify-content-center">
        <textarea
          className="form-control-lg"
          placeholder="Add Task..."
          value={description}
          onChange={handleChange}
        ></textarea>
        <button type="submit" className="btn btn-lg btn-secondary m-2">
          Add
        </button>
      </div>
    </form>
  );
}

export default AddTask;
