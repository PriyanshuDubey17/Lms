const mongoose = require("mongoose");

const userStructure=  new mongoose.Schema({
    fullName:{type:String, trim:true, required:true },
    email:{type:String,  trim:true, required:true },  //unique:true
    phone:{type:String,  trim:true, required:true },
    password:{type:String,  trim:true, required:true },
    aboutMe:{type:String,  required:true }    ,
    profileImgUrl:{type:String,  required:true },
    profileImgId:{type:String,   required:true },
    
    //  
},{timestamps:true}) 

module.exports= mongoose.model("userCollection",userStructure)