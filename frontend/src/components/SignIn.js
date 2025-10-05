import "./css/signup.css";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userLoginThunk } from "../redux/slices/userLoginSlice";
import { Link } from "react-router-dom";
// import { useDispatch } from'react-redux';
// to get all movies using fun

// / const Signin = () => {}

function Signin() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const { currentUser, errorStatus, errorMessage, loginStatus } = useSelector(
    (state) => state.userLogin
  );

  function handleSignInSubmit(userObj) {
    userObj.status = true;
    let actionObj = userLoginThunk(userObj);
    dispatch(actionObj);
  }

  useEffect(() => {
    if (loginStatus === true) {
      //console.log(currentUser)
      if (currentUser.userType === "user") {
        navigate("/user-profile");
      }
      if (currentUser.userType === "author") {
        navigate("/author-profile");
      }
      if (currentUser.userType === "admin") {
        navigate("/admin-profile");
      }
    }
  }, [loginStatus, currentUser, navigate]);
  function signup() {
    navigate("/signup");
  }

  // const passwordInput = document.getElementById('password')
  // const passwordToggle = document.getElementById('password-toggle')
  // passwordToggle.addEventListener('change',function(){
  //     if(passwordToggle.checked){
  //         passwordInput.type = 'text'
  //     }else{
  //         passwordInput.type='password'
  //     }
  // })

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
    <div className="row justify-content-center mt-5">
      <div className="col-lg-4 col-md-6 col-sm-6">
        <div className="card neu mx-auto  ">
          <div className="card-title text-center border-bottom p-2">
            <h3>SignIn</h3>
          </div>
          <div className="card-body ">
            <form
              className="form p-3"
              onSubmit={handleSubmit(handleSignInSubmit)}
            >
              {errorStatus === true && (
                <p className="text-danger fs-3 text-center">{errorMessage}</p>
              )}
              <div className="d-flex justify-content-evenly ">
                <h5 style={{ color: "var(--dark-maroon)" }}>Login as </h5>
                <div className="form-check ">
                  <input
                    type="radio"
                    id="author"
                    className="form-check-input"
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
                    className="form-check-input "
                    {...register("userType", { required: true })}
                    value="user"
                  />
                  <label htmlFor="user" className="form-check-label ">
                    User
                  </label>
                </div>
                <div className="form-check ">
                  <input
                    type="radio"
                    id="admin"
                    className="form-check-input mb-3"
                    {...register("userType", { required: true })}
                    value="admin"
                  />
                  <label htmlFor="admin" className="form-check-label mb-3 ">
                    Admin
                  </label>
                </div>
              </div>
              {errors.userType?.type === "required" && (
                <p className="text-danger lead fs-5">Select a type of user</p>
              )}
              <label>Username</label>
              <input
                type="text"
                className="form-control mb-3"
                autoComplete="current-username"
                placeholder="Eg. John"
                {...register("username", {
                  required: true,
                  minLength: 5,
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
                <p className="text-danger lead fs-5">
                  Max length of username is 14
                </p>
              )}
              <div>
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mb-3"
                  id="password"
                  autoComplete="current-password"
                  placeholder="password"
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    maxLength: 12,
                  })}
                />
                {/* <div className=' d-inline-flex '> */}
                <div className="form-check d-flex  align-items-center justify-content-start ">
            
                  <input
                    type="checkbox"
                    className="w-auto  "
                    name="password-toggle"
                    id="password-toggle"
                  />
                  <label htmlFor="user" className="form-check-label  ">
                      Show Password
                  </label>
                </div>
                {/* </div> */}
                {errors.password?.type === "required" && (
                  <p className="text-danger lead fs-5">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-danger lead fs-5">
                    Min length of password shd be 8
                  </p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-danger lead fs-5">
                    Max length of password is 12
                  </p>
                )}
              </div>

              <div className="d-flex justify-content-between mt-3 ">
                <p>
                  New User?
                  <Link onClick={signup}>  SignUp</Link>
                </p>
                <Link to="mailto:adhichiru634@gmail.com?subject=Hello&body=Write your message here">
                  Help?
                </Link>
              </div>

              <div className="d-flex justify-content-end">
                <button class="button-48" type="submit">
                  <span class="text">Login</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
