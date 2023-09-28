import { createSlice } from "@reduxjs/toolkit";

//like cartSlice in the e-commerce
//localStorage'da zaten varsa al, yoksa initialize et
const initialState = localStorage.getItem("orderInfo") ? JSON.parse(localStorage.getItem("orderInfo")) 
: {price: 0, teacherInfo: {}, shippingAddress: {}}; 

const orderInfoSlice = createSlice({
  name: "orderInfo", 
  initialState,
  reducers:{
    setLessonInfo: (state, action) => {
      //update here
      state.price = action.payload.price;
      state.teacherInfo = action.payload.teacherInfo;

      //update local storage
      localStorage.setItem("orderInfo", JSON.stringify(state));
    },

    saveShippingAddress: (state, action) => {
      //update here
      state.shippingAddress = action.payload;
      //update local storage
      localStorage.setItem("orderInfo", JSON.stringify(state));
    },

    clearOrderItems: (state, action) => {
      state.price = 0;
      state.teacherInfo = {};
      state.shippingAddress = {};

      localStorage.setItem("orderInfo", JSON.stringify(state));
    } 
  },
});

export const {setLessonInfo, saveShippingAddress, clearOrderItems} = orderInfoSlice.actions; //to be able to use these in the components
export default orderInfoSlice.reducer; //to be able to add to store (store.js)