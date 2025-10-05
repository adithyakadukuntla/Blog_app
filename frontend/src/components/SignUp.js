import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import "./css/signup.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";
function SignUp() {
  let [details, setDetails] = useState([]);
  let {register,handleSubmit,formState: { errors }} = useForm(); 
 
  let [err,setErr]=useState('');
  const navigate=useNavigate();
 async function handleFormSubmit(userObj) {
  userObj.status=true;
    setDetails([...details, userObj]);
    let res;

    if(userObj.userType==='user'){
     res=await axios.post('/user-api/register',userObj);
    
    }
    if(userObj.userType==='author'){
      res=await axios.post('/author-api/register',userObj)
      
    }
    if(res.data.message==='User Created' || res.data.message==='Author Created'){

      navigate('/signin')
     
    }else if(res.data.message==='Username already exists use another' || res.data.message==='Authorname already exists use another'){

      alert('Username(or)Authorname already taken. Please choose a different one.');
      
    }
    else{
      setErr(res.data.message);
     
    }
  
}
function signin(){
  navigate('/signin')
}

useEffect(() => {
    const passwordInput = document.getElementById("password");
    const passwordToggle = document.getElementById("password-toggle");

    if (passwordToggle) {
      passwordToggle.addEventListener("change", function () {
        if (passwordToggle.checked) {
          passwordInput.type = "text";
        } else {
          passwordInput.type = "password";
        }
      });

      // Cleanup the event listener on component unmount
      return () => {
        passwordToggle.removeEventListener("change", () => {});
      };
    }
  }, []);


  return (
    <div className="row  justify-content-center mt-5">
    <div className="col-lg-4 col-md-6 col-sm-6 ">
    <div className="card neu mx-auto"   >
      <div className="card-title text-center border-bottom p-2">
        <h3>SignUp</h3>
        
      </div>
      <div className="card-body">
    {/* user registration error message */}
    {err && <p className="text-danger fs-3">{err}</p>}

      <form
        className="form p-3"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
       <div className="d-flex justify-content-evenly ">
        <h5 style={{color:'var(--dark-maroon)'}} >Register as   </h5>
       <div className="form-check ">

          <input
            type="radio"
            id="author"
            className="form-check-input "
            {...register("userType", { required: true })}
            value="author"
          />
          <label htmlFor="author" className="form-check-label  ">
            Author
          </label>
        </div>
        <div className="form-check ">
          <input
            type="radio"
            id="user"
            className="form-check-input mb-3"
            {...register("userType", { required: true })}
            value="user"
          />
          <label htmlFor="user" className="form-check-label mb-3">
            User
          </label>
        </div>
        </div>
        {errors.userType?.type === "required" && (
          <p className="text-danger lead fs-5">Select a type of user</p>
        )}
        <label >Username</label>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="username"
          autoComplete="current-username"
          {...register("username", {
            required: true,
            minLength: 4,
            maxLength: 14,
          })}
        />
        {errors.username?.type === "required" && (
          <p className="text-danger lead fs-5">Username is required</p>
        )}
        {errors.username?.type === "minLength" && (
          <p className="text-danger lead fs-5">
            Min length of username shd be 4
          </p>
        )}
        {errors.username?.type === "maxLength" && (
          <p className="text-danger lead fs-5">Max length of username is 14</p>
        )}
<label >Password</label>
        <input
          type="password"
          className="form-control  mb-3"
          id="password"
          placeholder="password"
          autoComplete="current-password"
          
          {...register("password", {
            required: true,
            minLength: 8,
            maxLength: 12,
          })}
        />
        <div className="form-check d-flex  align-items-center">
            
                  <input
                    type="checkbox"
                    className="w-auto"
                    name="password-toggle"
                    id="password-toggle"
                  />
                  <label htmlFor="user" className="form-check-label  ">
                    Show Password
                  </label>
                </div>
         
          
        {errors.password?.type === "required" && (
          <p className="text-danger lead fs-5">Password is required</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="text-danger lead fs-5">
            Min length of username shd be 4
          </p>
        )}
        {errors.password?.type === "maxLength" && (
          <p className="text-danger lead fs-5">Max length of username is 6</p>
        )}
<label >Email</label>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="****@**.com"
          {...register("email", {
            required: true,
          })}
        />
        {errors.email?.type === "required" && (
          <p className="text-danger lead fs-5">email is required</p>
        )}
        <p>Already a User?
          <Link onClick={signin}>  SignIn</Link>
        </p>

        <div className="d-flex justify-content-end " >
        <button class="button-48" type='submit'><span class="text">Register</span></button>

        </div>
      </form>
    </div>
 </div>
 </div>
 </div>
  );
}

export default SignUp;
