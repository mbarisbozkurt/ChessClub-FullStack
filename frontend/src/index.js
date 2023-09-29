import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
//import "./assets/styles/bootstrap.custom.css";
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./store"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import {PayPalScriptProvider} from "@paypal/react-paypal-js"

import HomeScreen from './screens/HomeScreen';
import PawnScreen from './screens/PawnScreen';
import BishopScreen from './screens/BishopScreen';
import QueenScreen from './screens/QueenScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './components/PrivateRoute';
import LessonInfoScreen from './screens/LessonInfoScreen';
import PaymentScreen from './screens/PaymentScreen';
import ProfileScreen from './screens/ProfileScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>} >
      <Route index={true} path='/' element={<HomeScreen/>}/>
      <Route path='/piyon' element={<PawnScreen/>}/> 
      <Route path='/fil' element={<BishopScreen/>}/>
      <Route path='/vezir' element={<QueenScreen/>}/>
      <Route path='/login' element={<LoginScreen/>}/> 
      <Route path='/register' element={<RegisterScreen/>}/>

      <Route path='' element={<PrivateRoute/>}>
        <Route path='/shipping' element={<ShippingScreen/>}/>
        <Route path='/info' element={<LessonInfoScreen/>}/>
        <Route path='/payment/:id' element={<PaymentScreen/>}/>
        <Route path='/profile' element={<ProfileScreen/>}/>
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={false}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
