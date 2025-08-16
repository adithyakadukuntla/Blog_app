import React from "react";
import { useSelector } from "react-redux";
import { NavLink,Outlet } from "react-router-dom";
function AuthorProfile() {
let { currentUser }=useSelector((state)=>state.userLogin)
  return (
    <div>
    <div style={{backgroundColor:'var(--light-olive)'}}>
      <ul className="nav  justify-content-around fs-3 "   >
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to={`/author-profile/author-articles/${currentUser.username}`}
            style={{ color: "var(--light-color)" }}
          >
            Articles
          </NavLink>
        </li>
        <li className="nav-item">
            <NavLink className='nav-link'
            to='/author-profile/add-article'
            style={{ color: "var(--light-color)" }}
          >
            Add new
          </NavLink>
        </li>
      </ul>
      </div>
      <div style={{minHeight:"90vh"}} >
      <Outlet />
      </div>
      </div>
      
      
      
    
  );
}

export default AuthorProfile;
