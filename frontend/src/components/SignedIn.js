import React from 'react'

import { useLocation,Link } from 'react-router-dom'
function SignedIn() {
  const details = useLocation();
const { username } =details.state ||{}


  return (
    <div>

 <div>
  <ul className='navbar nav navbar-expand-sm nav-tabs justify-content-end' >
    <li className='nav-item fs-3 n' > Welcome, {username}!</li>
    <li className='nav-item n'> <Link className="nav-link" to='/' >
    SignOut</Link> </li>
  
  </ul>
 </div>
 <div className='mx-auto text-center bg-info p-2  '>

   <button className='btn n' id='n'  >Add Articles</button>
   <button className="btn n">Articles</button>
  
 </div>
 <div style={{minHeight:"80vh"}}>
  <p id="main"></p>
 </div>
    </div>
  )
}

export default SignedIn