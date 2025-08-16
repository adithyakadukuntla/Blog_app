import React from 'react'
import {Outlet} from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
function Layout() {
  return (
    <div style={{backgroundColor:'var(--light-grey)'}} > 
       <NavBar/>
        <div style={{minHeight:"80vh"}} >
      <Outlet />
      </div>
        <Footer/>
    </div>
  )
}

export default Layout