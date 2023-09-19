import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import {Outlet} from "react-router-dom" /*to be able to use router*/

const App = () => {
  return (
    <>
      <Header/>
        <main> 
          <Outlet/>
        </main>
      <Footer/>
    </>
  )
}

export default App