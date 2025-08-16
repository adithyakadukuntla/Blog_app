import React from 'react'
import { Outlet } from 'react-router-dom'
function UserProfile() {
  return(
    <div>
      
       <div style={{minHeight:"80vh"}} >
      <Outlet />
      </div>
    </div>
  )
}

export default UserProfile