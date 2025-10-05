import React from "react";
import '../App.css'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../redux/slices/userLoginSlice";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { SiGnuprivacyguard } from "react-icons/si";
function NavBar() {

const {currentUser,loginStatus}=useSelector((state)=>state.userLogin);
let dispatch=useDispatch();

function logout(){
  //remove token from browser storage
  sessionStorage.removeItem('token');
  let action=resetState()
  dispatch(action)
}


  return (
    <div className="navbar  navbar-expand-sm fs-5 justify-content-end ">
      <div className="container-fluid">
        {loginStatus===true?(<span className="fs-3 text-white p-1 ">{currentUser.userType}</span>):(<></>)}
      <button
          className="navbar-toggler justify-content-end  "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-expanded="false" aria-controls="navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav  nav-tabs   mb-lg-0 ms-auto">
       {
        loginStatus===false?(<>
       
       
        <li className="nav-item n">
          <Link className="nav-link" to="">
            Home
          </Link>
        </li>
        <li className="nav-item n">
          <Link className="nav-link" to="/signup">
            SignUp <SiGnuprivacyguard className="text-info "/>
          </Link>
        </li>
        <li className="nav-item n">
          <Link className="nav-link" to="/signin">
           SignIn
           <FaArrowRightToBracket className="text-info"/>
          </Link>
        </li>
        </>):(
          
          
        <li className="nav-item n">
          <Link className="nav-link" to="/signin" onClick={logout}>
            <span className="lead fs-3 text-warning me-4" >
              {currentUser.username}
            </span>
           SignOut
           <span><FaArrowRightFromBracket className="text-info "/></span>
          </Link>
        </li>
        
        )}
        
      </ul>
    </div>
    </div>
    </div>
  );
}

export default NavBar;
