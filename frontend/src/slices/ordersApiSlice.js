import {ORDERS_URL, PAYPAL_URL} from "../constants"; // ORDERS_URL = /api/orders
import {apiSlice} from "./apiSlice"

//for interacting with backend: make requests to: http://localhost:5000/api/orders
export const ordersApiSlice = apiSlice.injectEndpoints({ //add endpoints to http://localhost:5000
  endpoints: (builder) => ({
    createOrder: builder.mutation({ 
      query: (order) => ({ 
        url: ORDERS_URL, //make a post request to: http://localhost:5000/api/orders
        method: "POST",
        body: {...order},
      }),
    }),
  }),
});

export const {useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery, 
  useGetMyOrdersQuery, useGetOrdersQuery, useDeliverOrderMutation, useSendEmailMutation} = ordersApiSlice; 


