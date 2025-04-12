const mongoose = require("mongoose");

const courseStructure= new mongoose.Schema({
courseName:{type:String,trim:true,required:true},
coursePrice:{type:String, trim:true, required:true },
courseDiscount:{type:String, trim:true, required:true },
courseDescription:{type:String, trim:true, required:true },
courseThumbnailUrl:{type:String, trim:true, required:true },
courseThumbnailId:{type:String, trim:true, required:true },
courseUserId:{type:String, trim:true, required:true },
},{timestamps:true})


module.exports= mongoose.model("courseCollection",courseStructure);
