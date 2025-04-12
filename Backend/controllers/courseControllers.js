const ApiError = require("../utils/ApiError");
const CourseModel = require("../models/courseModel");
const cloudinary = require("cloudinary").v2;
const ApiResponse = require("../utils/ApiResponse");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

const addCourse = async (req, res, next) => {
  try {
    const { courseName, coursePrice, courseDiscount, courseDescription } =
      req.body;

    if (!courseName || !coursePrice || !courseDiscount || !courseDescription) {
      return next(new ApiError("filed are missing", 500));
    }

    if (!req.files || !req.files.courseThumbnail) {
      return next(new ApiError("thumbnail are missing", 500));
    }

    const uploadData = await cloudinary.uploader.upload(
      req.files.courseThumbnail.tempFilePath
    );

    const courseData = new CourseModel({
      courseName: courseName,
      coursePrice: coursePrice,
      courseDiscount: courseDiscount,
      courseDescription: courseDescription,
      courseUserId: req.tokenData.userId,
      courseThumbnailUrl: uploadData.secure_url,
      courseThumbnailId: uploadData.public_id,
    });

    const saveData = await courseData.save();

    res
      .status(200)
      .json(
        new ApiResponse(200, "course register create successfully", saveData)
      );
  } catch (error) {
    next(error);
  }
};

const getAllCourse = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;
    console.log(userId);

    const allCourse = await CourseModel.find({ courseUserId: userId });
    if (allCourse.length == 0) {
      return next(new ApiError("not add any course till now .", 500));
    }

    res.status(200).json(new ApiResponse(200, "here is all data", allCourse));
  } catch (error) {
    next(error);
  }
};

module.exports = { addCourse, getAllCourse };
