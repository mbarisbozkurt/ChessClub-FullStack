import { createSlice } from "@reduxjs/toolkit";

//like cartSlice in the e-commerce
const initialState = localStorage.getItem("orderInfo") ? JSON.parse(localStorage.getItem("orderInfo")) 
: {shippingAddress: {}, paymentMethod: ""}; 

const orderInfoSlice = createSlice({
  name: "orderInfoSlice", 
  initialState,
  reducers:{
  },
});

//export const {addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems} = orderInfoSlice.actions;

export default orderInfoSlice.reducer;