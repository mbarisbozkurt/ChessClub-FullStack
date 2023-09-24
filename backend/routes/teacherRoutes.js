import express from "express";
const router = express.Router();
//import teachers from "../data/teachers.js"; //no need to get data from json file. import Teacher model and get data from the database
import {getTeachers, getTeacherById} from "../controllers/teacherController.js"

router.route("/").get(getTeachers);
router.route("/:id").get(getTeacherById);

export default router;