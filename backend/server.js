import express from "express";
import dotenv from "dotenv"; //To be able to read the .env file with the .config() method and load the environmental variables in it into the process.env object
dotenv.config();
import connectDB from "./config/db.js";
import {notFound, errorHandler} from "./middleware/errorMiddleware.js"

import teacherRoutes from "./routes/teacherRoutes.js"
import userRoutes from "./routes/userRoutes.js"

const port = process.env.PORT || 5000; //get the port from .env
const app = express();
connectDB();

/****************************************************************/

//Body-parser middleware, to be able to get the data with "req.body" in the controllers
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("API is running...")
}) 

app.use("/api/teachers", teacherRoutes); //after /api/teachers, no matter what is coming after that, go to teacherRoutes
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

/****************************************************************/

app.listen(port, () => {
  console.log("Server is running on " + port);
})
