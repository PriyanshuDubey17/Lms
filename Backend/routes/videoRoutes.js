const express = require("express");
const router = express.Router();
const { tokenChecker } = require("../middleware/authChecker");
const {addVideo,getVideo}= require("../controllers/videoController")
router.post("/add-video", tokenChecker,addVideo);
router.get("/all-video/:courseId", tokenChecker,getVideo);

module.exports = router;
