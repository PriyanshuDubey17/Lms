import { useState } from "react";
import computerImg from "../../assets/computer.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {  toast } from 'react-toastify';
const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [textArea, setTextArea] = useState("");
  const [profile, setProfile] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
 const [isLoading, setIsLoading]= useState(false)
const Navigate= useNavigate()
  const submitHandler = (e) => {
    setIsLoading(true)
    e.preventDefault();
    // console.log(fullName, phone, email, password, confirmPassword, textArea);
     const newUser= new FormData();
     newUser.append("fullName",fullName);
     newUser.append("email",email);
     newUser.append("phone",phone);
     newUser.append("password",password);
     newUser.append("aboutMe",textArea);
     newUser.append("photo",profile);

     axios.post("https://lms-p2i9.onrender.com/api/v1/user/sign-up", newUser)
     
     .then((result)=>{
      setIsLoading(false)
      toast(result.data.message)
     Navigate("/login")
     console.log(result)
     })
     .catch((error)=>{
      setIsLoading(false)
      console.log(error)
      toast(error.response.data.message)
     })
  
  };

  const fileHandler = (e) => {
    setProfile(e.target.files[0]);
    setProfileUrl(URL.createObjectURL(e.target.files[0]));
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
                  setFullName(e.target.value);
                }}
                type="text"
                placeholder="Enter Your Full Name"
                required
              />
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
              <div>
                <input type="file" onChange={fileHandler} />
                {profileUrl ? (
                  <img
                    src={profileUrl}
                    alt="profile"
                    style={{ height: "50px" }}
                  />
                ) : (
                  <img
                    src={computerImg}
                    alt="profile"
                    style={{ height: "50px" }}
                  />
                )}
              </div>
              <textarea
                onChange={(e) => {
                  setTextArea(e.target.value);
                }}
                placeholder="about me"
                required
              ></textarea>
              <button type="submit">  {isLoading&&<i class="fas fa-spinner fa-pulse"></i>} sign up</button>
              <span>
                i have already account <Link to="/login">login</Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
