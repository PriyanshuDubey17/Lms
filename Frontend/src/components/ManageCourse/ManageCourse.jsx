import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ManageCourse = () => {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [mainVideo, setMainVideo] = useState("");
  const [videoThumbnail, setVideoThumbnail] = useState("");
  const [formShow, setFormShow] = useState(false);
  const [allVideoResponse, setAllVideoResponse] = useState([]);
  const [pleaseWait, setPleaseWait] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const Navigation = useNavigate();
  const { courseId } = useParams();
  // console.log("jjjjjjjjjj", location.state, "vvvvvvvv", courseId);
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

  useEffect(() => {
    getAllVideo();
  }, []);

  const getAllVideo = () => {
    axios
      .get("https://lms-p2i9.onrender.com/api/v1/video/all-video/" + courseId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setAllVideoResponse(result.data.userData);
        // toast(result.data.message)
      })
      .catch((error) => {
        toast(error.response.data.message);
        // console.log(error);
      });
  };

  const submitHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const videoData = new FormData();

    videoData.append("videoTittle", videoTitle);
    videoData.append("videoDescription", videoDescription);
    videoData.append("video", mainVideo);
    videoData.append("videoThumbnail", videoThumbnail);
    videoData.append("videoCourseId", courseId);

    axios
      .post("https://lms-p2i9.onrender.com/api/v1/video/add-video", videoData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        toast(result.data.message);
        setIsLoading(false);
        // console.log(result);
        setFormShow(false);
        getAllVideo();
      })
      .catch((error) => {
        setIsLoading(false);
        toast(error.response.data.message);
        // console.log(error);
      });
  };

  const deleteHandler = (videoId) => {
    setPleaseWait(true);
    axios
      .delete("https://lms-p2i9.onrender.com/api/v1/video/delete-video/" + videoId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setPleaseWait(false);

        getAllVideo();

        toast(result.data.message);

        // console.log(result);
      })
      .catch((error) => {
        // console.log(error);
        toast(error.response.data.message);
        setPleaseWait(false);
      });
  };

  return (
    <>
      {pleaseWait == true ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="content-manage">
          <div className="content-header">
            <div className="m">
              <h1>{location.state.courseName} </h1>
              <button
                className="upload"
                onClick={() => {
                  setFormShow(!formShow);
                }}
              >
                {formShow ? "Close" : "Upload Content"}
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
                  <label htmlFor="videoThumbnail">
                    {" "}
                    Select Video Thumbnail
                  </label>
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
                  <button type="submit">
                    {" "}
                    {isLoading && <i class="fas fa-spinner fa-pulse"></i>}Submit
                  </button>{" "}
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

          {allVideoResponse.length === 0 ? (
            <div className="empty">
              <p>Start Uploading Video Now</p>
            </div>
          ) : (
            <div className="content-box">
              {allVideoResponse.map((video) => {
                // console.log("video ",video._id)
                return (
                  <div className="video-card" key={video._id}>
                    <div className="video-img">
                      <img
                        src={video.videoThumbnailUrl}
                        alt=""
                        onClick={() => {
                          Navigation("/dashboard/video-play", {
                            state: { videoUrl: video.videoUrl },
                          });
                        }}
                      />
                    </div>

                    <div className="video-title">
                      <h3>{video.videoTittle}</h3>
                      <h5> {video.videoDescription}</h5>
                    </div>
                    <div className="video-btn">
                      {" "}
                      <button
                        className="edit-btn"
                        onClick={() => {
                          Navigation("/dashboard/edit-video", {
                            state: {
                              video: video,
                              courseName: location.state.courseName,
                            },
                          });
                        }}
                      >
                        {" "}
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => {
                          deleteHandler(video._id);
                        }}
                      >
                        {" "}
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ManageCourse;
