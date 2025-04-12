import React, { Component, useState } from "react";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home";
import AllCourse from "./components/AllCourse/AllCourse";
import AddNewCourse from "./components/AddNewCourse/AddNewCourse";
import CourseDetails from "./components/courseDetails/CourseDetails";
import ManageCourse from "./components/ManageCourse/ManageCourse";
import StudentList from "./components/StudentList/StudentList";
import Profile from "./components/Profile/Profile";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./PrivateRoute"
const App = () => {
  const myRouter = createBrowserRouter([
    { path: "*", Component: NotFound },
    { path: "/", Component: Login },
    { path: "/login", Component: Login },
    { path: "/signup", Component: SignUp },
    {
      path: "/dashboard",
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
      
        { path: "home", element: <Home></Home> },
        { path: "all-courses", Component: AllCourse },
        { path: "add-new-course", Component: AddNewCourse },
        { path: "course-detail/:id", Component: CourseDetails},
        { path: "manage-course/:courseId", Component: ManageCourse},
        { path: "student-list/:courseId", Component: StudentList},
        { path: "student-profile/:profileId", Component: Profile}
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={myRouter}></RouterProvider>
      <ToastContainer />
    </>
  );
};

export default App;
