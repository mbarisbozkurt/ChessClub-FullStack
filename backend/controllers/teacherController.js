import asyncHandler from "../middleware/asyncHandler.js";
import Teacher from "../models/teacherModel.js";

//@desc: fetch all teachers
//@route: GET /api/teachers
//@access: public  
const getTeachers = asyncHandler(async (req, res) => {
  const teachers = await Teacher.find({});
  res.send(teachers);
});

//@desc: fetch a teacher
//@route: GET /api/teacher/:id 
//@access: public  
const getTeacherById = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);

  if(teacher){
    return res.json(teacher);
  }else{
   res.status(404);
   throw new Error ("Resource not found");
  }
});

export {getTeachers, getTeacherById};