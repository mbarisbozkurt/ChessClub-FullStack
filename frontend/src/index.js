import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
//import "./assets/styles/bootstrap.custom.css";
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"

import HomeScreen from './screens/HomeScreen';
import Pawn from './screens/Pawn';
import Bishop from './screens/Bishop';
import Queen from './screens/Queen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>} >
      <Route index={true} path='/' element={<HomeScreen/>}/>
      <Route path='/piyon' element={<Pawn/>}/> 
      <Route path='/fil' element={<Bishop/>}/>
      <Route path='/vezir' element={<Queen/>}/>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
