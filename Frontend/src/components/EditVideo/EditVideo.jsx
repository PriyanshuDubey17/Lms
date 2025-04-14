import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditVideo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoThumbnail, setVideoThumbnail] = useState("");
  const location = useLocation();
  console.log(location.state);
  const Navigate = useNavigate();
  useEffect(() => {
    if (location.state) {
      setVideoTitle(location.state.video.videoTittle);
      setVideoDescription(location.state.video.videoDescription);
    }
  }, [location.state]);
  console.log("bbbbbbbbb", location.state.video._id);
  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updateData = new FormData();
    updateData.append("videoTitle", videoTitle);
    updateData.append("videoDescription", videoDescription);

    if (videoThumbnail) {
      updateData.append("videoThumbnail", videoThumbnail);
    }

    axios
      .put(
        "https://lms-p2i9.onrender.com/api/v1/video/update-video/" +
          location.state.video._id,
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        setIsLoading(false);
        console.log(result);
        toast(result.data.message);
        Navigate("/dashboard/manage-course/" + location.state.video.videoCourseId, {
            state: { courseName: location.state.courseName },
          });
          
      })
      .catch((error) => {
        setIsLoading(false);
        toast("some thing error");
        console.log(error);
      });
  };

  return (
    <div className="add-new-course-wrapper">
      <form className="add-new-course-main-div" onSubmit={submitHandler}>
        <h2>Update Video </h2>
        <input
          type="text"
          placeholder="course tittle"
          value={videoTitle}
          onChange={(e) => {
            setVideoTitle(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="description"
          value={videoDescription}
          onChange={(e) => {
            setVideoDescription(e.target.value);
          }}
        />
        <div className="file-div">
          <h4>Choose Thumbnail</h4>
          <div>
            <input
              type="file"
              onChange={(e) => {
                setVideoThumbnail(e.target.files[0]);
              }}
            />
          </div>
        </div>

        <button>
          {isLoading && <i className="fas fa-spinner fa-pulse"></i>}
          Update Video
        </button>
      </form>
    </div>
  );
};

export default EditVideo;
