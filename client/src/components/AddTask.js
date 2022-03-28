import React, { useState } from "react";

function AddTask() {
  const [description, setDescription] = useState("");

  const handleChange = (event) => setDescription(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("DES:", description);
    try {
      const body = { description };
      const response = await fetch("http://localhost:5050/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log("Whar ", response);
      window.location("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container-sm px-4  text-center">
        <textarea
          className="input-box"
          placeholder="Add Task..."
          value={description}
          onChange={handleChange}
        ></textarea>
        <button type="submit" className="btn-secondary">
          Add
        </button>
      </div>
    </form>
  );
}

export default AddTask;
