const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const VideoModel = require("../models/videoModel");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});
const addVideo = async (req, res, next) => {
  try {
    const { videoTittle, videoDescription, videoCourseId } = req.body;

    if (!videoTittle || !videoDescription || !videoCourseId) {
      return next(new ApiError("filed are missing", 500));
    }

    if (!req.files || !req.files.videoThumbnail) {
      return next(new ApiError("thumbnail are missing", 500));
    }
    if (!req.files || !req.files.video) {
      return next(new ApiError("video are missing", 500));
    }

    const uploadThumbnail = await cloudinary.uploader.upload(
      req.files.videoThumbnail.tempFilePath
    );

    const uploadVideo = await cloudinary.uploader.upload(
      req.files.video.tempFilePath,
      {
        resource_type: "video",
      }
    );

    const courseVideo = new VideoModel({
      videoTittle: videoTittle,
      videoDescription: videoDescription,
      videoCourseId: videoCourseId,
      videoUrl: uploadVideo.secure_url,
      videoId: uploadVideo.public_id,
      videoThumbnailUrl: uploadThumbnail.secure_url,
      videoThumbnailId: uploadThumbnail.public_id,
      userId: req.tokenData.userId,
    });

    const saveVideoData = await courseVideo.save();

    res
      .status(200)
      .json(new ApiResponse(200, "video add successfully", saveVideoData));
  } catch (error) {
    next(error);
  }
};

const getVideo = async (req, res, next) => {
  const allVideo = await VideoModel.find({
    videoCourseId: req.params.courseId,
    userId: req.tokenData.userId,
  });

  // console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhh",req.tokenData)
  // if (allVideo.length == 0) {
  //   return next(new ApiError("video empty", 500));
  // }

  res.status(200).json(new ApiResponse(200, "all video here ", allVideo));
};

const updateVideo = async (req, res, next) => {
  try {
    const userId = req.tokenData.userId;
    const { videoTitle, videoDescription } = req.body;
    const videoId = req.params.videoId;
    console.log("hh", videoId, userId);

    const findUser = await VideoModel.findOne({
      _id: videoId,
      userId: userId,
    });

    console.log("jjj", findUser);
    if (!findUser) {
      return next(new ApiError("video not found", 500));
    }
    console.log("jjj");
    if (req.files) {
      await cloudinary.uploader.destroy(findUser.videoThumbnailId);
      const uploadVideoImg = await cloudinary.uploader.upload(
        req.files.videoThumbnail.tempFilePath
      );

      const newVideoData = {
        videoTittle: videoTitle,
        videoDescription: videoDescription,
        videoThumbnailUrl: uploadVideoImg.secure_url,
        videoThumbnailId: uploadVideoImg.public_id,
      };

      const finalVideoData = await VideoModel.findOneAndUpdate(
        { _id: videoId, userId: userId },
        newVideoData,
        { new: true }
      );

      res
        .status(200)
        .json(
          new ApiResponse(200, "video update successfully", finalVideoData)
        );
    } else {
      const newVideoData = {
        videoTittle: videoTitle,
        videoDescription: videoDescription,
      };

      const finalVideoData = await VideoModel.findOneAndUpdate(
        { _id: videoId, userId: userId },
        newVideoData,
        { new: true }
      );

      res
        .status(200)
        .json(
          new ApiResponse(200, "video update successfully", finalVideoData)
        );
    }
  } catch (error) {
    next(error);
  }
};

// delete video by video id

const deleteVideo = async (req, res, next) => {
  try {
    console.log("hhhh");
    const userId = req.tokenData.userId;
    const videoId = req.params.videoId;
    console.log("hh", videoId, userId);

    const findUser = await VideoModel.findOne({
      _id: videoId,
      userId: userId,
    });

    if (!findUser) {
      return next(new ApiError("video not found", 500));
    }

    await cloudinary.uploader.destroy(findUser.videoThumbnailId);
    await cloudinary.uploader.destroy(findUser.videoId, {
      resource_type: "video",
    });

    const deleteUser = await VideoModel.findOneAndDelete({
      _id: videoId,
      userId: userId,
    });

    res
      .status(200)
      .json(new ApiResponse(200, "video delete successful", deleteUser));
  } catch (error) {
    next(error);
  }
};

module.exports = { addVideo, getVideo, updateVideo, deleteVideo };
