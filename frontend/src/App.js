import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import {Outlet} from "react-router-dom" /*to be able to use router*/

import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="app-wrapper"> {/*Look at index.css*/}
      <Header/>
        <main className="content-wrapper">
          <Outlet/>
        </main>
      <Footer/>
      <ToastContainer/> {/*To be able to use toastify. Doesnt matter where it is rendered*/}
    </div>
  )
}

export default App
