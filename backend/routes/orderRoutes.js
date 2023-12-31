import express from "express";
import {createOrder, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders, sendEmail } from "../controllers/orderController.js";
import {protect, admin} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, admin, getOrders); //api/orders
router.route("/mine").get(protect, getMyOrders); // /api/orders/mine
router.route("/sendEmail").post(protect, sendEmail); // /api/orders/sendEmail
router.route("/:id").get(protect, getOrderById); // /api/orders/:id
router.route("/:id/pay").put(protect, updateOrderToPaid); // /api/orders/:id/pay

export default router;