import express from "express";
import dotenv from "dotenv"; //To be able to read the .env file with the .config() method and load the environmental variables in it into the process.env object
dotenv.config();
import teachers from "./data/teachers.js";
const port = process.env.PORT || 5000; //get the port from .env

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...")
}) 

app.get("/api/teachers", (req, res) => {
  res.send(teachers);
})

app.get("/api/teachers/:id", (req, res) => {
  const teacher = teachers.find((t) => t._id === req.params.id); 
  res.json(teacher);
})

app.listen(port, () => {
  console.log("Server is running on " + port);
})
