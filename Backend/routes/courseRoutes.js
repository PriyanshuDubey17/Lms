const express = require("express")
const {tokenChecker}= require("../middleware/authChecker")
const {addCourse,getAllCourse,updateCourse, deleteCourse} =require("../controllers/courseControllers")
const router =express.Router()

router.post("/add-course",tokenChecker,addCourse)
router.get("/all-course",tokenChecker,getAllCourse)
router.put("/update-course/:courseId",tokenChecker,updateCourse)
router.delete("/delete-course/:courseId",tokenChecker, deleteCourse)
module.exports= router