import React from "react";
import company from "../../assets/computer.png";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
const Dashboard = () => {
  const location = useLocation();
  const Navigate = useNavigate()
  return (
    <>
      <div className="dashboard-wrapper">
        <div className="sideNav">
          <div className="img-div">
            <img src={localStorage.getItem("profileImgUrl")} alt="" />

            <h3>{localStorage.getItem("fullName")}</h3>
          </div>
          <div className="menu-div">
            <h3
              className={
                location.pathname === "/dashboard/home"
                  ? "menu-active-link"
                  : "menu-div-h3"
              }
            >
              <Link to="home">Home</Link>
            </h3>
            <h3
              className={
                location.pathname === "/dashboard/all-courses"
                  ? "menu-active-link"
                  : "menu-div-h3"
              }
            >
              <Link to="all-courses">All Course</Link>
            </h3>
            <h3
              className={
                location.pathname === "/dashboard/add-new-course"
                  ? "menu-active-link"
                  : "menu-div-h3"
              }
            >
              <Link to="add-new-course">Add New Course</Link>
            </h3>
            <h3 className="menu-div-h3" onClick={()=>{localStorage.clear();  Navigate("/login")}}><Link>Log Out</Link></h3>
          </div>
        </div> 
        <div className="dashboard-main-div">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
