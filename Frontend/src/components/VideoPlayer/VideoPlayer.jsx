import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const VideoPlayer = () => {
  const location = useLocation();
  const [videoLink, setVideoLink] = useState("");
 


  useEffect(() => {
    setVideoLink(location.state.videoUrl)
  },[]);

  //console.log("Playing video from:", videoLink);
  return (
    <>
     <div className="video-player">
  {videoLink ? (
    <video controls width="70%">
      <source src={videoLink} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  ) : (
    <p>Loading video...</p>
  )}
</div>

    </>
  );
};

export default VideoPlayer;
