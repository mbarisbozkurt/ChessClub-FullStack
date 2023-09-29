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
  const order = await Order.findById(req.params.id);

  if(order){
    //update the new variables states in the model 
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = { 
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address, 
    }

    //Check if the teacherName is "NM Ismail Tarık Baltacı" 
    if(order.teacherName === "NM Ismail Tarık Baltacı") {
      const priceActionMap = {
          200: 'remainingPeopleForPawn',
          400: 'remainingPeopleForBishop',
          600: 'remainingPeopleForQueen' 
      };
  
      const actionField = priceActionMap[order.price];
      
      if(actionField) {
          const teacher = await Teacher.findOne({name: "NM Ismail Tarık Baltacı"});
          if(teacher && teacher[actionField] > 0) {
              teacher[actionField] -= 1; //Decrease the count by 1
              await teacher.save();
          }
      }
    }

    //Check if the teacherName is "Şamil Aliyev" 
    if(order.teacherName === "Şamil Aliyev") {
      const priceActionMap = {
          200: 'remainingPeopleForPawn',
          400: 'remainingPeopleForBishop',
          600: 'remainingPeopleForQueen' 
      };
  
      const actionField = priceActionMap[order.price];
      
      if(actionField) {
          const teacher = await Teacher.findOne({name: "Şamil Aliyev"});
          if(teacher && teacher[actionField] > 0) {
              teacher[actionField] -= 1; //Decrease the count by 1
              await teacher.save();
          }
      }
    }

    //Check if the teacherName is "Mehmet Barış Bozkurt" 
    if(order.teacherName === "Mehmet Barış Bozkurt") {
      const priceActionMap = {
          200: 'remainingPeopleForPawn',
          400: 'remainingPeopleForBishop',
          600: 'remainingPeopleForQueen' 
      };
  
      const actionField = priceActionMap[order.price];
      
      if(actionField) {
          const teacher = await Teacher.findOne({name: "Mehmet Barış Bozkurt"});
          if(teacher && teacher[actionField] > 0) {
              teacher[actionField] -= 1; //Decrease the count by 1
              await teacher.save();
          }
      }
    }

    //Check if the teacherName is "Deniz Özgen" 
    if(order.teacherName === "Deniz Özgen") {
      const priceActionMap = {
          200: 'remainingPeopleForPawn',
          400: 'remainingPeopleForBishop',
          600: 'remainingPeopleForQueen' 
      };
  
      const actionField = priceActionMap[order.price];
      
      if(actionField) {
          const teacher = await Teacher.findOne({name: "Deniz Özgen"});
          if(teacher && teacher[actionField] > 0) {
              teacher[actionField] -= 1; //Decrease the count by 1
              await teacher.save();
          }
      }
    }
  
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  }else{
    res.status(404);
    throw new Error ("Ders bulunamadı!");
  }
})

//@desc: Update order to delivered
//@route: PUT /api/orders/:id/deliver
//@access: Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  
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
  const orderDetails = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      }
    });

    const message = {
      from: process.env.GMAIL_USER,
      to: `${orderDetails.user.email}`,
      subject: "Akademi Satranç Kulübüne Hoşgeldin!",
      html: `
      <h2>Selam, ${orderDetails.user.name}.</h2>
      <p>Aramıza hoşgeldin!</p>
      <h3>Ders Bilgilerin:</h3>
      <p><strong>Eğitmen:</strong> ${orderDetails.teacherName}</p>
      <p><strong>Ders Türü:</strong> ${orderDetails.lessonType}</p>
      <p><strong>Fatura Adresi:</strong> ${orderDetails.shippingAddress.address}, ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.postalCode}</p>
       `
    };

    try {
      const info = await transporter.sendMail(message);
      console.log("Mail sent", info);
    } catch (error) {
      console.log(error, "error");
    }
    
    res.status(201).json({msg: "Eposta başarılı bir şekilde gönderildi"});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

export{createOrder, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders, sendEmail};