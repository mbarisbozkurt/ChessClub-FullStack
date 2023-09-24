import express from "express";
import dotenv from "dotenv"; //To be able to read the .env file with the .config() method and load the environmental variables in it into the process.env object
dotenv.config();
import connectDB from "./config/db.js";
import teacherRoutes from "./routes/teacherRoutes.js"
import {notFound, errorHandler} from "./middleware/errorMiddleware.js"

const port = process.env.PORT || 5000; //get the port from .env
const app = express();
connectDB();

/****************************************************************/

app.get("/", (req, res) => {
  res.send("API is running...")
}) 

app.use("/api/teachers", teacherRoutes); //after /api/teachers, no matter what is coming after that, go to teacherRoutes
app.use(notFound);
app.use(errorHandler);

/****************************************************************/

app.listen(port, () => {
  console.log("Server is running on " + port);
})
