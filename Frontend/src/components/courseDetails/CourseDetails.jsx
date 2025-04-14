import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const CourseDetails = () => {
   const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams(); //isme hi ohh id aayega
  const Navigation = useNavigate();
  const location = useLocation(); //ek componentsse dure compone se data aata hai isme
  const {
    courseName,
    courseDescription,
    coursePrice,
    courseDiscount,
    courseThumbnailUrl,
  } = location.state;
  // const courseName = location.state.courseName;

  const deleteHandler = () => {
    setIsLoading(true)
    console.log("kkkkk")
    axios
      .delete("https://lms-p2i9.onrender.com/api/v1/course/delete-course/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setIsLoading(false)
        toast(result.data.message);

        Navigation("/dashboard/all-courses")
        console.log(result);
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error);
        toast(error.response.data.message);
      });
  };

  const editData = {
    courseName: courseName,
    courseDescription: courseDescription,
    coursePrice: coursePrice,
    courseDiscount: courseDiscount,
    courseThumbnailUrl: courseThumbnailUrl,
    courseId: id,
  };
  //  console.log(id, "kkkkkkkkkkkkkkkkkkkkk",  editData);
  const discountPercentage = parseFloat(location.state.courseDiscount); // "20%" => 20
  const discountedPrice =
    location.state.coursePrice -
    (location.state.coursePrice * discountPercentage) / 100;
  return (
    <>
      <div className="course-details-wrapper">
        <div className="course-details-first">
          <div className="course-details-first-left">
            <h1>{location.state.courseName}</h1>
            <div style={{ marginTop: "1rem" }}>
              <span style={{ color: "white" }}>{location.state.createdAt}</span>{" "}
              <span style={{ marginLeft: "3rem", color: "white" }}>
                End At: 05/11/2027
              </span>
            </div>

            <div className="price-main-div">
              <div className="price-div">
                <span style={{ textDecoration: "line-through", color: "gray" }}>
                  Rs: {location.state.coursePrice}
                </span>
                <h2 style={{ textAlign: "center" }}>
                  Rs:{discountedPrice.toFixed(0)}
                </h2>
              </div>
              <div className="disc-div">
                {" "}
                <h2 style={{ textAlign: "center", color: "red" }}>
                  {location.state.courseDiscount}% off
                </h2>
                <span style={{ color: "red", fontWeight: "bold" }}>
                  Big Sale
                </span>
              </div>
            </div>
          </div>
          <div className="course-details-first-right">
            <div className="course-details-first-right-img">
              <img src={location.state.courseThumbnailUrl} alt="" />
            </div>
            <button
              onClick={() => {
                Navigation(
                  "/dashboard/manage-course/" + id,

                  {
                    state: { courseName: courseName },
                  }
                );
              }}
            >
              manage content
            </button>
          </div>
        </div>
        <button
          className="edit"
          onClick={() => {
            Navigation("/dashboard/course-edit", {
              state: { courseEdit: editData },
            });
          }}
        >
          Edit
        </button>
        <button className="delete" onClick={deleteHandler}>
        {isLoading && <i class="fas fa-spinner fa-pulse"></i>} Delete
        </button>
        <button
          className="view"
          onClick={() => {
            Navigation("/dashboard/student-list/" + id);
          }}
        >
          view all student
        </button>
        <div>
          <h3 style={{ marginTop: "2rem" }}>Description</h3>
          <h2
            style={{ marginTop: "2rem" }}
            dangerouslySetInnerHTML={{
              __html: location.state.courseDescription,
            }}
          ></h2>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
