import React from 'react'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

function Admin() {
  return (
    <div>
    <div style={{backgroundColor:'var(--light-olive)'}}>
      <ul className="nav  justify-content-around fs-3 "   >
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to={`/admin-profile/authors`}
            style={{ color: "var(--light-color)" }}
          >
            Authors
          </NavLink>
        </li>
        <li className="nav-item">
            <NavLink className='nav-link'
            to='/admin-profile/users'
            style={{ color: "var(--light-color)" }}
          >
            Users
          </NavLink>
        </li>
      </ul>
      </div>
      <div style={{minHeight:"90vh"}} >
      <Outlet />
      </div>
      </div>
  )
}

export default Admin