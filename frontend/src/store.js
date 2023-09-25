import { configureStore} from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import orderInfoSliceReducer from "./slices/orderInfoSlice"

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    orderInfo: orderInfoSliceReducer,
  },  
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;