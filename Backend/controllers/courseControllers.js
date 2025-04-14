const ApiError = require("../utils/ApiError");
const CourseModel = require("../models/courseModel");
const VideoModel = require("../models/videoModel");
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
    // console.log(userId);

    const allCourse = await CourseModel.find({ courseUserId: userId });
    if (allCourse.length == 0) {
      return next(new ApiError("not add any course till now .", 500));
    }

    res.status(200).json(new ApiResponse(200, "here is all data", allCourse));
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const { userId } = req.tokenData.userId;

    const { courseName, coursePrice, courseDiscount, courseDescription } =
      req.body;

    const courseFind = await CourseModel.findOne({
      _id: req.params.courseId,
      userId: userId,
    });
    if (!courseFind) {
      return next(new ApiError("course not found with courseId", 500));
    }

    if (req.files) {
      await cloudinary.uploader.destroy(courseFind.courseThumbnailId);
      const uploadNewImg = await cloudinary.uploader.upload(
        req.files.courseThumbnail.tempFilePath
      );
      console.log("ggggggggggggggggg file");
      const newUpdatedData = {
        courseName: courseName,
        coursePrice: coursePrice,
        courseDiscount: courseDiscount,
        courseDescription: courseDescription,
        courseThumbnailUrl: uploadNewImg.secure_url,
        courseThumbnailId: uploadNewImg.public_id,
      };

      const finalUpload = await CourseModel.findOneAndUpdate(
        { _id: req.params.courseId, userId: userId },
        newUpdatedData,
        { new: true }
      );
      res
        .status(200)
        .json(new ApiResponse(200, "Course Updated Successfully", finalUpload));
    } else {
      console.log("hh 3");
      const newUpdatedData = {
        courseName: courseName,
        coursePrice: coursePrice,
        courseDiscount: courseDiscount,
        courseDescription: courseDescription,
      };
      const finalUpload = await CourseModel.findOneAndUpdate(
        { _id: req.params.courseId, userId: userId },
        newUpdatedData,
        { new: true }
      );
      res
        .status(200)
        .json(new ApiResponse(200, "Course Updated Successfully", finalUpload));
    }
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const userId = req.tokenData.userId;
    const courseId = req.params.courseId;

    // Step 1: Find all videos under this course
    const videos = await VideoModel.find({
      videoCourseId: courseId,
      userId: userId,
    });

    // Step 2: Delete each video thumbnail & video from Cloudinary
    for (const video of videos) {
      if (video.videoThumbnailId) {
        await cloudinary.uploader.destroy(video.videoThumbnailId);
      }
      if (video.videoId) {
        await cloudinary.uploader.destroy(video.videoId,{ resource_type: "video" });
      }

      // Step 3: Delete video document from DB
      await VideoModel.findByIdAndDelete(video._id);
    }

    // Step 4: Delete course thumbnail from Cloudinary
    const course = await CourseModel.findOne({
      _id: courseId,
      courseUserId: userId,
    });
    if (!course) {
      return next(new ApiError("Course not found", 404));
    }

    if (course.courseThumbnailId) {
      await cloudinary.uploader.destroy(course.courseThumbnailId);
    }

    // Step 5: Delete course from DB
    const deletedCourse = await CourseModel.findOneAndDelete({
      _id: courseId,
      courseUserId: userId,
    });

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Course and its videos deleted successfully",
          deletedCourse
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = { addCourse, getAllCourse, updateCourse, deleteCourse };
