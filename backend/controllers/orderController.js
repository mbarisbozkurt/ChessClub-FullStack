import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import Teacher from "../models/teacherModel.js";
import nodemailer from "nodemailer";

//@desc: Create new order
//@route: POST /api/orders
//@access: Private
const createOrder = asyncHandler(async(req, res) => {
  const {teacherName, lessonType, shippingAddress, paymentMethod, price} = req.body; 
  try {
    const order = new Order({
      user: req.user._id, //req.user comes from the middleware, not from the frontend
      teacherName,
      lessonType,
      shippingAddress,
      paymentMethod,
      price,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


//@desc: Get my orders
//@route: GET /api/orders/mine
//@access: Private
const getMyOrders = asyncHandler(async(req, res) => {
  const orders = await Order.find({user: req.user._id}); 
  res.status(200).json(orders);
})

//@desc: Get order by id
//@route: GET /api/orders/:id
//@access: Private
const getOrderById = asyncHandler(async(req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email"); //get the name and email from the user collection
  if(order){
    res.status(200).json(order);
  }else{
    res.status(404);
    throw new Error("Order not found");
  }
})

//@desc: Update order to paid
//@route: PUT /api/orders/:id/pay
//@access: Private
const updateOrderToPaid = asyncHandler(async(req, res) => {
  res.send("update order to paid");
})

//@desc: Update order to delivered
//@route: PUT /api/orders/:id/deliver
//@access: Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to delivered");
});

//@desc: Get all orders
//@route: GET /api/orders
//@access: Private/Admin
const getOrders = asyncHandler(async(req, res) => {
  res.send("get all orders");
})

//@desc: Send order email
//@route: POST /api/orders/sendEmail
//@access: Private
const sendEmail = asyncHandler(async(req, res) => {
  res.send("send email");
  // const orderDetails = req.body;

  // const generateOrderItemsHTML = (items) => {
  //   return items.map(item => `
  //     <li>
  //       <strong>Product Name:</strong> ${item.name} <br>
  //       <strong>Quantity:</strong> ${item.qty} <br>
  //       <strong>Price:</strong> $${item.price} 
  //     </li>
  //     <br>
  //   `).join(''); 
  // }

  // try {
  //   const transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: process.env.GMAIL_USER,
  //       pass: process.env.GMAIL_PASS,
  //     }
  //   });

  //   const message = {
  //     from: process.env.GMAIL_USER,
  //     to: `${orderDetails.user.email}`,
  //     subject: "Your Order Info",
  //     html: `
  //     <h2>Hello, ${orderDetails.user.name}.</h2>
  //     <p>Thank you for your order.</p>
  //     <h3>Order Details:</h3>
  //     <ul>
  //       ${generateOrderItemsHTML(orderDetails.orderItems)}
  //     </ul>
  //     <p><strong>Total Price:</strong> $${orderDetails.totalPrice}</p>
  //     <p><strong>Payment Method:</strong> ${orderDetails.paymentMethod}</p>
  //     <p><strong>Shipping Address:</strong> ${orderDetails.shippingAddress.address}, ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.postalCode}, ${orderDetails.shippingAddress.country}</p>
  //      `
  //   };

  //   try {
  //     const info = await transporter.sendMail(message);
  //     console.log("Mail sent", info);
  //   } catch (error) {
  //     console.log(error, "error");
  //   }
    
  //   res.status(201).json({msg: "Email sent successfully"});
  // } catch (error) {
  //   res.status(500).json({error: error.message});
  // }

});

export{createOrder, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders, sendEmail};