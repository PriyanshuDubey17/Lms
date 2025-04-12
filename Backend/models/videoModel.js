const mongoose = require("mongoose");

const videoStructure = new mongoose.Schema(
  {
    videoTittle: { type: String, trim: true, required: true },
    videoUrl: { type: String, trim: true, required: true },
    videoId: { type: String, trim: true, required: true },
    videoThumbnailUrl: { type: String, trim: true, required: true },
    videoThumbnailId: { type: String, trim: true, required: true },
    videoDescription: { type: String, trim: true, required: true },
    videoCourseId: { type: String, trim: true, required: true },
    userId: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("videoCollection", videoStructure);
