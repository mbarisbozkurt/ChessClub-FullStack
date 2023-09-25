import express from "express";
import {authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, getUserByID, deleteUser, updateUser} from "../controllers/userController.js";
//import {protect, admin} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(getUsers); // /api/users
router.post("/logout", logoutUser); // /api/users/logout
router.post("/auth", authUser); // /api/users/auth
router.route("/profile").get(getUserProfile).put(updateUserProfile); //first protect(), then getUserProfile() or updateUserProfile() by next() in the protect function
router.route("/:id").get(getUserByID).delete(deleteUser).put(updateUser); // /api/users/:id

/*Ultimately CORRECT ONE*/ 
// router.route("/").post(registerUser).get(protect, admin, getUsers); // /api/users
// router.post("/logout", logoutUser); // /api/users/logout
// router.post("/auth", authUser); // /api/users/auth
// router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile); //first protect(), then getUserProfile() or updateUserProfile() by next() in the protect function
// router.route("/:id").get(protect, admin, getUserByID).delete(protect, admin, deleteUser).put(protect, admin, updateUser); // /api/users/:id

export default router;