import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  //refer to the user collectio i.e: who requested this lesson
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  lessonType: {
    type: String, 
    required: true
  },

  teacherName: {
    type: String, 
    required: true
  },

  shippingAddress: {
    address: {type: String, required: true},
    city: {type: String, required: true},
    postalCode: {type: String, required: true},
  },

  paymentMethod: {type: String, required: true},

  paymentResult: {
    id: {type: String},
    status: {type: String},
    update_time: {type: String},
    email_address: {type: String},
  },

  price: {type: Number, required: true, default: 0.0},
  isPaid: {type: Boolean, required: true, default: false},
  paidAt: {type: Date},
},
{timestamps: true,}
);

//Create Order table
const Order = mongoose.model("Order", orderSchema);

export default Order;