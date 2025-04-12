const express = require("express")
const {tokenChecker}= require("../middleware/authChecker")
const {addCourse,getAllCourse} =require("../controllers/courseControllers")
const router =express.Router()

router.post("/add-course",tokenChecker,addCourse)
router.get("/all-course",tokenChecker,getAllCourse)

module.exports= router