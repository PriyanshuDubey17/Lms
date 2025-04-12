import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const ManageCourse = () => {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [mainVideo, setMainVideo] = useState("");
  const [videoThumbnail, setVideoThumbnail] = useState("");
  const [formShow, setFormShow] = useState(false);
  const [allVideoResponse, setAllVideoResponse] = useState([]);
  const location = useLocation();
  const { courseId } = useParams();
  console.log("jjjjjjjjjj", location.state, "vvvvvvvv", courseId);
  // const videoData = [
  //   {
  //     id: 1,
  //     title: "lecture 1",
  //     description: "world best lecture hai yeh",
  //     videoImg:
  //       "https://i.ytimg.com/vi/JUZAMhsW-Ek/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBuy49XSF5DR3m0gswgs7MIiHwyrg",
  //   },
  //   {
  //     id: 2,
  //     title: "lecture 2",
  //     description: "world best lecture hai yeh",
  //     videoImg:
  //       "https://i.ytimg.com/vi/JUZAMhsW-Ek/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBuy49XSF5DR3m0gswgs7MIiHwyrg",
  //   },

  //   {
  //     id: 3,
  //     title: "lecture 3",
  //     description: "world best lecture hai yeh",
  //     videoImg:
  //       "https://i.ytimg.com/vi/JUZAMhsW-Ek/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBuy49XSF5DR3m0gswgs7MIiHwyrg",
  //   },

  //   {
  //     id: 4,
  //     title: "lecture 4",
  //     description: "world best lecture hai yeh",
  //     videoImg:
  //       "https://i.ytimg.com/vi/JUZAMhsW-Ek/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBuy49XSF5DR3m0gswgs7MIiHwyrg",
  //   },

  //   {
  //     id: 5,
  //     title: "lecture 5",
  //     description: "world best lecture hai yeh",
  //     videoImg:
  //       "https://i.ytimg.com/vi/JUZAMhsW-Ek/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBuy49XSF5DR3m0gswgs7MIiHwyrg",
  //   },

  //   {
  //     id: 6,
  //     title: "lecture 6",
  //     description: "world best lecture hai yeh",
  //     videoImg:
  //       "https://i.ytimg.com/vi/JUZAMhsW-Ek/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBuy49XSF5DR3m0gswgs7MIiHwyrg",
  //   },

  //   {
  //     id: 7,
  //     title: "lecture 7",
  //     description: "world best lecture hai yeh",
  //     videoImg:
  //       "https://i.ytimg.com/vi/JUZAMhsW-Ek/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBuy49XSF5DR3m0gswgs7MIiHwyrg",
  //   },
  // ];

  console.log("lllllllllllll",allVideoResponse)
  useEffect(() => {
    getAllVideo();
  }, []);

  const getAllVideo = () => {
    axios.get("http://localhost:4002/api/v1/video/all-video/" + courseId, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((result)=>{
      setAllVideoResponse(result.data.userData);
    })
    .catch((error)=>{
      console.log(error)
    })
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const videoData = new FormData();

    videoData.append("videoTittle", videoTitle);
    videoData.append("videoDescription", videoDescription);
    videoData.append("video", mainVideo);
    videoData.append("videoThumbnail", videoThumbnail);
    videoData.append("videoCourseId", courseId);

    axios
      .post("http://localhost:4002/api/v1/video/add-video", videoData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        console.log(result);
     
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="content-manage">
        <div className="content-header">
          <div className="m">
            <h1>{location.state.courseName} </h1>
            <button
              className="upload"
              onClick={() => {
                setFormShow(true);
              }}
            >
              Upload Content
            </button>
          </div>
          {formShow && (
            <div className="upload-video-container">
              <form onSubmit={submitHandler}>
                <input
                  onChange={(e) => {
                    setVideoTitle(e.target.value);
                  }}
                  type="text"
                  placeholder="video tittle"
                />
                <label htmlFor="video"> Select Video</label>
                <input
                  onChange={(e) => {
                    setMainVideo(e.target.files[0]);
                  }}
                  type="file"
                  id="video"
                />
                <label htmlFor="videoThumbnail"> Select Video Thumbnail</label>
                <input
                  onChange={(e) => {
                    setVideoThumbnail(e.target.files[0]);
                  }}
                  type="file"
                  id="videoThumbnail"
                />
                <textarea
                  onChange={(e) => {
                    setVideoDescription(e.target.value);
                  }}
                  placeholder="description"
                ></textarea>
                <button type="submit">Submit</button>{" "}
                <button
                  onClick={() => {
                    setFormShow(false);
                  }}
                >
                  Close
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="content-box">
          {allVideoResponse.map((video) => {
            return (
              <div className="video-card" key={video.id}>
                <div className="video-img">
                  <img src={video.videoThumbnailUrl} alt="" />
                </div>

                <div className="video-title">
                  <h3>{video.videoTittle}</h3>
                  <h5> {video.videoDescription}</h5>
                </div>
                <div className="video-btn">
                  {" "}
                  <button className="edit-btn"> Edit</button>
                  <button className="delete-btn"> Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ManageCourse;
