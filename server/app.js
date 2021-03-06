const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const { Pool } = require("pg");
dotenv = require("dotenv").config({ path: path.join(__dirname, "../.env") });

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
  app_port: process.env.APP_PORT,
});

const port = process.env.APP_PORT || 5050;

app.use(cors());
app.use(express.json());

app.get("/tasks", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM TASKS ");
    res.json(data.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query("SELECT * FROM TASKS WHERE id = $1", [
      id,
    ]);
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const { description } = req.body;
    const { id } = req.params;
    await pool.query("UPDATE TASKS SET description = $1 WHERE id = $2 ", [
      description,
      id,
    ]);
    res.json("Task updated!!");
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { description } = req.body;
    const response = await pool.query(
      "INSERT INTO TASKS (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(response.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM TASKS WHERE id = $1 ", [id]);
    res.json("Task Deleted!!");
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
