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

import HomeScreen from './screens/HomeScreen';
import PawnScreen from './screens/PawnScreen';
import BishopScreen from './screens/BishopScreen';
import QueenScreen from './screens/QueenScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>} >
      <Route index={true} path='/' element={<HomeScreen/>}/>
      <Route path='/piyon' element={<PawnScreen/>}/> 
      <Route path='/fil' element={<BishopScreen/>}/>
      <Route path='/vezir' element={<QueenScreen/>}/>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
