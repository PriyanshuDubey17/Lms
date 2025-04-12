import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const CourseDetails = () => {
  const { id } = useParams(); //isme hi ohh id aayega
  const Navigation = useNavigate();
  const location = useLocation(); //ek componentsse dure compone se data aata hai isme

  const courseName = location.state.courseName;
  console.log(id, "kkkkkkkkkkkkkkkkkkkkk", courseName);

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
                End At: 05/11/2024
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
        <button className="edit">Edit</button>
        <button className="delete">Delete</button>
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
