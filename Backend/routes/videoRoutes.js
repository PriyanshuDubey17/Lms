const express = require("express");
const router = express.Router();
const { tokenChecker } = require("../middleware/authChecker");
const {addVideo,getVideo,updateVideo, deleteVideo}= require("../controllers/videoController")
router.post("/add-video", tokenChecker,addVideo);
router.get("/all-video/:courseId", tokenChecker,getVideo);
router.put("/update-video/:videoId", tokenChecker,updateVideo);
router.delete("/delete-video/:videoId", tokenChecker,deleteVideo);
module.exports = router;
