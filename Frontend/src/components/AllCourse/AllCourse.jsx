import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AllCourse = () => {
  const navigate = useNavigate();

  const [allCourseData, setAllCourseData] = useState([]);
  // const backendData = [
  //   {
  //     id: 1,
  //     courseName: "MERN Stack Mastery",
  //     price: 2999,
  //     discount: "20%",
  //     description:
  //       "<p>Complete <b>MERN stack </b>development course from basics to advanced.</p>",
  //     thumbImg:
  //       "https://cdn.hashnode.com/res/hashnode/image/upload/v1675180430218/c3cc52ca-23e7-4373-8b8e-97355d07ece4.jpeg",
  //   },
  //   {
  //     id: 2,
  //     courseName: "React Bootcamp",
  //     price: 1999,
  //     discount: "15%",
  //     description:
  //       "<p>Dive deep into React with hands-on projects and real-world apps.</p>",
  //     thumbImg:
  //       "https://cdn.hashnode.com/res/hashnode/image/upload/v1675180430218/c3cc52ca-23e7-4373-8b8e-97355d07ece4.jpeg",
  //   },
  //   {
  //     id: 3,
  //     courseName: "Node.js Backend Pro",
  //     price: 2499,
  //     discount: "10%",
  //     description:
  //       "<p>Learn how to build scalable backend APIs using Node.js and Express.</p>",
  //     thumbImg:
  //       "https://cdn.hashnode.com/res/hashnode/image/upload/v1675180430218/c3cc52ca-23e7-4373-8b8e-97355d07ece4.jpeg",
  //   },
  //   {
  //     id: 4,
  //     courseName: "MongoDB for Developers",
  //     price: 1599,
  //     discount: "25%",
  //     description: "<p>Master NoSQL databases and MongoDB CRUD operations.</p>",
  //     thumbImg:
  //       "https://cdn.hashnode.com/res/hashnode/image/upload/v1675180430218/c3cc52ca-23e7-4373-8b8e-97355d07ece4.jpeg",
  //   },
  //   {
  //     id: 5,
  //     courseName: "Full Stack Project Building",
  //     price: 3499,
  //     discount: "30%",
  //     description:
  //       "<p>Build real-world full-stack projects using the MERN stack.</p>",
  //     thumbImg:
  //       "https://cdn.hashnode.com/res/hashnode/image/upload/v1675180430218/c3cc52ca-23e7-4373-8b8e-97355d07ece4.jpeg",
  //   },

  //   {
  //     id: 6,
  //     courseName: "Full Stack Project Building",
  //     price: 3499,
  //     discount: "30%",
  //     description:
  //       "<p>Build real-world full-stack projects using the MERN stack.</p>",
  //     thumbImg:
  //       "https://cdn.hashnode.com/res/hashnode/image/upload/v1675180430218/c3cc52ca-23e7-4373-8b8e-97355d07ece4.jpeg",
  //   },

  //   {
  //     id: 7,
  //     courseName: "Full Stack Project Building",
  //     price: 3499,
  //     discount: "30%",
  //     description:
  //       "<p>Build real-world full-stack projects using the MERN stack.</p>",
  //     thumbImg:
  //       "https://cdn.hashnode.com/res/hashnode/image/upload/v1675180430218/c3cc52ca-23e7-4373-8b8e-97355d07ece4.jpeg",
  //   },
  //   {
  //     id: 8,
  //     courseName: "Full Stack Project Building",
  //     price: 3499,
  //     discount: "30%",
  //     description:
  //       "<p>Mern Stack this this world best premimue </p><p><strong>ffffffffff<em>fffffffffffffffff</em></strong></p><p><strong><em><u>ffffffffffffffff</u></em></strong></p> x",
  //     thumbImg:
  //       "https://cdn.hashnode.com/res/hashnode/image/upload/v1675180430218/c3cc52ca-23e7-4373-8b8e-97355d07ece4.jpeg",
  //   },
  // ];
  //console.log(allCourseData, "hhh");

  const location = useLocation();
  // console.log("courseEdit", location)

  useEffect(() => {
    getAllCourse();
  }, []);

  const getAllCourse = () => {
    axios
      .get("https://lms-p2i9.onrender.com/api/v1/course/all-course", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },  
      })
      .then((result) => {
        setAllCourseData(result.data.userData);
        // toast(result.data.message);
        console.log(result);
      })
      .catch((error) => {
        // toast(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <>
      {allCourseData.length == 0 ? (
        <div className="crete">
          <h2>No course added yet</h2>
          <p>Start by creating your first course.</p>
          <button onClick={() => navigate("/dashboard/add-new-course")}>
            Create Course Now
          </button>
        </div>
      ) : (
        <div className="all-course-wrapper">
          {allCourseData.map((oneByOneCourse) => {
            // console.log(oneByOneCourse)
            const discountPercentage = parseFloat(
              oneByOneCourse.courseDiscount
            ); // "20%" => 20
            const discountedPrice =
              oneByOneCourse.coursePrice -
              (oneByOneCourse.coursePrice * discountPercentage) / 100;

            return (
              <div
                className="map-div"
                key={oneByOneCourse._id}
                onClick={() => {
                  navigate("/dashboard/course-detail/" + oneByOneCourse._id, {
                    state: oneByOneCourse,
                  });
                }}
              >
                <div className="map-img">
                  <img src={oneByOneCourse.courseThumbnailUrl} alt="" />
                </div>
                <div className="map-item">
                  <p>{oneByOneCourse.courseName}</p>
                  <p>
                    <span
                      style={{ textDecoration: "line-through", color: "gray" }}
                    >
                      Rs: {oneByOneCourse.coursePrice}
                    </span>
                    &nbsp;
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      Rs: {discountedPrice.toFixed(0)}
                    </span>
                  </p>
                  <p style={{ color: "red" }}>
                    Discount: {oneByOneCourse.courseDiscount}%
                  </p>
                  {/* <p
                  dangerouslySetInnerHTML={{
                    __html: oneByOneCourse.courseDescription,
                  }}
                ></p> */}
                  Click Know More About Course
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default AllCourse;
