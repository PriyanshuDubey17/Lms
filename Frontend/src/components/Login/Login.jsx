import React from "react";
import { useState } from "react";
import computerImg from "../../assets/computer.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const Navigate = useNavigate();
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const submitHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    //console.log(fullName, phone, email, password, confirmPassword);
    const loginData = {
      email: email,
      phone: phone,
      password: password,
    };

    axios
      .post("https://lms-p2i9.onrender.com/api/v1/user/login", loginData)
      .then((result) => {
        setIsLoading(false);
        toast(result.message);
        console.log(result);
        const { fullName, token, profileImgUrl } = result.data.userData;
        console.log(fullName, token, profileImgUrl);
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("token", token);
        localStorage.setItem("profileImgUrl", profileImgUrl);
        Navigate("/dashboard/home");
      })
      .catch((error) => {
        setIsLoading(false);
        toast(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <>
      <div className="wrapper">
        <div className="main-div">
          <div className="left-div">
            <img src={computerImg} alt="computer" />
            <h2>Pri Coding</h2>
            <p>Start Your Coding Now...</p>
          </div>

          <div className="right-div">
            <form action="" onSubmit={submitHandler}>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="Enter Your Email"
                required
              />
              <input
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                type="number"
                placeholder="Enter Your Number"
                required
              />

              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="Enter Your Password"
                required
              />
              <input
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                type="password"
                placeholder="Enter Your Confirm Password"
                required
              />
              {password.length > 0 &&
                confirmPassword.length > 0 &&
                password != confirmPassword && <p>both password is not same</p>}

              <button type="submit">
                {" "}
                {isLoading && <i class="fas fa-spinner fa-pulse"></i>}sign in
              </button>
              <span>
                crete new account <Link to="/signup"> sign up</Link>{" "}
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
