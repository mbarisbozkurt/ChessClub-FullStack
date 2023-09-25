import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

import users from "./data/users.js";
import teachers from "./data/teachers.js";

import User from "./models/userModel.js";
import Teacher from "./models/teacherModel.js";
import Order from "./models/orderModel.js";

import connectDB from "./config/db.js";
dotenv.config();

connectDB();

const importData = async() => {
  try {
    //first delete all
    await User.deleteMany();
    await Teacher.deleteMany();
    await Order.deleteMany();

    //insert users
    await User.insertMany(users); 

    //insert the teachers
    await Teacher.insertMany(teachers);

    console.log("Data imported!".green.inverse);
    process.exit();

  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
} 

const destroyData = async() => {
  try {
    await User.deleteMany();
    await Teacher.deleteMany();
    await Order.deleteMany();
    
    console.log("Data deleted!".red.inverse);
    process.exit();

  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
}

if(process.argv[2] === "-d"){ //look at the package.json: "data:destroy": "node backend/seeder.js -d"
  destroyData();
}else{ //"node backend/seeder.js",
  importData();
}