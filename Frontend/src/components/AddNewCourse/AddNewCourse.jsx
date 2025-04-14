import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import computerImg from "../../assets/computer.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
const AddNewCourse = () => {
  const [description, setDescription] = useState("");
  const [courseName, setCourseName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const Navigate = useNavigate();
  const fileHandler = (e) => {
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    if (location.pathname === "/dashboard/course-edit") {
      console.log(location.state.courseEdit);
      setCourseName(location.state.courseEdit.courseName);
      setDescription(location.state.courseEdit.courseDescription);
      setPrice(location.state.courseEdit.coursePrice);
      setDiscount(location.state.courseEdit.courseDiscount);
    } else {
      setCourseName("");
      setDescription("");
      setPrice("");
      setDiscount("");
    }
  }, [location.pathname]);

  const submitHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (location.pathname === "/dashboard/course-edit") {
      const newCourse = new FormData();
      newCourse.append("courseName", courseName);
      newCourse.append("coursePrice", price);
      newCourse.append("courseDescription", description);
      newCourse.append("courseDiscount", discount);
      if (file) {
        newCourse.append("courseThumbnail", file);
      }

      axios
        .put(
          "https://lms-p2i9.onrender.com/api/v1/course/update-course/" +
            location.state.courseEdit.courseId,
          newCourse,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )

        .then((result) => {
          setIsLoading(false);
          toast(result.data.message);
          Navigate("/dashboard/all-courses");
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
          toast(error.response.data.message);
        });
    } else {
      const newCourse = new FormData();
      newCourse.append("courseName", courseName);
      newCourse.append("coursePrice", price);
      newCourse.append("courseDescription", description);
      newCourse.append("courseDiscount", discount);
      newCourse.append("courseThumbnail", file);

      axios
        .post("https://lms-p2i9.onrender.com/api/v1/course/add-course", newCourse, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        .then((result) => {
          setIsLoading(false);
          toast(result.data.message);
          Navigate("/dashboard/all-courses");
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
          toast(error.response.data.message);
        });
    }

    //console.log(description, courseName, price);
  };
  return (
    <div className="add-new-course-wrapper">
      <form
        action=""
        className="add-new-course-main-div"
        onSubmit={submitHandler}
      >
        <h2>
          {" "}
          {location.pathname === "/dashboard/course-edit"
            ? "Update Course Details"
            : "Add New Course"}{" "}
        </h2>
        <input
          onChange={(e) => {
            setCourseName(e.target.value);
          }}
          type="text"
          placeholder="course name"
          value={courseName}
        />
        <input
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          type="text"
          placeholder="Price"
          value={price}
        />
        <input
          onChange={(e) => {
            setDiscount(e.target.value);
          }}
          type="text"
          placeholder="discount price %"
          value={discount}
        />
        <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
        />
        <div className="file-div">
          <div>
            {" "}
            <input type="file" onChange={fileHandler} />
          </div>

          <div>
            {" "}
            {image ? (
              <img src={image} alt="Course Preview" />
            ) : (
              <img src={computerImg} alt="Default" />
            )}
          </div>
        </div>

        <button>
          {" "}
          {isLoading && <i class="fas fa-spinner fa-pulse"></i>}{" "}
          {location.pathname === "/dashboard/course-edit"
            ? "Update Course"
            : "Add Course"}
        </button>
      </form>
    </div>
  );
};

export default AddNewCourse;
